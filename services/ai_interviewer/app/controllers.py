from services.groq_service import GroqService
from app.utils import validate_input

class InterviewController:
    
    @staticmethod
    def generate_question(data):
        # validate input
        validation_result = validate_input(data)
        if not validation_result['valid']:
            raise ValueError(validation_result['message'])
        
        # extract parameters
        role = data.get('role')
        level = data.get('level')
        topic = data.get('topic', '')
        
        # generate question using Groq
        groq_service = GroqService()
        question = groq_service.generate_question(role, level, topic)
        
        return {
            "success": True,
            "question": question,
            "role": role,
            "level": level,
            "topic": topic
        }
