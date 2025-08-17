import os
from flask import Flask
from flask_cors import CORS
from common.config import Config

def create_app(api_only=False):
    """Create and configure Flask application"""
    # Get the parent directory (ai_interviewer root) from the current app directory
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    # Set template and static folder paths
    template_dir = os.path.join(base_dir, 'templates')
    # static_dir = os.path.join(base_dir, 'static')
    
    # Create Flask app with correct template and static folders
    app = Flask(__name__, 
                template_folder=template_dir)
    
    app.config.from_object(Config)
    
    # Configure CORS once - supporting your frontend
    CORS(app, origins=[
        'http://localhost:5173',  # Vite dev server 
        'http://localhost:3000',  # React dev server
        'http://127.0.0.1:5173',  # Alternative localhost
        'http://127.0.0.1:3000',  # Alternative localhost  
        'http://localhost:5000',  # Backend self-reference
        'https://*.vercel.app'    # Production deployments
    ], 
    supports_credentials=True,
    methods=['GET', 'POST', 'OPTIONS'],
    allow_headers=['Content-Type', 'Authorization', 'Accept'])
    
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
                'supported_origins': [
                    'http://localhost:5173',
                    'http://localhost:3000'
                ]
            })
    else:
        # Full mode: Register both API and UI routes
        from app.routes import main_bp
        
        # Register main routes at root (for test interface)
        app.register_blueprint(main_bp)
        
        # Register API routes with /api prefix
        app.register_blueprint(api_bp, url_prefix='/api')
    
    return app