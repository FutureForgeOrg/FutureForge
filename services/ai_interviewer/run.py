"""
Entry point for the AI Interviewer Flask application.
Run this file to start the development server.

Usage:
    python run.py              # Normal backend API + basic UI
    python run.py --api-only   # Pure API mode, no UI routes
    python run.py --help       # Show help
"""

import os
import sys
import logging
import argparse
from common.config import Config

def setup_logging():
    """Configure logging for the application - terminal only"""
    log_level = getattr(logging, Config.LOG_LEVEL.upper(), logging.INFO)
    
    logging.basicConfig(
        level=log_level,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[logging.StreamHandler(sys.stdout)]
    )
    
    # Reduce noise from external libraries
    logging.getLogger('urllib3').setLevel(logging.WARNING)
    logging.getLogger('requests').setLevel(logging.WARNING)

def validate_environment():
    """Validate environment and dependencies"""
    try:
        # Check required packages
        import flask, flask_cors, requests, langchain, langchain_groq
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

def test_groq_connection():
    """Test connection to Groq API"""
    try:
        from services.groq_service import GroqService
        
        print("Testing Groq API connection...")
        groq_service = GroqService()
        is_connected, message = groq_service.test_connection()
        
        if is_connected:
            print("Groq API connection successful")
            return True
        else:
            print(f"Groq API connection failed: {message}")
            return False
            
    except Exception as e:
        print(f"Groq API test failed: {str(e)}")
        return False

def print_startup_info(api_only=False):
    """Print application startup information"""
    mode = "API ONLY MODE" if api_only else "FULL MODE (API + UI)"
    
    print("=" * 60)
    print(f"AI INTERVIEWER - {mode}")
    print("=" * 60)
    print(f"Host: {os.getenv('HOST', '0.0.0.0')}")
    print(f"Port: {os.getenv('PORT', 5000)}")
    print(f"Environment: {os.getenv('FLASK_ENV', 'development')}")
    print(f"Debug Mode: {Config.DEBUG}")
    print(f"Groq API: {'Connected' if Config.GROQ_API_KEY else 'Missing'}")
    
    if api_only:
        print("\nAPI ENDPOINTS:")
        print("  GET  /api/health")
        print("  POST /api/generate-question")
        print("  POST /api/evaluate-answer")
    else:
        print("\nAVAILABLE ROUTES:")
        print("  GET  /              (Home/Test Interface)")
        print("  GET  /test          (Test Interface)")
        print("  GET  /api/health    (Health Check)")
        print("  POST /api/generate-question")
        print("  POST /api/evaluate-answer")
    
    print(f"\nACCESS URLs:")
    print(f"  Local:    http://localhost:{os.getenv('PORT', 5000)}")
    print(f"  Network:  http://0.0.0.0:{os.getenv('PORT', 5000)}")
    print("=" * 60)

def parse_arguments():
    """Parse command line arguments"""
    parser = argparse.ArgumentParser(
        description='AI Interviewer Flask Application',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python run.py              # Full mode (API + UI routes)
  python run.py --api-only   # API only mode (no UI routes)

Modes:
  Full:     Backend API + Test Interface UI
  API-Only: Pure backend API service only
        """
    )
    
    parser.add_argument(
        '--api-only',
        action='store_true',
        help='Run in API-only mode (no UI routes)'
    )
    
    return parser.parse_args()

def create_directories():
    """Create only essential directories"""
    dirs = ['templates']  # Removed 'static' since you don't use it
    
    for directory in dirs:
        if not os.path.exists(directory):
            os.makedirs(directory)
            print(f"Created directory: {directory}")

def main():
    """Main function to run the Flask application"""
    try:
        # Parse command line arguments
        args = parse_arguments()
        api_only_mode = args.api_only
        
        print_startup_info(api_only_mode)
        
        # Create necessary directories
        create_directories()
        
        # Setup logging
        setup_logging()
        logger = logging.getLogger(__name__)
        
        logger.info(f"Starting AI Interviewer in {'API-only' if api_only_mode else 'full'} mode...")
        
        # Validate environment
        if not validate_environment():
            print("\nEnvironment validation failed. Please fix the issues above.")
            sys.exit(1)
        
        # Test Groq API connection
        if not test_groq_connection():
            print("\nGroq API connection failed. App will start but may not function properly.")
            print("Please check your GROQ_API_KEY in the .env file")
        
        # Import and create Flask app using existing factory
        from app import create_app
        
        # Pass the api_only_mode flag to the factory function
        app = create_app(api_only=api_only_mode)
        
        logger.info("Flask app created successfully")
        
        # Get configuration
        host = os.getenv('HOST', '0.0.0.0')
        port = int(os.getenv('PORT', 5000))
        debug = Config.DEBUG
        
        print(f"\nStarting server...")
        print("Press Ctrl+C to stop the server")
        print("=" * 60)
        
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
        sys.exit(0)
        
    except ValueError as e:
        print(f"\nConfiguration error: {e}")
        print("Please check your .env file and ensure all required variables are set.")
        print("\nRequired variables:")
        print("- GROQ_API_KEY (Get from: https://console.groq.com/keys)")
        sys.exit(1)
        
    except ImportError as e:
        print(f"\nMissing dependencies: {e}")
        print("Install required packages: pip install -r requirements.txt")
        sys.exit(1)
        
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"\nPort {os.getenv('PORT', 5000)} is already in use")
            print("Solutions:")
            print("1. Stop the service using that port")
            print("2. Change PORT in .env file")
            print("3. Kill process: lsof -ti:5000 | xargs kill -9")
        else:
            print(f"\nSystem error: {e}")
        sys.exit(1)
        
    except Exception as e:
        print(f"\nUnexpected error: {e}")
        logging.error(f"Unexpected error: {e}", exc_info=True)
        sys.exit(1)

if __name__ == '__main__':
    # Check Python version
    if sys.version_info < (3, 7):
        print("Python 3.7 or higher is required")
        print(f"Current version: {sys.version}")
        sys.exit(1)
    
    # Add project root to Python path
    project_root = os.path.dirname(os.path.abspath(__file__))
    if project_root not in sys.path:
        sys.path.insert(0, project_root)
    
    # Run the application
    main()

# Create app instance for production servers like Gunicorn
app = None

def get_app():
    """Factory function for production deployment"""
    global app
    if app is None:
        from app import create_app
        app = create_app(api_only=True)  # Use API-only mode for production
    return app

# Create app instance for Gunicorn
app = get_app()