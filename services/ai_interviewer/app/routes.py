from flask import Blueprint, request, jsonify, render_template
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

# API routes
@api_bp.route('/generate-question', methods=['POST'])
def generate_question():
    try:
        data = request.get_json()
        
        # Validate required fields - level is mandatory
        if not data or 'level' not in data:
            return jsonify({
                'error': 'Missing required field: level'
            }), 400
        
        level = data['level']
        role = data.get('role', None)
        topic = data.get('topic', None)
        
        # User must provide either role OR topic, not both
        if not role and not topic:
            return jsonify({
                'error': 'Must provide either role or topic'
            }), 400
        
        if role and topic:
            return jsonify({
                'error': 'Provide either role OR topic, not both'
            }), 400
        
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
    try:
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
        
        # Evaluate answer using controller
        evaluation = controller.evaluate_answer(question, answer, level, role, topic)
        
        return jsonify(evaluation)
        
    except Exception as e:
        logging.error(f"Error evaluating answer: {str(e)}")
        return jsonify({'error': 'Failed to evaluate answer'}), 500

@api_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'service': 'ai-interviewer'})

# Error handlers for API
@api_bp.errorhandler(404)
def api_not_found(error):
    return jsonify({'error': 'API endpoint not found'}), 404

@api_bp.errorhandler(500)
def api_internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

@api_bp.route('/test', methods=['GET', 'POST', 'OPTIONS'])
def test():
    return jsonify({
        'message': 'Flask server is running!', 
        'method': request.method,
        'cors': 'enabled'
    })