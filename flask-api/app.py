import os
from dotenv import load_dotenv

# Models for DB
from models.quote import Quote

# Schemas
from schemas.quote_schemas import QuoteCreate

# Pydantic
from pydantic import ValidationError

# SQLAlchemy
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

load_dotenv()
app = Flask(__name__)

limiter = Limiter(
    get_remote_address, 
    app=app, 
    default_limits=os.getenv('DEFAULT_RATE_LIMIT', '100 per day'),
    storage_uri='memory://',
)

# Set the environment variables for the app
if os.getenv('FLASK_ENV') == 'PRODUCTION':
    print('Production environment')
    app.config['DEBUG'] = False
    app.config['TESTING'] = False
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('PROD_DATABASE_URL')
    CORS(app, origins=[os.getenv("NEXT_JS_APP_HOST"), os.getenv("NEXT_JS_APP_HOST_v2")])
else:
    print('Local environment')
    app.config['DEBUG'] = True
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('LOCAL_DATABASE_URL')
    CORS(app, origins=["localhost:3000", "127.0.0.1:3000"])

@app.route('/health', methods=['GET'])
@limiter.limit(os.getenv('QUOTE_RATE_LIMIT', '100/day;5/hour;2/minute'))
def health():
    print("Health check endpoint hit")
    return jsonify({'message': 'API is healthy'}), 200

@app.route('/quotes', methods=['POST'])
# TODO: Uncomment this before deploying to production
# @limiter.limit(os.getenv('QUOTE_RATE_LIMIT', '100/day;5/hour;2/minute'))
@limiter.limit('1000/day;100/hour')
@require_api_key
@validate_json(required_fields=['first_name', 'last_name', 'email', 'phone', 'message', 'services'])
def submit_quote():

    logger.info('Submitted quote request')
    try:
        # TODO: Uncomment this before deploying to production
        # if not request.is_secure and not app.config['DEBUG']:
        #     return jsonify({'error': 'Insecure connection'}), 400

        # **request.json is used to unpack the dictionary (JSON data request.json) into the Pydantic model
        quote_serialized = QuoteCreate(**request.json)

        # **quote_serialized.model_dump() is used to unpack the dictionary into the SQLAlchemy model
        quote_db = Quote(**quote_serialized.model_dump())

        # TODO: Add Database connection
        # TODO: (DONE but not connected to DB) Add SQLAlchemy model for the request (ORM)
        # TODO: Add Email sending (SES) (copy logic from django backend)
        

        return jsonify({'message': 'Quote request submitted'}), 200
    except IntegrityError as e:
        logger.error(f'Integrity error: {str(e)}')
        return jsonify({'error': 'Database Integrity error'}), 400
    except ValidationError as e:
        logger.error(f'Validation error: {str(e)}')

        # Collect missing or invalid fields in a similar structure to validate_json
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