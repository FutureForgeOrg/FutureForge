from services.groq_service import GroqService
from app.utils import format_question_prompt, format_evaluation_prompt
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
                    # Use groq_service cleaning function instead of duplicate
                    cleaned_question = self.groq_service._clean_question(question)
                    
                    # Check if question is too similar to recent ones
                    if not self._is_too_similar(cleaned_question):
                        self._add_to_recent(cleaned_question)
                        return cleaned_question
                
                # If similar or poor quality, try again
                time.sleep(0.5)  # Small delay between attempts
                
            except Exception as e:
                logging.error(f"Attempt {attempt + 1} failed: {str(e)}")
                if attempt == max_attempts - 1:
                    # Use groq_service fallback instead of duplicate
                    return self.groq_service._generate_fallback_question(level, role, topic)
        
        return self.groq_service._generate_fallback_question(level, role, topic)
    
    def evaluate_answer(self, question, answer, level, role=None, topic=None):
        """Evaluate user's answer using improved GroqService logic"""
        try:
            # Use the enhanced evaluation from GroqService
            evaluation = self.groq_service.evaluate_answer_improved(
                question, answer, level, role, topic
            )
            
            # Validate evaluation response
            if self._is_valid_evaluation(evaluation):
                return evaluation
            else:
                # Use groq_service fallback instead of duplicate
                return self.groq_service._fallback_evaluation_realistic(answer)
                
        except Exception as e:
            logging.error(f"Error in evaluate_answer: {str(e)}")
            return self.groq_service._fallback_evaluation_realistic(answer)
    
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
        if not feedback or len(feedback.strip()) < 15:
            return False
        
        return True