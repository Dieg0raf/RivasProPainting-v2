from pydantic import BaseModel, Field, validator
from config.validation import FIELD_LENGTHS
import re

class QuoteCreate(BaseModel):
    first_name: str = Field(..., description="The first name of the client")
    last_name: str = Field(..., description="The last name of the client")
    email: str = Field(..., description="The email of the client")
    phone: str = Field(..., description="The phone number of the client")
    message: str = Field(..., description="The message of the client")
    services: list[str] = Field(..., description="The services of the client")

    class Config:
        extra = "forbid"   # ignore (default), allow, forbid

    @validator('first_name', 'last_name')
    def validate_name(cls, v):
        if len(v) < FIELD_LENGTHS['first_name'][0] or len(v) > FIELD_LENGTHS['first_name'][1]:
            raise ValueError(f"Name must be between {FIELD_LENGTHS['first_name'][0]} and {FIELD_LENGTHS['first_name'][1]} characters")
        return v

    @validator('email')
    def validate_email(cls, v):
        if len(v) < FIELD_LENGTHS['email'][0] or len(v) > FIELD_LENGTHS['email'][1]:
            raise ValueError(f"Email must be between {FIELD_LENGTHS['email'][0]} and {FIELD_LENGTHS['email'][1]} characters")

        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, v):
            raise ValueError("Invalid email address")
        return v

    @validator('phone')
    def validate_phone(cls, v):
        if len(v) < FIELD_LENGTHS['phone'][0] or len(v) > FIELD_LENGTHS['phone'][1]:
            raise ValueError(f"Phone must be between {FIELD_LENGTHS['phone'][0]} and {FIELD_LENGTHS['phone'][1]} characters")
        return v

    @validator('message')
    def validate_message(cls, v):
        if len(v) < FIELD_LENGTHS['message'][0] or len(v) > FIELD_LENGTHS['message'][1]:
            raise ValueError(f"Message must be between {FIELD_LENGTHS['message'][0]} and {FIELD_LENGTHS['message'][1]} characters")
        return v

    # TODO: Validate that services are valid ones (actual services we offer)
    @validator('services')
    def validate_services(cls, v):
        if not v or len(v) == 0:
            raise ValueError("Services are required")
        return v