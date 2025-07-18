import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # flask Configuration
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    
    # API Keys
    GROQ_API_KEY = os.environ.get('GROQ_API_KEY')
    
    # MongoDB Configuration
    MONGODB_URI = os.environ.get('MONGODB_URI')
    
    # application Settings
    DEBUG = os.environ.get('DEBUG', 'True').lower() == 'true'
    
    @staticmethod
    def validate_config():
        """Validate required configuration"""
        required_vars = ['GROQ_API_KEY']
        
        for var in required_vars:
            if not getattr(Config, var):
                raise ValueError(f"Missing required environment variable: {var}")