def validate_input(data):
    """validate input data for question generation"""
    
    valid_roles = [
        'Backend Developer', 'Frontend Developer', 'Full Stack Developer',
        'Data Scientist', 'DevOps Engineer', 'Mobile Developer',
        'System Administrator', 'Product Manager'
    ]
    
    valid_levels = ['Beginner', 'Intermediate', 'Advanced']
    
    role = data.get('role', '').strip()
    level = data.get('level', '').strip()
    
    if not role:
        return {"valid": False, "message": "Role is required"}
    
    if not level:
        return {"valid": False, "message": "Level is required"}
    
    if role not in valid_roles:
        return {"valid": False, "message": f"Invalid role. Must be one of: {', '.join(valid_roles)}"}
    
    if level not in valid_levels:
        return {"valid": False, "message": f"Invalid level. Must be one of: {', '.join(valid_levels)}"}
    
    return {"valid": True, "message": "Valid input"}

def format_response(success, data=None, error=None):
    """format API response"""
    response = {"success": success}
    
    if success and data:
        response.update(data)
    elif not success and error:
        response["error"] = error
    
    return response