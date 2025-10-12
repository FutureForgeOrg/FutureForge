import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from common.database import db
from common.config import config
import logging

from common.logging_config import setup_logging

# Setup logging
logger = setup_logging()

def setup_database():
    """setup db with proper indexes and test connection"""
    try:
        print("Setting up Job Scraper Database...")
        print(f"Database: {config.DATABASE_NAME}")
        print(f"Collection: {config.JOBS_COLLECTION}")
        print(f"Location Mode: {config.LOCATION_MODE}")
        
        # Test connection
        stats = db.get_database_stats()
        print(f"\nDatabase Stats:")
        print(f"- Total Jobs: {stats.get('total_jobs', 0)}")
        print(f"- Recent Jobs (7d): {stats.get('recent_jobs_7d', 0)}")
        
        # Test insert (dummy data)
        test_job = {
            "company_name": "Test Company",
            "job_title": "Test Developer", 
            "location": "Test Location",
            "job_link": "https://example.com/test-job",
        }
        
        print(f"\nTesting job insertion...")
        if db.insert_job(test_job):
            print("Test job inserted successfully")
            
            # # Clean up test job
            db.jobs_collection.delete_one({"job_id": db.generate_job_id(
                test_job["company_name"],
                test_job["job_title"], 
                test_job["location"]
            )})
            print("Test job cleaned up")
        else:
            print("Test job insertion failed")
        
        print(f"\n Database setup completed successfully!")
        print(f"Ready to start scraping with LOCATION_MODE='{config.LOCATION_MODE}'")
        
    except Exception as e:
        print(f" Database setup failed: {e}")
        return False
    
    return True

if __name__ == "__main__":
    setup_database()