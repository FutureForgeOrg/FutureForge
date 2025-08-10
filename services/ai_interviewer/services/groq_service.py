import requests
import json
import logging
import time
import random
from common.config import Config
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from langchain.schema import HumanMessage

class GroqService:
    def __init__(self):
        self.api_key = Config.GROQ_API_KEY
        self.base_url = "https://api.groq.com/openai/v1/chat/completions"
        self.model = "llama3-8b-8192"
        
        if not self.api_key:
            raise ValueError("GROQ_API_KEY not found in configuration")
        
        # Initialize LangChain ChatGroq
        self.llm = ChatGroq(
            groq_api_key=self.api_key,
            model_name=self.model,
            temperature=0.8,  # Higher temperature for more variety
            max_tokens=300
        )
        
        # Enhanced prompt templates for better variety
        self.question_template = PromptTemplate(
            input_variables=["level", "context", "context_type", "variety_seed"],
            template="""You are an expert technical interviewer. Create ONE unique interview question.

CONTEXT:
Level: {level}
{context_type}: {context}
Variety Seed: {variety_seed}

CRITICAL REQUIREMENTS:
- Generate a COMPLETELY DIFFERENT question each time
- Use the variety seed to ensure uniqueness
- Focus on practical scenarios and real-world problems
- Ask about understanding, not code writing
- Keep it concise (1-3 lines max)
- Make it engaging and interview-realistic

QUESTION TYPES TO ROTATE:
- Problem-solving scenarios
- Best practices and decisions  
- Experience and challenges
- Comparisons and trade-offs
- Optimization and performance
- Troubleshooting situations

Return ONLY the question text, no explanations or prefixes."""
        )
        
        self.evaluation_template = PromptTemplate(
            input_variables=["question", "answer", "level", "context", "context_type"],
            template="""Evaluate this interview answer focusing on QUALITY over length.

QUESTION: {question}
ANSWER: {answer}
LEVEL: {level}
{context_type}: {context}

EVALUATION CRITERIA:
- Accuracy of information
- Clarity of explanation  
- Practical understanding
- Relevance to question
- Completeness (relative to level)

SCORING SCALE (0-10):
0: No answer
1: "Don't know" responses
2-3: Major errors or misunderstanding
4-5: Basic correct understanding
6-7: Good solid answer
8-9: Excellent comprehensive answer
10: Outstanding with insights

Be fair and encouraging. Short but accurate answers can score well.

RESPOND WITH:
Score: [0-10]
Feedback: [3-5 sentences with specific, constructive comments about accuracy, what was good, what could improve]"""
        )
    
    def generate_question_with_variety(self, level, role=None, topic=None, attempt=0):
        """Generate varied questions using different approaches"""
        try:
            context = role if role else topic
            context_type = "Role" if role else "Topic"
            
            # Create variety seed based on time and attempt
            variety_seed = f"{int(time.time()) % 1000}_{attempt}_{random.randint(1, 100)}"
            
            # Use LangChain for generation
            prompt = self.question_template.format(
                level=level,
                context=context,
                context_type=context_type,
                variety_seed=variety_seed
            )
            
            response = self.llm.invoke([HumanMessage(content=prompt)])
            question = response.content.strip()
            
            return self._clean_response(question)
            
        except Exception as e:
            logging.error(f"Question generation failed: {str(e)}")
            # Fallback to direct API
            return self._generate_direct_fallback(level, role, topic, attempt)
    
    def evaluate_answer_improved(self, question, answer, level, role=None, topic=None):
        """Improved answer evaluation with quality focus"""
        try:
            context = role if role else topic
            context_type = "Role" if role else "Topic"
            
            # Use LangChain for evaluation
            prompt = self.evaluation_template.format(
                question=question,
                answer=answer,
                level=level,
                context=context,
                context_type=context_type
            )
            
            response = self.llm.invoke([HumanMessage(content=prompt)])
            evaluation_text = response.content.strip()
            
            return self._parse_evaluation_improved(evaluation_text)
            
        except Exception as e:
            logging.error(f"Evaluation failed: {str(e)}")
            return self._fallback_evaluation(answer)
    
    def _generate_direct_fallback(self, level, role, topic, attempt):
        """Direct API fallback for question generation"""
        try:
            context = role if role else topic
            
            # Create varied prompts based on attempt
            prompt_variations = [
                f"Create a unique {level} interview question about {context} focusing on problem-solving. Return only the question text.",
                f"Generate a {level} level question about {context} related to best practices. Return only the question text.",
                f"Ask a {level} interview question about {context} focusing on real-world scenarios. Return only the question text."
            ]
            
            prompt = prompt_variations[attempt % len(prompt_variations)]
            
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            payload = {
                "model": self.model,
                "messages": [{"role": "user", "content": prompt}],
                "max_tokens": 200,
                "temperature": 0.9
            }
            
            response = requests.post(
                self.base_url,
                headers=headers,
                json=payload,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                content = result['choices'][0]['message']['content']
                return self._clean_response(content.strip())
            else:
                raise Exception(f"API error: {response.status_code}")
                
        except Exception as e:
            logging.error(f"Direct fallback failed: {str(e)}")
            raise
    
    def _parse_evaluation_improved(self, evaluation_text):
        """Parse evaluation with better error handling"""
        try:
            lines = evaluation_text.strip().split('\n')
            score = 5  # Default middle score
            feedback = ""
            
            # Extract score
            for line in lines:
                line = line.strip()
                if line.lower().startswith('score:'):
                    try:
                        score_part = line.split(':', 1)[1].strip()
                        # Extract first number found
                        import re
                        numbers = re.findall(r'\b([0-9]|10)\b', score_part)
                        if numbers:
                            potential_score = int(numbers[0])
                            if 0 <= potential_score <= 10:
                                score = potential_score
                    except:
                        pass
                    break
            
            # Extract feedback
            feedback_started = False
            feedback_lines = []
            
            for line in lines:
                line = line.strip()
                if line.lower().startswith('feedback:'):
                    feedback_started = True
                    # Get feedback from same line if present
                    feedback_part = line.split(':', 1)[1].strip()
                    if feedback_part:
                        feedback_lines.append(feedback_part)
                elif feedback_started and line:
                    feedback_lines.append(line)
            
            feedback = ' '.join(feedback_lines).strip()
            
            # Ensure we have meaningful feedback
            if not feedback or len(feedback) < 20:
                feedback = self._generate_default_feedback(score)
            
            return {
                'score': score,
                'feedback': feedback,
                'max_score': 10
            }
            
        except Exception as e:
            logging.error(f"Evaluation parsing failed: {str(e)}")
            return self._fallback_evaluation("")
    
    def _generate_default_feedback(self, score):
        """Generate default feedback based on score"""
        if score >= 8:
            return "Excellent answer showing strong understanding with clear explanations and good practical knowledge."
        elif score >= 6:
            return "Good answer demonstrating solid understanding. Could be enhanced with more specific details or examples."
        elif score >= 4:
            return "Basic answer showing some understanding. Try to provide more depth and explain your reasoning."
        elif score >= 2:
            return "Limited answer showing minimal understanding. Focus on explaining core concepts more clearly."
        else:
            return "Insufficient answer provided. Try to demonstrate your knowledge even if you're unsure about some aspects."
    
    def _fallback_evaluation(self, answer):
        """Fallback evaluation when parsing fails"""
        if not answer or len(answer.strip()) < 5:
            return {
                'score': 0,
                'feedback': "No meaningful answer provided. Please try to answer the question with your understanding.",
                'max_score': 10
            }
        
        # Simple evaluation based on answer characteristics
        words = len(answer.split())
        
        if words < 5:
            score = 2
            feedback = "Very brief answer. Try to provide more explanation and detail."
        elif words < 15:
            score = 4
            feedback = "Short answer showing some effort. Could benefit from more detailed explanation."
        elif words < 30:
            score = 6
            feedback = "Adequate answer with reasonable detail. Could be strengthened with specific examples."
        else:
            score = 7
            feedback = "Comprehensive answer showing good effort and detail."
        
        return {
            'score': score,
            'feedback': feedback,
            'max_score': 10
        }
    
    def _clean_response(self, text):
        """Enhanced cleaning of AI response text"""
        if not text:
            return ""
        
        text = text.strip()
        
        # Remove common prefixes and problematic phrases - ENHANCED LIST
        prefixes_to_remove = [
            "Here's a question:", "Here is a question:", "Question:", "Interview question:",
            "Technical question:", "Consider this:", "Imagine you", "Here's a",
            "unique interview question generated using the variety seed:",
            "interview question generated using the variety seed:",
            "generated using the variety seed:",
            "using the variety seed:",
            "variety seed:",
            "Generated question:",
            "Sample question:",
            "Example question:",
            "New question:",
            "Unique question:",
            "Question for you:",
            "Here's your question:",
            "Your question is:",
            "The question is:",
            "A good question would be:",
            "One possible question:",
            "Consider:",
            "How about:",
            "What about:",
            "Try this:",
            "Here we go:",
            "Let me ask:",
            "I'll ask:"
        ]
        
        # Clean the text multiple times to catch nested prefixes
        cleaned = False
        max_iterations = 3
        iteration = 0
        
        while not cleaned and iteration < max_iterations:
            original_text = text
            
            # Check and remove prefixes (case insensitive)
            for prefix in prefixes_to_remove:
                if text.lower().startswith(prefix.lower()):
                    text = text[len(prefix):].strip()
                    # Remove leading colons, quotes, or dashes that might remain
                    text = text.lstrip(':-"\'').strip()
                    break
            
            # Check if we made any changes
            if text == original_text:
                cleaned = True
            iteration += 1
        
        # Remove wrapping quotes if they wrap the entire question
        if len(text) > 2:
            if (text.startswith('"') and text.endswith('"')) or \
               (text.startswith("'") and text.endswith("'")):
                text = text[1:-1].strip()
        
        # Remove any remaining unwanted patterns
        unwanted_patterns = [
            r'^[:\-\s]*',  # Leading colons, dashes, or spaces
            r'^\d+\.\s*',   # Leading numbers like "1. "
            r'^\*\s*',      # Leading asterisks
            r'^Question\s*\d*\s*[:\-]\s*',  # "Question:" or "Question 1:"
        ]
        
        import re
        for pattern in unwanted_patterns:
            text = re.sub(pattern, '', text, flags=re.IGNORECASE).strip()
        
        # Ensure proper sentence ending
        if text and not text.endswith(('?', '.', '!')):
            # Check if it's a question by looking for question indicators
            question_indicators = [
                'what', 'how', 'why', 'when', 'where', 'which', 'who',
                'can you', 'do you', 'would you', 'could you', 'have you',
                'are you', 'will you', 'should you', 'might you',
                'explain', 'describe', 'tell me', 'discuss'
            ]
            
            text_lower = text.lower()
            is_question = any(indicator in text_lower for indicator in question_indicators)
            
            if is_question:
                text += '?'
            else:
                text += '.'
        
        # Final cleanup - remove any remaining double spaces or weird characters
        text = re.sub(r'\s+', ' ', text).strip()
        
        return text
    
    def test_connection(self):
        """Test connection to Groq API"""
        try:
            test_response = self.llm.invoke([HumanMessage(content="Say 'Connection successful'")])
            return True, f"LangChain connection successful: {test_response.content}"
        except Exception as e:
            try:
                # Fallback to direct API test
                headers = {
                    "Authorization": f"Bearer {self.api_key}",
                    "Content-Type": "application/json"
                }
                
                payload = {
                    "model": self.model,
                    "messages": [{"role": "user", "content": "Say 'Direct API successful'"}],
                    "max_tokens": 50
                }
                
                response = requests.post(
                    self.base_url,
                    headers=headers,
                    json=payload,
                    timeout=10
                )
                
                if response.status_code == 200:
                    result = response.json()
                    content = result['choices'][0]['message']['content']
                    return True, f"Direct API successful: {content}"
                else:
                    return False, f"API error: {response.status_code}"
                    
            except Exception as e2:
                return False, f"Both LangChain and direct API failed: {str(e)}, {str(e2)}"
    
    def get_model_info(self):
        """Get model information"""
        return {
            "current_model": self.model,
            "base_url": self.base_url,
            "has_api_key": bool(self.api_key),
            "langchain_enabled": True
        }
    
    # Legacy methods for backward compatibility
    def generate_content(self, prompt, max_tokens=500):
        """Main method - enhanced with LangChain but keeping original interface"""
        try:
            # Try LangChain first for better results
            response = self.llm.invoke([HumanMessage(content=prompt)])
            return self._clean_response(response.content.strip())
        except Exception as e:
            logging.warning(f"LangChain failed, using direct API: {str(e)}")
            return self.generate_content_direct(prompt, max_tokens)
    
    def generate_content_direct(self, prompt, max_tokens=500):
        """Direct API call as fallback"""
        try:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            payload = {
                "model": self.model,
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                "max_tokens": max_tokens,
                "temperature": 0.7,
                "top_p": 0.9,
                "stream": False
            }
            
            response = requests.post(
                self.base_url,
                headers=headers,
                json=payload,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                content = result['choices'][0]['message']['content']
                return self._clean_response(content.strip())
            else:
                logging.error(f"Groq API error: {response.status_code} - {response.text}")
                raise Exception(f"API request failed with status {response.status_code}")
                
        except requests.exceptions.Timeout:
            logging.error("Groq API request timed out")
            raise Exception("Request timed out")
        except requests.exceptions.RequestException as e:
            logging.error(f"Groq API request error: {str(e)}")
            raise Exception("Failed to connect to AI service")
        except Exception as e:
            logging.error(f"Groq service error: {str(e)}")
            raise Exception("AI service temporarily unavailable")