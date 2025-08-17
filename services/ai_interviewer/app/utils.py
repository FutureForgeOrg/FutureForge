import re

def format_question_prompt(level, role=None, topic=None):
    """Generate a clean interview question prompt"""
    
    context = role if role else topic
    context_type = "role" if role else "topic"
    
    base_prompt = f"""Generate ONE direct interview question.

Level: {level}
{context_type.title()}: {context}

Requirements:
- Direct question only
- No introduction or explanation
- 1-2 lines maximum
- Real interview style
- Focus on knowledge and understanding

Return only the question text."""

    return base_prompt

def format_evaluation_prompt(question, answer, level, role=None, topic=None):
    """Format prompt for strict answer evaluation"""
    
    context = role if role else topic
    context_type = "role" if role else "topic"
    
    prompt = f"""Evaluate this interview answer with strict scoring.

QUESTION: {question}
ANSWER: {answer}
LEVEL: {level}"""
    
    if context:
        prompt += f"\n{context_type.upper()}: {context}"
    
    prompt += """

SCORING RULES (0-10):
0: Empty, random text, special characters, bad words, or unrelated content
1: "I don't know", "too complex", or similar non-answers
2: Very little understanding, major errors
3: Basic understanding with significant gaps
4: Some correct points but incomplete
5: Average answer with correct basics
6: Good answer with proper understanding
7: Strong answer with good detail
8: Excellent comprehensive answer
9: Outstanding with insights
10: Perfect expert-level response

Provide 3-5 lines of specific feedback.

Score: [0-10]
Feedback: [your feedback]"""

    return prompt

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
    """Clean AI response text"""
    if not text:
        return ""
    
    text = text.strip()
    
    # Remove common prefixes
    prefixes = [
        "Here's a question:", "Question:", "Here is a question:",
        "Interview question:", "Technical question:", "Here's your question:",
        "Generated question:", "Sample question:", "Example question:"
    ]
    
    for prefix in prefixes:
        if text.lower().startswith(prefix.lower()):
            text = text[len(prefix):].strip()
            break
    
    # Remove leading symbols
    text = text.lstrip(':-').strip()
    
    # Remove wrapping quotes
    if (text.startswith('"') and text.endswith('"')) or (text.startswith("'") and text.endswith("'")):
        text = text[1:-1].strip()
    
    return text

def validate_request_data(data, required_fields):
    """Validate request data"""
    if not data:
        return False, "No data provided"
    
    missing_fields = [field for field in required_fields if field not in data or not data.get(field)]
    if missing_fields:
        return False, f"Missing required fields: {', '.join(missing_fields)}"
    
    if 'level' in data:
        valid_levels = get_level_options()
        if data['level'] not in valid_levels:
            return False, f"Invalid level. Must be one of: {', '.join(valid_levels)}"
    
    return True, "Valid"

def sanitize_input(text, max_length=1000):
    """Sanitize user input"""
    if not text:
        return ""
    
    text = str(text).strip()
    
    # Limit length
    if len(text) > max_length:
        text = text[:max_length]
    
    # Remove dangerous HTML
    dangerous_substrings = ['<script', '</script>', '<iframe', '</iframe>']
    for substr in dangerous_substrings:
        text = text.replace(substr, '')
    
    return text