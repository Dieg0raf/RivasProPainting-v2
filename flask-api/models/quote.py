from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.types import DateTime
from datetime import datetime

# FYI: 
# Cannot use 'DeclarativeBase' directly as a declarative base class. Create a Base by creating a subclass of it.

class Base(DeclarativeBase):
    pass

class Quote(Base):
    __tablename__ = 'quotes'
    id = Column(Integer, primary_key=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    email = Column(String(120), nullable=False)
    phone = Column(String(20), nullable=False)
    message = Column(Text, nullable=False)
    services = Column(String(20), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)