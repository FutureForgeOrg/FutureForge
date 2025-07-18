import os
from groq import Groq
from common.config import Config

class GroqService:
    
    def __init__(self):
        self.client = Groq(api_key=Config.GROQ_API_KEY)
    
    def generate_question(self, role, level, topic=""):
        """generate interview question using Groq LLM"""
        
        # Build prompt based on parameters
        prompt = self._build_question_prompt(role, level, topic)
        
        try:
            response = self.client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": "You are a technical interviewer. Generate ONLY the interview question - no explanations, no prefixes, no context. Just return the question directly."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                model="llama3-8b-8192",
                temperature=0.7,
                max_tokens=100,  
                stop=["\n\n", "Answer:", "Solution:"]  # Stop tokens to prevent long responses
            )
            
            question = response.choices[0].message.content.strip()
            
            # Additional cleanup to ensure conciseness
            question = self._clean_and_shorten_question(question)
            
            return question
        
        except Exception as e:
            raise Exception(f"Error generating question: {str(e)}")
    
    def _build_question_prompt(self, role, level, topic):
        """build prompt for question generation"""
        
        # Clear and direct prompt
        base_prompt = f"""Create one short technical interview question for a {role} at {level} level.

ONLY return the question - no explanations, no prefixes, no examples.

Requirements:
- 1-2 sentences maximum
- Direct question format
- {level} difficulty level
- Related to {role} role"""
        
        if topic:
            base_prompt += f"\n- Focus on {topic}"
        
        base_prompt += f"""

Good examples:
- "What is cross-validation and why is it important?"
- "How do you handle overfitting in machine learning?"
- "Explain the difference between classification and regression."

Now generate ONE similar question (question only, no other text):"""
        
        return base_prompt
    
    def _clean_and_shorten_question(self, question):
        """clean generated question"""
        
        # Remove common prefixes that make questions unnecessarily long
        prefixes_to_remove = [
            "Here is a",
            "Here's a", 
            "Question:",
            "Interview Question:",
            "Technical Question:",
            "For this interview question",
            "Consider this scenario:",
            "Suppose you're tasked with",
            "Imagine you are working",
            "short technical interview question for a",
            "technical interview question for a",
            "Create one short technical interview question",
            "Generate a technical interview question",
            "One short technical interview question"
        ]
        
        question = question.strip()
        
        # remove prefixes
        for prefix in prefixes_to_remove:
            if question.lower().startswith(prefix.lower()):
                question = question[len(prefix):].strip()
                if question.startswith(':'):
                    question = question[1:].strip()
        
        # remove trailing colons and clean up
        question = question.rstrip(':').strip()
        
        # ff the question contains descriptive text, try to extract just the question part
        if ':' in question:
            parts = question.split(':')
            # take the last part which is likely the actual question
            question = parts[-1].strip()
        
        # split into sentences and take only the first 1-2 sentences
        sentences = question.split('.')
        if len(sentences) > 2:
            question = '. '.join(sentences[:2]) + '.'
        
        # remove quotes if they wrap the entire question
        if question.startswith('"') and question.endswith('"'):
            question = question[1:-1]
        
        # ensure question ends with a question mark if it's a question
        if any(word in question.lower() for word in ['what', 'how', 'why', 'when', 'where', 'which', 'can you', 'do you', 'would you', 'could you']):
            if not question.endswith('?'):
                question = question.rstrip('.') + '?'
        
        return question

    def generate_multiple_questions(self, role, level, topic="", count=3):
        """generate multiple short questions at once"""
        questions = []
        
        for i in range(count):
            try:
                question = self.generate_question(role, level, topic)
                # Avoid duplicate questions
                if question not in questions:
                    questions.append(question)
            except Exception as e:
                print(f"Error generating question {i+1}: {str(e)}")
                continue
        
        return questions