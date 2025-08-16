import os
from flask import Flask
from flask_cors import CORS
from common.config import Config

def create_app():
    # Get the parent directory (ai_interviewer root) from the current app directory
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    # Set template and static folder paths
    template_dir = os.path.join(base_dir, 'templates')
    static_dir = os.path.join(base_dir, 'static')
    
    # Create Flask app with correct template and static folders
    app = Flask(__name__, 
                template_folder=template_dir,
                static_folder=static_dir)
    
    app.config.from_object(Config)
    
    # Enable CORS for frontend communication
    # Allow your actual frontend URL
    CORS(app, origins=[
        'http://localhost:5173',  # Vite dev server
        'http://localhost:3000',  # React dev server
        'http://localhost:5000',  # If needed
        'https://*.vercel.app'    # Your deployed app
    ], supports_credentials=True)
    
    # Register blueprints
    from app.routes import main_bp, api_bp
    
    # Register main routes at root
    app.register_blueprint(main_bp)
    
    # Register API routes with /api prefix
    app.register_blueprint(api_bp, url_prefix='/api')
    
    return app