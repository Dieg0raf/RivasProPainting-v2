from flask import Flask, jsonify, request
from flask_cors import CORS
import logging
import os
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from utils.decorators import validate_json, validate_field_lengths, validate_email_format, require_api_key
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

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

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.route('/quote/submit', methods=['POST'])
@limiter.limit(os.getenv('QUOTE_RATE_LIMIT', '100/day;5/hour;2/minute'))
@require_api_key
@validate_json(required_fields=['first_name', 'last_name', 'email', 'phone', 'message', 'services'])
@validate_field_lengths({
    'first_name': [1, 50],  # [min_length, max_length]
    'last_name': [1, 50], 
    'email': [5, 120], 
    'phone': [10, 20], 
    'message': [10, 2000]
})
@validate_email_format
def submit_quote():

    logger.info('Submitted quote request')
    try:
        # TODO: Uncomment this when we have a secure connection
        # if not request.is_secure and not app.config['DEBUG']:
        #     return jsonify({'error': 'Insecure connection'}), 400
        

        return jsonify({'message': 'Quote request submitted'}), 200
    except Exception as e:
        logger.error(f'Error submitting quote request: {e}')
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