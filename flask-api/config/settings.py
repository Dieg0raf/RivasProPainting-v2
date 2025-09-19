import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Rate limiting
    DEFAULT_RATE_LIMIT = os.getenv('DEFAULT_RATE_LIMIT', '100 per day')
    QUOTE_RATE_LIMIT = os.getenv('QUOTE_RATE_LIMIT', '100/day;5/hour;2/minute')
    
    # API Security
    API_KEY = os.getenv('API_KEY')
    
    # CORS settings
    CORS_ORIGINS = []

class DevelopmentConfig(Config):
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.getenv('LOCAL_DATABASE_URL', 'sqlite:///quotes.db')
    CORS_ORIGINS = ["localhost:3000", "127.0.0.1:3000"]
    
    def __init__(self):
        print('Development environment')

class ProductionConfig(Config):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = os.getenv('PROD_DATABASE_URL')
    CORS_ORIGINS = [
        os.getenv("NEXT_JS_APP_HOST"),
        os.getenv("NEXT_JS_APP_HOST_v2")
    ]
    
    def __init__(self):
        print('Production environment')

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    CORS_ORIGINS = ["localhost:3000"]

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}

def get_config():
    env = os.getenv('FLASK_ENV', 'development')
    return config.get(env, config['default'])
