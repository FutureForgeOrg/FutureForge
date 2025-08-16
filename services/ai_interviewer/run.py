"""
Entry point for the AI Interviewer Flask application.
Run this file to start the development server.

Usage:
    python run.py              # Normal backend API only
    python run.py --test       # Backend API + Test interface
    python run.py --help       # Show help
"""

import os
import sys
import logging
import argparse
from flask import Flask, jsonify, render_template
from common.config import Config
from flask_cors import CORS
from flask import request, make_response

def setup_logging():
    """Configure logging for the application"""
    log_level = getattr(logging, Config.LOG_LEVEL.upper(), logging.INFO)
    
    logging.basicConfig(
        level=log_level,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.StreamHandler(sys.stdout)
        ]
    )
    
    # Reduce noise from external libraries
    logging.getLogger('urllib3').setLevel(logging.WARNING)
    logging.getLogger('requests').setLevel(logging.WARNING)
    logging.getLogger('werkzeug').setLevel(logging.INFO)

def print_startup_info(test_mode=False):
    """Print application startup information"""
    mode = "BACKEND API + TEST INTERFACE" if test_mode else "BACKEND API ONLY"
    
    print("=" * 50)
    print(f"AI INTERVIEWER - {mode}")
    print("=" * 50)
    print(f"Host: {os.getenv('HOST', '0.0.0.0')}")
    print(f"Port: {os.getenv('PORT', 5000)}")
    print(f"Environment: {os.getenv('FLASK_ENV', 'development')}")
    print(f"Debug Mode: {Config.DEBUG}")
    print(f"Log Level: {Config.LOG_LEVEL}")
    print(f"Groq API Key: {'Set' if Config.GROQ_API_KEY else 'Missing'}")
    print("=" * 50)
    print("Access the application at:")
    print(f"Local: http://localhost:{os.getenv('PORT', 5000)}")
    print("=" * 50)
    
    if test_mode:
        print("TEST MODE ENABLED:")
        print("Test Interface: /test")
        print("API Endpoints: /api/*")
    else:
        print("NORMAL MODE:")
        print("API Endpoints: /api/*")
    
    print("=" * 50)

def validate_environment():
    """Validate environment and dependencies"""
    try:
        # Check required packages
        import flask
        import flask_cors
        import requests
        import langchain
        import langchain_groq
        
        print("All required packages are installed")
        
        # Validate configuration
        Config.validate_config()
        print("Configuration validation passed")
        
        return True
        
    except ImportError as e:
        print(f"Missing required package: {e}")
        print("Run: pip install -r requirements.txt")
        return False
    except ValueError as e:
        print(f"Configuration error: {e}")
        print("Please check your .env file")
        return False
    except Exception as e:
        print(f"Validation error: {e}")
        return False

def test_groq_connection():
    """Test connection to Groq API"""
    try:
        from services.groq_service import GroqService
        
        print("Testing Groq API connection...")
        groq_service = GroqService()
        is_connected, message = groq_service.test_connection()
        
        if is_connected:
            print("Groq API connection successful")
        else:
            print(f"Groq API connection failed: {message}")
            return False
            
        return True
        
    except Exception as e:
        print(f"Groq API test failed: {str(e)}")
        return False

def create_directories():
    """Create essential directories if they don't exist"""
    dirs = ['templates']
    
    for directory in dirs:
        if not os.path.exists(directory):
            os.makedirs(directory)
            print(f"Created directory: {directory}")

def validate_test_interface():
    """Check if test interface exists"""
    test_file = os.path.join('templates', 'test_interface.html')
    if os.path.exists(test_file):
        print("Test interface found: templates/test_interface.html")
        return True
    else:
        print("Test interface not found: templates/test_interface.html")
        print("Test mode requires this file to exist")
        return False

