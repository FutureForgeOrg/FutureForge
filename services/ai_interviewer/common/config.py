import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    # Flask configuration
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    DEBUG = os.getenv('FLASK_DEBUG', 'False').lower() in ['true', '1', 'yes']
    
    # Groq API configuration
    GROQ_API_KEY = os.getenv('GROQ_API_KEY')
    GROQ_MODEL = os.getenv('GROQ_MODEL', 'llama-3.1-8b-instant') 
    
    # CORS configuration - SECURITY FIX
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', '').split(',') if os.getenv('CORS_ORIGINS') else []
    
    # Rate limiting configuration - NEW SECURITY FIX
    RATELIMIT_ENABLED = os.getenv('RATELIMIT_ENABLED', 'True').lower() in ['true', '1', 'yes']
    RATELIMIT_STORAGE_URI = os.getenv('RATELIMIT_STORAGE_URI', 'memory://')
    RATELIMIT_DEFAULT = os.getenv('MAX_REQUESTS_PER_MINUTE', '60') + ' per minute'
    
    # Logging configuration
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
    
    # API configuration - SECURITY FIX: Limit request size
    MAX_CONTENT_LENGTH = 16 * 1024  # 16KB max request size
    
    @classmethod
    def validate_config(cls):
        """Validate that required configuration is present"""
        required_vars = ['GROQ_API_KEY']
        missing_vars = []
        
        for var in required_vars:
            if not getattr(cls, var):
                missing_vars.append(var)
        
        if missing_vars:
            raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")
        
        # SECURITY FIX: Validate CORS origins
        if not cls.CORS_ORIGINS:
            raise ValueError("CORS_ORIGINS must be set in environment variables")
        
        return True