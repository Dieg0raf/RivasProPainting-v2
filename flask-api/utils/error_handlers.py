from pydantic import ValidationError
from typing import Dict, Any

def format_validation_errors(validation_error: ValidationError) -> Dict[str, Any]:
    violations = []
    for error in validation_error.errors():
        field_name = error['loc'][0] if error['loc'] else 'unknown'
        violations.append({
            "field": field_name,
            "reason": error['msg'],
            "input": error.get('input', ''),
            "error_type": error.get('type', 'validation_error')
        })
    
    return {
        "error": "Validation failed",
        "message": "Please fill in all the required fields correctly",
        "violations": violations
    }

def format_integrity_error(integrity_error) -> Dict[str, str]:
    return {
        "error": "Database Integrity error",
    }

def format_generic_error(error_message: str) -> Dict[str, str]:
    return {
        "error": "Internal server error",
    }

def format_rate_limit_error() -> Dict[str, str]:
    return {
        "error": "Rate limit exceeded",
        "message": "Too many requests. Please try again later.",
    }