import os
from flask import Flask
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from common.config import Config

def create_app(api_only=False):
    """Create and configure Flask application"""
    # Get the parent directory (ai_interviewer root) from the current app directory
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    # Set template and static folder paths
    template_dir = os.path.join(base_dir, 'templates')
    
    # Create Flask app with correct template and static folders
    app = Flask(__name__, 
                template_folder=template_dir)
    
    app.config.from_object(Config)
    
    # SECURITY FIX: Get CORS origins from environment ONLY
    cors_origins = []
    env_origins = Config.CORS_ORIGINS
    
    if env_origins:
        # Clean and validate each origin
        for origin in env_origins:
            origin = origin.strip()
            if origin:  # Only add non-empty origins
                cors_origins.append(origin)
    
    if not cors_origins:
        raise ValueError("No valid CORS origins configured. Please set CORS_ORIGINS in .env file")
    
    # Remove duplicates
    cors_origins = list(set(cors_origins))

    CORS(app, 
        origins=cors_origins,
        supports_credentials=True,
        methods=['GET', 'POST', 'OPTIONS'],
        allow_headers=['Content-Type', 'Authorization', 'Accept']
    )
    
    # SECURITY FIX: Initialize rate limiter
    limiter = Limiter(
        app=app,
        key_func=get_remote_address,
        default_limits=[Config.RATELIMIT_DEFAULT],
        storage_uri=Config.RATELIMIT_STORAGE_URI,
        enabled=Config.RATELIMIT_ENABLED
    )
    
    # Make limiter available to routes
    app.limiter = limiter
    
    # Register blueprints based on mode
    from app.routes import api_bp
    
    if api_only:
        # API-only mode: Only register API routes
        app.register_blueprint(api_bp, url_prefix='/api')
        
        # Add a simple root route for API info
        @app.route('/')
        def api_root():
            from flask import jsonify
            return jsonify({
                'service': 'AI Interviewer API',
                'version': '1.0.0',
                'mode': 'API Only',
                'status': 'running',
                'endpoints': {
                    'health': '/api/health',
                    'generate_question': '/api/generate-question',
                    'evaluate_answer': '/api/evaluate-answer'
                },
                'documentation': 'Use POST requests to /api endpoints with JSON data',
                'cors_enabled': True,
                'rate_limiting': Config.RATELIMIT_ENABLED
            })
    else:
        # Full mode: Register both API and UI routes
        from app.routes import main_bp
        
        # Register main routes at root (for test interface)
        app.register_blueprint(main_bp)
        
        # Register API routes with /api prefix
        app.register_blueprint(api_bp, url_prefix='/api')
    
    return app