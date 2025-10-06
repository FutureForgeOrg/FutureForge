from flask import Blueprint, request, jsonify, render_template, current_app
from app.controllers import InterviewController
import logging

# Create main blueprint for root routes
main_bp = Blueprint('main', __name__)

# Create API blueprint for API routes
api_bp = Blueprint('api', __name__)
controller = InterviewController()

# Main routes (served from root)
@main_bp.route('/')
def home():
    return render_template('test_interface.html')

@main_bp.route('/test')
def test_interface():
    return render_template('test_interface.html')

# SECURITY FIX: Helper function to validate request size
def validate_request_size():
    """Validate request content length"""
    content_length = request.content_length
    if content_length and content_length > current_app.config['MAX_CONTENT_LENGTH']:
        return jsonify({
            'error': 'Request too large. Maximum size is 16KB'
        }), 413
    return None

# SECURITY FIX: Get limiter decorator - this function works within app context
def get_limiter():
    """Get the limiter from current app"""
    return current_app.limiter

# API routes with SECURITY FIXES
@api_bp.route('/generate-question', methods=['POST'])
def generate_question():
    # Apply rate limit inside the function, not as decorator
    limiter = get_limiter()
    limiter.limit("20 per minute")(lambda: None)()
    
    try:
        # SECURITY FIX: Validate request size
        size_error = validate_request_size()
        if size_error:
            return size_error
        
        data = request.get_json()
        
        # Validate required fields - level is mandatory
        if not data or 'level' not in data:
            return jsonify({
                'error': 'Missing required field: level'
            }), 400
        
        level = data['level']
        role = data.get('role', None)
        topic = data.get('topic', None)
        
        # SECURITY FIX: Validate level value
        valid_levels = ['Beginner', 'Intermediate', 'Advanced']
        if level not in valid_levels:
            return jsonify({
                'error': f'Invalid level. Must be one of: {", ".join(valid_levels)}'
            }), 400
        
        # User must provide either role OR topic, not both
        if not role and not topic:
            return jsonify({
                'error': 'Must provide either role or topic'
            }), 400
        
        if role and topic:
            return jsonify({
                'error': 'Provide either role OR topic, not both'
            }), 400
        
        # SECURITY FIX: Validate string lengths
        if role and len(str(role)) > 100:
            return jsonify({'error': 'Role name too long (max 100 characters)'}), 400
        
        if topic and len(str(topic)) > 100:
            return jsonify({'error': 'Topic name too long (max 100 characters)'}), 400
        
        # Generate question using controller
        question = controller.generate_question(level, role, topic)
        
        response_data = {
            'question': question,
            'level': level
        }
        
        # Add either role or topic to response
        if role:
            response_data['role'] = role
        else:
            response_data['topic'] = topic
            
        return jsonify(response_data)
        
    except Exception as e:
        logging.error(f"Error generating question: {str(e)}")
        return jsonify({'error': 'Failed to generate question'}), 500

@api_bp.route('/evaluate-answer', methods=['POST'])
def evaluate_answer():
    # Apply rate limit inside the function, not as decorator
    limiter = get_limiter()
    limiter.limit("30 per minute")(lambda: None)()
    
    try:
        # SECURITY FIX: Validate request size
        size_error = validate_request_size()
        if size_error:
            return size_error
        
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['question', 'answer', 'level']
        if not all(field in data for field in required_fields):
            return jsonify({
                'error': f'Missing required fields. Need: {", ".join(required_fields)}'
            }), 400
        
        question = data['question']
        answer = data['answer']
        level = data['level']
        role = data.get('role', None)
        topic = data.get('topic', None)
        
        # SECURITY FIX: Validate string lengths
        if len(str(question)) > 500:
            return jsonify({'error': 'Question too long (max 500 characters)'}), 400
        
        if len(str(answer)) > 5000:
            return jsonify({'error': 'Answer too long (max 5000 characters)'}), 400
        
        if len(str(level)) > 50:
            return jsonify({'error': 'Level too long'}), 400
        
        # SECURITY FIX: Validate level value
        valid_levels = ['Beginner', 'Intermediate', 'Advanced']
        if level not in valid_levels:
            return jsonify({
                'error': f'Invalid level. Must be one of: {", ".join(valid_levels)}'
            }), 400
        
        # Evaluate answer using controller
        evaluation = controller.evaluate_answer(question, answer, level, role, topic)
        
        return jsonify(evaluation)
        
    except Exception as e:
        logging.error(f"Error evaluating answer: {str(e)}")
        return jsonify({'error': 'Failed to evaluate answer'}), 500

@api_bp.route('/health', methods=['GET'])
def health_check():
    # Apply rate limit inside the function
    limiter = get_limiter()
    limiter.limit("100 per minute")(lambda: None)()
    
    return jsonify({'status': 'healthy', 'service': 'ai-interviewer'})

# Error handlers for API
@api_bp.errorhandler(404)
def api_not_found(error):
    return jsonify({'error': 'API endpoint not found'}), 404

@api_bp.errorhandler(500)
def api_internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

@api_bp.errorhandler(429)  # SECURITY FIX: Rate limit error handler
def ratelimit_handler(e):
    return jsonify({
        'error': 'Rate limit exceeded. Please try again later.',
        'message': str(e.description)
    }), 429

@api_bp.route('/test', methods=['GET', 'POST', 'OPTIONS'])
def test():
    # Apply rate limit inside the function
    limiter = get_limiter()
    limiter.limit("50 per minute")(lambda: None)()
    
    return jsonify({
        'message': 'Flask server is running!', 
        'method': request.method,
        'cors': 'enabled'
    })