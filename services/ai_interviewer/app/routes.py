from flask import Blueprint, request, jsonify
from app.controllers import InterviewController

main = Blueprint('main', __name__)

@main.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "AI Interviewer service is running"})

@main.route('/generate-question', methods=['POST'])
def generate_question():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or 'role' not in data or 'level' not in data:
            return jsonify({"error": "Role and level are required"}), 400
        
        result = InterviewController.generate_question(data)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500