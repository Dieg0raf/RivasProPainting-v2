from database import db
from sqlalchemy import Column, Integer, String, Text, JSON
from sqlalchemy.types import DateTime
from datetime import datetime

class Quote(db.Model):
    __tablename__ = 'quotes'
    id = Column(Integer, primary_key=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    email = Column(String(120), nullable=False)
    phone = Column(String(20), nullable=False)
    message = Column(Text, nullable=False)
    services = Column(JSON, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)