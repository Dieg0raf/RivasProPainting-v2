from functools import wraps
from flask import request, jsonify
import re
import hmac
import os
from .logger import logger

def validate_json(required_fields=None):
    """Validate the JSON format of the request"""
    def decorator(func):
        @wraps(func) # This preserves the metadata of the function
        def wrapper(*args, **kwargs):
            try:
                # Get the JSON data from the request
                data = request.get_json()
                if not data:
                    logger.error('No data provided')
                    return jsonify({'error': 'No data provided', "message": "Please send the data in JSON format"}), 400

                # Check if the required fields are present
                if required_fields:
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

def validate_field_lengths(field_limits):
    """Validate the length of the fields in the request"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                data = request.get_json()

                # Check if the field lengths are within the specified min/max limits
                violated_length_fields = []
                for field, limits in field_limits.items():
                    if field in data:
                        min_length, max_length = limits
                        
                        field_value = str(data[field])
                        actual_length = len(field_value)

                        if actual_length < min_length:
                            violated_length_fields.append({
                                "reason": "too short",
                                "field": field,
                                "min_length": min_length,
                                "max_length": max_length,
                                "actual_length": actual_length,
                            })
                        elif actual_length > max_length:
                            violated_length_fields.append({
                                "reason": "too long",
                                "field": field,
                                "min_length": min_length,
                                "max_length": max_length,
                                "actual_length": actual_length,
                            })

                # If any fields violated the length limits, return an error
                if violated_length_fields:
                    logger.error(f'Field length validation failed: {violated_length_fields}')
                    return jsonify({
                        "error": "Field length validation failed",
                        "message": "Some fields have lengths outside the allowed range",
                        "violations": violated_length_fields
                    }), 400

                return func(*args, **kwargs)

            except Exception as e:
                logger.error(f'Error validating field lengths: {str(e)}')
                return jsonify({'error': str(e)}), 400
        return wrapper
    return decorator

def validate_email_format(func):
    """Validate the email format of the request"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            data = request.get_json()
            errors = {}
            
            if 'email' in data:
                email = data['email']
                
                # checks
                if not email or len(email.strip()) == 0:
                    errors['email'] = "Email address is required"
                else:
                    
                    # format validation
                    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                    email = email.strip()
                    
                    if not re.match(email_pattern, email):
                        errors['email'] = "Please enter a valid email address"
                    else:
                        # checks for realistic emails
                        local_part, domain = email.split('@')
                        
                        # checks for consecutive dots
                        if '..' in local_part or '..' in domain:
                            errors['email'] = "Email address cannot contain consecutive dots"
                        
                        # checks for valid local part
                        if local_part.startswith('.') or local_part.endswith('.'):
                            errors['email'] = "Email address cannot start or end with a dot"
                        
                        # checks for valid domain
                        if domain.startswith('.') or domain.endswith('.'):
                            errors['email'] = "Invalid domain format"
            
            if errors:
                logger.error(f'Email validation failed: {errors}')
                return jsonify({
                    "error": "Email validation failed",
                    "message": "Please correct the email format",
                    "details": errors
                }), 400
            
            return func(*args, **kwargs)
            
        except Exception as e:
            logger.error(f'Error validating email format: {str(e)}')
            return jsonify({
                "error": "Validation error",
                "message": "An error occurred during email validation",
                "details": str(e)
            }), 400
    
    return wrapper

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