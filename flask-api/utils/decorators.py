from functools import wraps
from flask import request, jsonify
import hmac, re, os
from .logger import logger
from config.config import MAX_KEY_LENGTH

def validate_json(required_fields=None, max_key_length=MAX_KEY_LENGTH):
    """Validate the JSON format of the request"""
    def decorator(func):
        @wraps(func) # This preserves the metadata of the function
        def wrapper(*args, **kwargs):
            try:
                # Check if the required fields are configured
                if not required_fields:
                    return jsonify({
                        "error": "Server configuration error",
                        "message": "Required fields are not configured"
                    }), 500
                
                # Get the JSON data from the request
                data = request.get_json()
                if not data:
                    logger.error('No data provided')
                    return jsonify({'error': 'No data provided', "message": "Please send the data in JSON format"}), 400
                
                # Check if the key sizes are within the specified limit
                for key in data.keys():
                    if len(key) > max_key_length:
                        return jsonify({
                            "error": "Invalid field names",
                            "message": "Field names are too long"
                        }), 400

                # Check if the required fields are present
                missing_fields = [field for field in required_fields if not data.get(field)]
                if missing_fields:
                    return jsonify({
                        "error": "Missing required fields",
                        "message": "Please fill in all the required fields",
                        "missing_fields": missing_fields
                    }), 400
                
                return func(*args, **kwargs)

            except Exception as e:
                logger.error(f'Error validating JSON: {str(e)}')
                return jsonify({'error': str(e)}), 400
            
        return wrapper
    return decorator


def require_api_key(func):
    """Require valid API key for endpoint access"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            # get API key from Authorization header
            api_key = request.headers.get('Authorization')
            
            if not api_key:
                logger.warning("API request without key")
                return jsonify({
                    "error": "API key required",
                    "message": "Please provide an API key in the Authorization header"
                }), 401
            
            # get secret key from environment
            secret_key = os.getenv('API_SECRET_KEY')
            if not secret_key:
                logger.error("API_SECRET_KEY not found in environment variables")
                return jsonify({
                    "error": "Server configuration error",
                    "message": "API key validation not configured"
                }), 500
            
            # compare using constant time comparison
            if not hmac.compare_digest(api_key, secret_key):
                logger.warning(f"Invalid API key attempt: {api_key[:10]}...")
                return jsonify({
                    "error": "Invalid API key",
                    "message": "The provided API key is not valid"
                }), 401
            
            logger.info("API key validated successfully")
            return func(*args, **kwargs)
            
        except Exception as e:
            logger.error(f"Error in API key validation: {str(e)}")
            return jsonify({
                "error": "Authentication error",
                "message": "An error occurred during authentication"
            }), 500
    
    return wrapper