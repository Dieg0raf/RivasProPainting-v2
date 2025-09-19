import os
from dotenv import load_dotenv

# Database
from database import db

# Models for DB
from models.quote import Quote

# Schemas
from schemas.quote_schemas import QuoteCreate

# Pydantic
from pydantic import ValidationError

# SQLAlchemy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError

# Flask
from flask import Flask, jsonify, request

# Flask CORS
from flask_cors import CORS

# Flask Limiter
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

# Custom Utils
from utils.logger import logger
from utils.decorators import validate_json, require_api_key
from services.email_services import email_service
from config import get_config

load_dotenv()
app = Flask(__name__)

# Load configuration
config_class = get_config()
app.config.from_object(config_class)

limiter = Limiter(
    get_remote_address, 
    app=app, 
    default_limits=app.config['DEFAULT_RATE_LIMIT'],
    storage_uri='memory://',
)

# Initialize CORS with configured origins
CORS(app, origins=app.config['CORS_ORIGINS'])

# initialize the database
db.init_app(app)

# creates all tables in the database
with app.app_context():
    try:
        logger.info('Creating database tables')
        db.create_all()
        logger.info('Database tables created successfully')
    except Exception as e:
        logger.error(f'Error creating database tables: {e}')


@app.route('/quotes', methods=['GET'])
@limiter.limit(app.config['QUOTE_RATE_LIMIT'])
def get_quotes():
    print("Get quotes endpoint hit")
    quotes = Quote.query.all()
    quotes_list = []
    for quote in quotes:
        quotes_list.append({
            'id': quote.id,
            'first_name': quote.first_name,
            'last_name': quote.last_name,
            'email': quote.email,
            'phone': quote.phone,
            'message': quote.message,
            'services': quote.services,
            'created_at': quote.created_at,
        })
    return jsonify({'quotes': quotes_list}), 200

@app.route('/quotes', methods=['POST'])
@limiter.limit(app.config['QUOTE_RATE_LIMIT'])
@require_api_key
@validate_json(required_fields=['first_name', 'last_name', 'email', 'phone', 'message', 'services'])
def submit_quote():
    logger.info('Submitted quote request')
    try:
        if not request.is_secure and not app.config['DEBUG']:
            return jsonify({'error': 'Insecure connection'}), 400

        # serialize data
        quote_serialized = QuoteCreate(**request.json)
        quote = Quote(**quote_serialized.model_dump())

        # add to database
        db.session.add(quote)
        db.session.commit()

        # send quote email to admin
        email_sent = email_service.send_quote_email(quote_serialized.model_dump())
        if not email_sent:
            logger.error('Failed to send quote email via SES')
            return jsonify({'error': 'Failed to send quote email'}), 500
        
        logger.info(f'Quote submitted successfully for {quote.first_name} {quote.last_name}')
        return jsonify({'message': 'Quote request submitted'}), 200

    except IntegrityError as e:
        logger.error(f'Integrity error: {str(e)}')
        db.session.rollback()
        return jsonify({'error': 'Database Integrity error'}), 400
        
    except ValidationError as e:
        logger.error(f'Validation error: {str(e)}')

        # collect missing or invalid fields in a similar structure to validate_json
        violations = []
        for error in e.errors():
            field_name = error['loc'][0] if error['loc'] else 'unknown'
            violations.append({
                "field": field_name,
                "reason": error['msg'],
                "input": error.get('input', ''),
                "error_type": error.get('type', 'validation_error')
            })

        return jsonify({
            "error": "Validation failed",
            "message": "Please fill in all the required fields correctly",
            "violations": violations
        }), 400
    except Exception as e:
        logger.error(f'Error submitting quote request: {str(e)}')
        db.session.rollback()
        return jsonify({'error': 'Failed to submit quote request'}), 500

@app.errorhandler(429)
def ratelimit_handler(e):
    logger.warning(f"Rate limit exceeded: {e.description}")
    return jsonify({
        "error": "Rate limit exceeded",
        "message": "Too many requests. Please try again later.",
    }), 429

if __name__ == '__main__':
    app.run(debug=True)