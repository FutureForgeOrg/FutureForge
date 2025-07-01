import pymongo
from pymongo import MongoClient, ASCENDING, DESCENDING
from datetime import datetime, timezone, timedelta
import hashlib
import logging
from typing import Dict, Any, Optional, List
from .config import config

logger = logging.getLogger(__name__)

class JobDatabase:
    """Database manager for job scraper service."""

    def __init__(self):
        self.client = None
        self.db = None
        self.jobs_collection = None
        self.connect()
        self.setup_indexes()

    def connect(self):
        """Connect to database"""
        try:
            self.client = MongoClient(
                config.MONGODB_URI,
                serverSelectionTimeoutMS=5000  # 5 seconds timeout
            )

            # Test connection
            self.client.server_info()

            self.db = self.client[config.DATABASE_NAME]
            self.jobs_collection = self.db[config.JOBS_COLLECTION]

            logger.info(f"Connected to database: {config.DATABASE_NAME}")

        except Exception as e:
            logger.error(f"Failed to connect to MongoDB: {e}")
            raise

    def setup_indexes(self):
        """Create necessary indexes for efficient queries"""
        try:
            self.jobs_collection.create_index(
                "job_id",
                unique=True,
                name="job_id_unique"
            )

            self.jobs_collection.create_index(
                "location",
                name="location_index"
            )

            self.jobs_collection.create_index(
                [("scraped_date", DESCENDING)],
                name="scraped_date_desc"
            )

            self.jobs_collection.create_index(
                [("location", ASCENDING), ("scraped_date", DESCENDING)],
                name="location_date_index"
            )

            logger.info("Indexes created successfully")
        except Exception as e:
            logger.error(f"Failed to create indexes: {e}")
            
    def generate_job_id(self, company_name: str, job_title: str, location: str) -> str:
        """Generate unique job ID using hash"""
        content = f"{company_name.lower().strip()}_{job_title.lower().strip()}_{location.lower().strip()}"
        return hashlib.md5(content.encode()).hexdigest()[:16]
    
    def job_exists(self, job_id: str) -> bool:
        """Check if job already exists in database"""
        try:
            return self.jobs_collection.find_one({"job_id": job_id}) is not None
        except Exception as e:
            logger.error(f"Error checking job existence: {e}")
            return False
        
    def insert_job(self, job_data: Dict[str, Any]) -> bool:
        """Insert a single job into database"""
        try:
            # Create job_id if not present
            if "job_id" not in job_data:
                job_data["job_id"] = self.generate_job_id(
                    job_data['company_name'],
                    job_data['job_title'],  
                    job_data['location']
                )

            # Add scraped date if not present
            if "scraped_date" not in job_data:
                job_data["scraped_date"] = datetime.now(timezone.utc)

            # Validate required fields
            required_fields = ["job_id", "company_name", "job_title", "location", "job_link", "scraped_date"]
            for field in required_fields:
                if field not in job_data or not job_data[field]:
                    logger.error(f"Missing required field: {field} in job data")
                    return False
                
            # Check if job already exists
            if self.job_exists(job_data["job_id"]):
                self.jobs_collection.update_one(
                    {"job_id": job_data["job_id"]},
                    {"$set": {"scraped_date": job_data["scraped_date"]}}
                )
                logger.info(f"Job already exists, updated scraped date: {job_data['job_id']}")
                return True
            
            # Insert new job
            self.jobs_collection.insert_one(job_data)
            logger.info(f"Inserted new job: {job_data['job_id']}")
            return True
        except Exception as e:
            logger.error(f"Error inserting job: {e}")
            return False
        
    def insert_jobs_batch(self, jobs: List[Dict[str, Any]]) -> Dict[str, int]:
        """Insert multiple jobs in batch"""
        stats = {"inserted": 0, "updated": 0, "skipped": 0}
        
        for job in jobs:
            try:
                job_id = job.get('job_id')
                if not job_id:
                    job_id = self.generate_job_id(
                        job.get('company_name', ''),
                        job.get('job_title', ''),
                        job.get('location', '')
                    )
                    job['job_id'] = job_id
                
                if self.job_exists(job_id):
                    if self.insert_job(job):
                        stats["updated"] += 1
                    else:
                        stats["skipped"] += 1
                else:
                    if self.insert_job(job):
                        stats["inserted"] += 1
                    else:
                        stats["skipped"] += 1
            except Exception as e:
                logger.error(f"Error processing job in batch: {e}")
                stats["skipped"] += 1
        
        return stats    

    def get_jobs_by_location(self, location: str, limit: int = 100) -> List[Dict[str, Any]]:
        """Get jobs filtered by location"""
        try:
            jobs = list(self.jobs_collection.find(
                {"location": {"$regex": location, "$options": "i"}},
                {"_id": 0}  # Exclude MongoDB _id field
            ).sort("scraped_date", DESCENDING).limit(limit))
            
            return jobs
        except Exception as e:
            logger.error(f"Error getting jobs by location: {e}")
            return []
        
    
    def get_recent_jobs(self, days: int = 7, limit: int = 100) -> List[Dict[str, Any]]:
        """Get recent jobs within specified days"""
        try:
            cutoff_date = datetime.now(timezone.utc) - timedelta(days=days)
            
            jobs = list(self.jobs_collection.find(
                {"scraped_date": {"$gte": cutoff_date}},
                {"_id": 0}
            ).sort("scraped_date", DESCENDING).limit(limit))
            
            return jobs
        except Exception as e:
            logger.error(f"Error getting recent jobs: {e}")
            return []    
        
    def get_database_stats(self) -> Dict[str, Any]:
        """Get database statistics"""
        try:
            total_jobs = self.jobs_collection.count_documents({})
            
            # Get location distribution
            location_pipeline = [
                {"$group": {"_id": "$location", "count": {"$sum": 1}}},
                {"$sort": {"count": -1}},
                {"$limit": 10}
            ]
            location_stats = list(self.jobs_collection.aggregate(location_pipeline))
            
            # Get recent jobs count (last 7 days)
            recent_cutoff = datetime.now(timezone.utc) - timedelta(days=7)
            recent_jobs = self.jobs_collection.count_documents({
                "scraped_date": {"$gte": recent_cutoff}
            })
            
            return {
                "total_jobs": total_jobs,
                "recent_jobs_7d": recent_jobs,
                "top_locations": location_stats,
                "last_updated": datetime.now(timezone.utc).isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error getting database stats: {e}")
            return {}
        
    def close_connection(self):
        """Close database connection"""
        if self.client:
            self.client.close()
            logger.info("Database connection closed")

# Global database instance
db = JobDatabase()