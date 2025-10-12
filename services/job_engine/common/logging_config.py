"""
Centralized logging configuration for all scripts
"""
import logging
import sys

def setup_logging(level=logging.INFO, quiet=False, github_mode=False):
    """
    Setup consistent logging across all scripts
    
    Args:
        level: Logging level (INFO, DEBUG, WARNING, ERROR)
        quiet: If True, only show warnings and errors
        github_mode: If True, use simplified format for GitHub Actions
    
    Returns:
        logger: Configured logger instance
    """
    
    # Set level based on quiet flag
    if quiet:
        level = logging.WARNING
    
    # Choose format based on mode
    if github_mode:
        format_string = '%(levelname)s - %(message)s'
    else:
        format_string = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    
    # Configure logging
    logging.basicConfig(
        level=level,
        format=format_string,
        handlers=[logging.StreamHandler(sys.stdout)]
    )
    
    # Suppress noisy external libraries
    logging.getLogger('urllib3').setLevel(logging.WARNING)
    logging.getLogger('requests').setLevel(logging.WARNING)
    logging.getLogger('pymongo').setLevel(logging.WARNING)
    
    return logging.getLogger(__name__)