def create_app_with_mode(test_mode=False):
    """Create Flask app with specific mode configuration"""
    from flask import Flask
    from flask_cors import CORS
    from common.config import Config
    
    # Get the parent directory (ai_interviewer root)
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Set template and static folder paths
    template_dir = os.path.join(base_dir, 'templates')
    static_dir = os.path.join(base_dir, 'static')
    
    # Create Flask app with correct template and static folders
    app = Flask(__name__, 
                template_folder=template_dir,
                static_folder=static_dir)
    
    app.config.from_object(Config)
    
    # FIXED: Enable CORS for frontend communication - Added your Vite server
    CORS(app, origins=[
        'http://localhost:5173',  # Vite dev server (YOUR FRONTEND)
        'http://localhost:3000',  # React dev server
        'http://127.0.0.1:5173',  # Alternative localhost
        'http://127.0.0.1:3000',  # Alternative localhost
        'http://localhost:5000',  # Self reference
        'https://*.vercel.app'    # Deployment
    ], supports_credentials=True, 
       methods=['GET', 'POST', 'OPTIONS'],
       allow_headers=['Content-Type', 'Authorization'])
    
    # Add explicit preflight handling
    @app.before_request
    def handle_preflight():
        if request.method == "OPTIONS":
            response = make_response()
            response.headers.add("Access-Control-Allow-Origin", "*")
            response.headers.add('Access-Control-Allow-Headers', "Content-Type,Authorization")
            response.headers.add('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE,OPTIONS")
            return response
    
    # Register API blueprint (always needed)
    from app.routes import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    # Print debug info
    print(f"CORS enabled for origins: http://localhost:5173, http://localhost:3000")
    print(f"Registered routes:")
    for rule in app.url_map.iter_rules():
        if rule.endpoint.startswith('api'):
            print(f"  {rule.endpoint}: {rule.rule} [{', '.join(rule.methods)}]")
    
    # Register main blueprint conditionally or override routes
    if test_mode:
        # In test mode, don't register main_bp, define our own routes
        @app.route('/')
        def root():
            """Root route - redirect to test interface"""
            return f"""
            <!DOCTYPE html>
            <html>
            <head>
                <title>AI Interviewer - Test Mode</title>
                <style>
                    body {{ font-family: Arial, sans-serif; margin: 40px; }}
                    .container {{ max-width: 600px; margin: 0 auto; }}
                    h1 {{ color: #333; }}
                    ul {{ list-style-type: none; padding: 0; }}
                    li {{ margin: 10px 0; }}
                    a {{ text-decoration: none; color: #007bff; }}
                    a:hover {{ text-decoration: underline; }}
                    .btn {{ display: inline-block; padding: 10px 20px; background: #007bff; color: white; border-radius: 5px; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>AI Interviewer Service</h1>
                    <p><strong>Mode:</strong> Test Mode Enabled</p>
                    <hr>
                    <h3>Available Endpoints:</h3>
                    <ul>
                        <li><a href="/test" class="btn">🧪 Test Interface</a></li>
                        <li><a href="/api/health">📊 API Health Check</a></li>
                    </ul>
                    <hr>
                    <p>Backend API is running with test interface enabled.</p>
                </div>
            </body>
            </html>
            """
        
        @app.route('/test')
        def test_interface():
            """Serve the test interface"""
            try:
                return render_template('test_interface.html')
            except Exception as e:
                return f"""
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Test Interface Error</title>
                    <style>
                        body {{ font-family: Arial, sans-serif; margin: 40px; color: #333; }}
                        .error {{ background: #f8d7da; padding: 20px; border-radius: 5px; border: 1px solid #dc3545; }}
                        .solutions {{ background: #fff3cd; padding: 20px; border-radius: 5px; border: 1px solid #ffc107; }}
                        ul {{ margin: 10px 0; }}
                        a {{ color: #007bff; }}
                    </style>
                </head>
                <body>
                    <h1>Error Loading Test Interface</h1>
                    <div class="error">
                        <p>Could not load test_interface.html from templates folder.</p>
                        <p><strong>Error:</strong> {str(e)}</p>
                    </div>
                    <br>
                    <div class="solutions">
                        <h3>Solutions:</h3>
                        <ul>
                            <li>Ensure templates/test_interface.html exists</li>
                            <li>Check file permissions</li>
                            <li>Verify file is valid HTML</li>
                        </ul>
                    </div>
                    <hr>
                    <p><a href="/api/health">Check API Health</a> | <a href="/">Back to Home</a></p>
                </body>
                </html>
                """, 500
    else:
        # Normal mode - API only, don't register main_bp
        @app.route('/')
        def api_root():
            """Root route for API mode - show API info"""
            return jsonify({
                'service': 'AI Interviewer API',
                'mode': 'API Only',
                'status': 'running',
                'endpoints': {
                    'health': '/api/health',
                    'generate_question': '/api/generate-question',
                    'evaluate_answer': '/api/evaluate-answer'
                },
                'message': 'This is the backend API. Use /api/* endpoints for functionality.',
                'documentation': 'Visit /api/health to check service status'
            })
    
    return app

def parse_arguments():
    """Parse command line arguments"""
    parser = argparse.ArgumentParser(
        description='AI Interviewer Flask Application',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python run.py              # Normal backend API
  python run.py --test       # Backend API + Test interface
  python run.py --help       # Show this help

Modes:
  Normal: Pure backend API service
  Test:   Backend API + Test interface for testing
        """
    )
    
    parser.add_argument(
        '--test',
        action='store_true',
        help='Enable test interface (adds /test route)'
    )
    
    return parser.parse_args()

def main():
    """Main function to run the Flask application"""
    try:
        # Parse command line arguments
        args = parse_arguments()
        test_mode = args.test
        
        print_startup_info(test_mode)
        
        # Create necessary directories
        create_directories()
        
        # Setup logging
        setup_logging()
        logger = logging.getLogger(__name__)
        
        logger.info(f"Starting AI Interviewer in {'test' if test_mode else 'normal'} mode...")
        
        # Validate environment
        if not validate_environment():
            print("Environment validation failed. Please fix the issues above.")
            sys.exit(1)
        
        # Test Groq API connection
        if not test_groq_connection():
            print("Groq API connection failed. App will start but may not function properly.")
            print("Please check your GROQ_API_KEY in the .env file")
        
        # Validate test interface if in test mode
        if test_mode:
            if not validate_test_interface():
                print("Test interface validation failed.")
                print("Create templates/test_interface.html or run without --test flag")
                sys.exit(1)
        
        # Create Flask app with appropriate mode
        logger.info("Creating Flask application...")
        app = create_app_with_mode(test_mode)
        logger.info("Flask app created successfully")
        
        # Get configuration
        host = os.getenv('HOST', '0.0.0.0')
        port = int(os.getenv('PORT', 5000))
        debug = Config.DEBUG
        
        logger.info(f"Starting server on {host}:{port}")
        logger.info(f"Debug mode: {debug}")
        
        if test_mode:
            print("Starting server with TEST INTERFACE...")
            print("Test Interface: /test")
            print("API Endpoints: /api/*")
        else:
            print("Starting BACKEND API server...")
            print("API Endpoints: /api/*")
        
        print("Press Ctrl+C to stop the server")
        print("=" * 50)
        
        # Run the application
        app.run(
            host=host,
            port=port,
            debug=debug,
            threaded=True,
            use_reloader=debug
        )
        
    except KeyboardInterrupt:
        print("\nServer stopped by user")
        logger.info("Server stopped by user (Ctrl+C)")
        sys.exit(0)
        
    except ValueError as e:
        error_msg = f"Configuration error: {e}"
        print(f"\n{error_msg}")
        print("Please check your .env file and ensure all required variables are set.")
        print("Required variables:")
        print("- GROQ_API_KEY (Get from: https://console.groq.com/keys)")
        
        if 'GROQ_API_KEY' in str(e):
            print("\nQuick fix:")
            print("1. Create/edit .env file in project root")
            print("2. Add: GROQ_API_KEY=your-api-key-here")
            print("3. Restart the application")
        
        logging.error(error_msg)
        sys.exit(1)
        
    except ImportError as e:
        error_msg = f"Missing dependencies: {e}"
        print(f"\n{error_msg}")
        print("Install required packages:")
        print("pip install -r requirements.txt")
        logging.error(error_msg)
        sys.exit(1)
        
    except OSError as e:
        if "Address already in use" in str(e):
            error_msg = f"Port {os.getenv('PORT', 5000)} is already in use"
            print(f"\n{error_msg}")
            print("Solutions:")
            print("1. Stop the service using that port")
            print("2. Change PORT in .env file")
            print("3. Kill the process: lsof -ti:5000 | xargs kill -9")
        else:
            error_msg = f"System error: {e}"
            print(f"\n{error_msg}")
        
        logging.error(error_msg)
        sys.exit(1)
        
    except Exception as e:
        error_msg = f"Unexpected error: {e}"
        print(f"\n{error_msg}")
        logging.error(error_msg, exc_info=True)
        sys.exit(1)

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 7):
        print("Python 3.7 or higher is required")
        print(f"Current version: {sys.version}")
        sys.exit(1)
    else:
        print(f"Python version: {sys.version.split()[0]}")

if __name__ == '__main__':
    # Check Python version
    check_python_version()
    
    # Add project root to Python path
    project_root = os.path.dirname(os.path.abspath(__file__))
    if project_root not in sys.path:
        sys.path.insert(0, project_root)
    
    # Run the application
    main()