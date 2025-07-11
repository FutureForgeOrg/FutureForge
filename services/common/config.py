import os
from dotenv import load_dotenv
from typing import List,Dict,Any
import logging

load_dotenv()

class Config:
    """Configuration manger for job scraper service."""

    def __init__(self):
        self.load_config()
        self.validate_config()

    def load_config(self):
        """Load all configuration from environment variables"""

        # API config
        self.SERPAPI_API_KEY = os.getenv("SERPAPI_API_KEY")

        # database config
        self.MONGODB_URI = os.getenv("MONGODB_URI")
        self.DATABASE_NAME = os.getenv("DATABASE_NAME","jobscraper")
        self.JOBS_COLLECTION = os.getenv("JOBS_COLLECTION", "jobs")

        # Scraping Configuration
        self.SCRAPING_ENABLED = os.getenv('SCRAPING_ENABLED', 'false').lower() == 'true'
        self.LOCATION_MODE = os.getenv('LOCATION_MODE', 'India')
        self.DAILY_SCRAPING_TIME = os.getenv('DAILY_SCRAPING_TIME', '06:00')
        self.GITHUB_ACTIONS_MODE = os.getenv('GITHUB_ACTIONS_MODE', 'false').lower() == 'true'
        
        # API Limits
        self.MAX_RESULTS_PER_QUERY = int(os.getenv('MAX_RESULTS_PER_QUERY', 20))
        self.API_TIMEOUT = int(os.getenv('API_TIMEOUT', 30))
        self.REQUEST_DELAY = int(os.getenv('REQUEST_DELAY', 2))

        # Job Roles to Search
        self.JOB_ROLES = [
            "Software Engineer",
            "Full Stack Web Developer",
            "Backend Software Developer",
            "Frontend Web Developer",
            "Data Scientist",
            "Machine Learning Engineer",
            "Artificial Intelligence Engineer",
            "Cloud Solutions Architect",
            "DevOps Engineer",
            "Cybersecurity Analyst",
            "Mobile Application Developer",
            "UI UX Designer"
        ]

        # Location Configuration
        self.LOCATION_CONFIG = self._get_location_config()

    def _get_location_config(self) -> Dict[str, List[str]]:
        """Get location search terms based on LOCATION_MODE"""
        locations = {
            "Australia": ["Australia", "Remote"],
            "India": ["India", "Remote"], 
            "all": ["India", "Australia", "Remote"]
        }
        return locations.get(self.LOCATION_MODE, ["India", "Remote"])
    
    def validate_config(self):
        """Validate critical configuration"""
        errors = []
        
        if not self.SERPAPI_API_KEY:
            errors.append("SERPAPI_API_KEY is required")
        
        if not self.MONGODB_URI:
            errors.append("MONGODB_URI is required")
        
        if self.LOCATION_MODE not in ["Australia", "India", "all"]:
            errors.append(f"Invalid LOCATION_MODE: {self.LOCATION_MODE}. Must be 'Australia', 'India', or 'all'")
        
        if errors:
            raise ValueError(f"Configuration errors: {', '.join(errors)}")
    
    def get_search_locations(self) -> List[str]:
        """Get list of locations to search based on mode"""
        return self.LOCATION_CONFIG
    
    def is_scraping_enabled(self) -> bool:
        """Check if scraping is currently enabled"""
        return self.SCRAPING_ENABLED
    
    def get_job_roles(self) -> List[str]:
        """Get list of job roles to search"""
        return self.JOB_ROLES
    
    def __str__(self):
        """String representation of config (safe, no sensitive data)"""
        return f"""
Job Scraper Configuration:
- Database: {self.DATABASE_NAME}/{self.JOBS_COLLECTION}
- Location Mode: {self.LOCATION_MODE}
- Search Locations: {self.get_search_locations()}
- Scraping Enabled: {self.SCRAPING_ENABLED}
- GitHub Actions Mode: {self.GITHUB_ACTIONS_MODE}
- Max Results Per Query: {self.MAX_RESULTS_PER_QUERY}
- Job Roles: {len(self.JOB_ROLES)} roles configured
        """.strip()

# Global config instance
config = Config()