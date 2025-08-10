from services.groq_service import GroqService
from app.utils import format_question_prompt, format_evaluation_prompt, detect_dont_know_answer
import logging
import time
import random

class InterviewController:
    def __init__(self):
        self.groq_service = GroqService()
        # Track recent questions to avoid repetition
        self.recent_questions = []
    
    def generate_question(self, level, role=None, topic=None):
        """Generate a unique interview question with variety"""
        max_attempts = 3
        
        for attempt in range(max_attempts):
            try:
                # Add randomness to ensure variety
                question = self.groq_service.generate_question_with_variety(
                    level, role, topic, attempt
                )
                
                if question and len(question.strip()) > 15:
                    cleaned_question = self._clean_question_response(question)
                    
                    # Check if question is too similar to recent ones
                    if not self._is_too_similar(cleaned_question):
                        self._add_to_recent(cleaned_question)
                        return cleaned_question
                
                # If similar or poor quality, try again
                time.sleep(0.5)  # Small delay between attempts
                
            except Exception as e:
                logging.error(f"Attempt {attempt + 1} failed: {str(e)}")
                if attempt == max_attempts - 1:
                    # Final fallback
                    return self._get_fallback_question(level, role, topic)
        
        return self._get_fallback_question(level, role, topic)
    
    def evaluate_answer(self, question, answer, level, role=None, topic=None):
        """Evaluate user's answer with improved logic"""
        try:
            # Handle empty or very short answers (score = 0)
            if not answer or len(answer.strip()) < 2:
                return {
                    'score': 0,
                    'feedback': 'No answer provided. Please try to answer the question, even if you are unsure.',
                    'max_score': 10
                }
            
            # Handle "don't know" responses (score = 1)
            if detect_dont_know_answer(answer):
                return {
                    'score': 1,
                    'feedback': 'Acknowledging uncertainty is honest, but try to provide any related knowledge or reasoning you might have, even if partial.',
                    'max_score': 10
                }
            
            # Use improved evaluation service
            evaluation = self.groq_service.evaluate_answer_improved(
                question, answer, level, role, topic
            )
            
            # Validate evaluation
            if self._is_valid_evaluation(evaluation):
                return evaluation
            else:
                return self._fallback_evaluation(question, answer, level)
                
        except Exception as e:
            logging.error(f"Error in evaluate_answer: {str(e)}")
            return self._fallback_evaluation(question, answer, level)
    
    def _is_too_similar(self, new_question):
        """Check if question is too similar to recent ones"""
        if not self.recent_questions:
            return False
        
        new_words = set(new_question.lower().split())
        
        for recent in self.recent_questions:
            recent_words = set(recent.lower().split())
            # If more than 60% words overlap, consider it too similar
            overlap = len(new_words.intersection(recent_words))
            similarity = overlap / max(len(new_words), len(recent_words))
            
            if similarity > 0.6:
                return True
        
        return False
    
    def _add_to_recent(self, question):
        """Add question to recent list (keep only last 5)"""
        self.recent_questions.append(question)
        if len(self.recent_questions) > 5:
            self.recent_questions.pop(0)
    
    def _get_fallback_question(self, level, role, topic):
        """Generate fallback questions when AI fails"""
        context = role if role else topic
        
        fallback_questions = {
            'Beginner': [
                f"What interests you most about {context}?",
                f"How would you start learning {context}?",
                f"What do you know about {context} basics?"
            ],
            'Intermediate': [
                f"What challenges have you faced while working with {context}?",
                f"How do you stay updated with {context} best practices?",
                f"Describe a project where you used {context}."
            ],
            'Advanced': [
                f"How would you optimize performance in {context}?",
                f"What are the current trends in {context}?",
                f"How do you handle complex problems in {context}?"
            ]
        }
        
        questions = fallback_questions.get(level, fallback_questions['Intermediate'])
        return random.choice(questions)
    
    def _is_valid_evaluation(self, evaluation):
        """Check if evaluation response is valid"""
        if not evaluation or not isinstance(evaluation, dict):
            return False
        
        required_keys = ['score', 'feedback', 'max_score']
        if not all(key in evaluation for key in required_keys):
            return False
        
        score = evaluation.get('score')
        if not isinstance(score, int) or not (0 <= score <= 10):
            return False
        
        feedback = evaluation.get('feedback', '')
        if not feedback or len(feedback.strip()) < 20:
            return False
        
        return True
    
    def _fallback_evaluation(self, question, answer, level):
        """Fallback evaluation when AI fails"""
        answer_len = len(answer.strip())
        words = len(answer.split())
        
        # Simple scoring based on content quality indicators
        score = 3  # Base score
        
        # Add points for length and detail
        if words >= 20:
            score += 2
        elif words >= 10:
            score += 1
        
        # Add points for specific technical terms or examples
        if any(word in answer.lower() for word in ['because', 'example', 'such as', 'like', 'for instance']):
            score += 1
            
        # Cap at reasonable score for fallback
        score = min(score, 7)
        
        feedback = f"Your answer shows {'good' if score >= 6 else 'basic'} understanding. "
        
        if score < 4:
            feedback += "Try to provide more detailed explanations with specific examples."
        elif score < 7:
            feedback += "Good response, but consider adding more depth or examples to strengthen your answer."
        else:
            feedback += "Solid answer with good detail and reasoning."
        
        return {
            'score': score,
            'feedback': feedback,
            'max_score': 10
        }
    
    def _clean_question_response(self, question):
        """Clean up question response"""
        if not question:
            return "What is your experience with this topic?"
        
        question = question.strip()
        
        # Remove common prefixes
        prefixes = [
            "Here's a question:", "Question:", "Interview question:",
            "Here is a question:", "Consider this:"
        ]
        
        for prefix in prefixes:
            if question.lower().startswith(prefix.lower()):
                question = question[len(prefix):].strip()
                break
        
        # Remove quotes if they wrap the entire question
        if (question.startswith('"') and question.endswith('"')) or \
           (question.startswith("'") and question.endswith("'")):
            question = question[1:-1].strip()
        
        # Ensure proper ending
        if not question.endswith(('?', '.', '!')):
            # Check if it's a question
            question_words = ['what', 'how', 'why', 'when', 'where', 'which', 'who', 
                             'can you', 'do you', 'would you', 'could you', 'have you']
            
            if any(word in question.lower() for word in question_words):
                question += '?'
            else:
                question += '.'
        
        return question