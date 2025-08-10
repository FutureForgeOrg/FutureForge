import re

def format_question_prompt(level, role=None, topic=None):
    """Generate a unique, practical interview question prompt"""
    
    context = role if role else topic
    context_type = "role" if role else "topic"
    
    base_prompt = f"""You are an expert technical interviewer. Generate ONE unique, practical interview question.

Level: {level}
{context_type.title()}: {context}

STRICT REQUIREMENTS:
- Generate a DIFFERENT question each time, even for same inputs
- Focus on practical understanding and real-world scenarios
- Ask about problem-solving, best practices, or concepts
- NO code writing questions - focus on reasoning and knowledge
- Keep it 1-3 lines maximum
- Make it interview-realistic and engaging

VARIETY TECHNIQUES:
- Ask about different aspects: challenges, benefits, comparisons, experiences
- Use different question starters: "How would you...", "What's your approach to...", "When would you..."
- Focus on different scenarios: troubleshooting, optimization, decision-making

Return ONLY the question, nothing else."""

    return base_prompt

def format_evaluation_prompt(question, answer, level, role=None, topic=None):
    """Format prompt for AI answer evaluation with quality-based scoring"""
    
    context = role if role else topic
    context_type = "role" if role else "topic"
    
    prompt = f"""You are a fair technical interviewer evaluating this candidate's answer. Focus on QUALITY, not length.

QUESTION: {question}
ANSWER: {answer}
LEVEL: {level}"""
    
    if context:
        prompt += f"\n{context_type.upper()}: {context}"
    
    prompt += """

SCORING CRITERIA (0-10):
0: No answer provided
1: "I don't know" or similar non-answers
2-3: Shows little understanding, major errors
4-5: Basic understanding, some correct points but gaps
6-7: Good understanding, mostly correct with minor issues
8-9: Strong understanding, well-explained, accurate
10: Exceptional answer, comprehensive and insightful

IMPORTANT:
- Short but accurate answers can score HIGH
- Long but wrong answers should score LOW
- Focus on accuracy, clarity, and practical understanding
- Be encouraging but honest
- Consider the difficulty level

Provide specific, actionable feedback in 3-5 sentences.

FORMAT:
Score: [0-10]
Feedback: [Specific, constructive feedback about what was good, what was missing, and how to improve]"""

    return prompt

def detect_dont_know_answer(answer):
    """Detect if answer is a variation of 'I don't know'"""
    if not answer:
        return False
    
    answer_lower = answer.lower().strip()
    
    # Common "don't know" phrases
    dont_know_phrases = [
        "i don't know", "i dont know", "dont know", "don't know",
        "no idea", "not sure", "i'm not sure", "im not sure",
        "no clue", "i have no idea", "i have no clue",
        "not certain", "uncertain", "i don't have a clue",
        "i dont have a clue", "i don't understand", "i dont understand"
    ]
    
    # Check exact matches
    if answer_lower in dont_know_phrases:
        return True
    
    # Check if answer is mostly "don't know" with minimal additions
    for phrase in dont_know_phrases:
        if phrase in answer_lower and len(answer_lower) <= len(phrase) + 10:
            return True
    
    return False

def get_level_options():
    """Return available skill levels"""
    return ["Beginner", "Intermediate", "Advanced"]

def get_role_options():
    """Return available job roles"""
    return [
        "Backend Developer", "Frontend Developer", "Full Stack Developer",
        "Data Scientist", "Machine Learning Engineer", "DevOps Engineer",
        "Mobile Developer", "iOS Developer", "Android Developer",
        "QA Engineer", "System Administrator", "Cloud Engineer",
        "Security Engineer", "Database Administrator", "Product Manager"
    ]

def get_topic_options():
    """Return available interview topics"""
    return [
        "Data Structures", "Algorithms", "Object-Oriented Programming",
        "System Design", "Database Design", "API Development",
        "JavaScript", "Python", "Java", "React", "Node.js",
        "Machine Learning", "Data Analysis", "SQL", "NoSQL",
        "Cloud Computing", "Docker", "Kubernetes", "Security",
        "Testing", "Performance Optimization", "Operating Systems",
        "Computer Networks", "HTML", "CSS"
    ]

def clean_response_text(text):
    """Clean and format AI response text"""
    if not text:
        return ""
    
    text = text.strip()
    
    # Remove common AI response prefixes
    prefixes = [
        "Here's a question:", "Question:", "Here is a question:",
        "Interview question:", "Technical question:", "Here's your question:",
        "Generated question:", "Sample question:", "Example question:"
    ]
    
    for prefix in prefixes:
        if text.lower().startswith(prefix.lower()):
            text = text[len(prefix):].strip()
            break
    
    # Remove leading colons or dashes
    text = text.lstrip(':-').strip()
    
    # Remove wrapping quotes if present
    if (text.startswith('"') and text.endswith('"')) or (text.startswith("'") and text.endswith("'")):
        text = text[1:-1].strip()
    
    return text

def validate_request_data(data, required_fields):
    """Validate request data contains required fields"""
    if not data:
        return False, "No data provided"
    
    missing_fields = [field for field in required_fields if field not in data or not data.get(field)]
    if missing_fields:
        return False, f"Missing required fields: {', '.join(missing_fields)}"
    
    # Validate level field
    if 'level' in data:
        valid_levels = get_level_options()
        if data['level'] not in valid_levels:
            return False, f"Invalid level. Must be one of: {', '.join(valid_levels)}"
    
    return True, "Valid"

def sanitize_input(text, max_length=1000):
    """Sanitize user input for safety and length"""
    if not text:
        return ""
    
    text = str(text).strip()
    
    # Limit length
    if len(text) > max_length:
        text = text[:max_length]
    
    # Remove potentially harmful HTML tags or scripts
    dangerous_substrings = ['<script', '</script>', '<iframe', '</iframe>']
    for substr in dangerous_substrings:
        text = text.replace(substr, '')
    
    return text