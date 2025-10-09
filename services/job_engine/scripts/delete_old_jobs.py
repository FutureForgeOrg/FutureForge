"""
Auto-delete old jobs script for GitHub Actions
Deletes jobs older than specified days based on scraped_date
Default: 60 days
"""

import os
import sys
import logging
from datetime import datetime, timezone, timedelta

# Add services directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from common.logging_config import setup_logging

def delete_old_jobs(days_old: int = 60, dry_run: bool = False):
    """Delete jobs older than specified days"""
    logger = logging.getLogger(__name__)
    
    try:
        # Import after path setup
        from common.database import db
        
        # Get database stats before deletion
        stats_before = db.get_database_stats()
        total_jobs_before = stats_before.get('total_jobs', 0)
        
        # Calculate cutoff date (X days ago from today)
        cutoff_date = datetime.now(timezone.utc) - timedelta(days=days_old)
        
        logger.info(f"Checking for jobs older than {days_old} days")
        
        # Find old jobs count
        old_jobs_query = {"scraped_date": {"$lt": cutoff_date}}
        old_jobs_count = db.jobs_collection.count_documents(old_jobs_query)
        
        if old_jobs_count == 0:
            print(f"::notice::No jobs older than {days_old} days found")
            return {
                "deleted_count": 0,
                "total_before": total_jobs_before,
                "total_after": total_jobs_before,
                "days_threshold": days_old,
                "dry_run": dry_run
            }
        
        if dry_run:
            print(f"::notice::DRY RUN - Found {old_jobs_count} jobs older than {days_old} days")
            print(f"::notice::Total jobs: {total_jobs_before} | Would delete: {old_jobs_count} | Would remain: {total_jobs_before - old_jobs_count}")
            
            return {
                "deleted_count": 0,
                "would_delete_count": old_jobs_count,
                "total_before": total_jobs_before,
                "total_after": total_jobs_before,
                "days_threshold": days_old,
                "dry_run": True
            }
        
        # Actually delete old jobs
        logger.info(f"Deleting {old_jobs_count} old jobs...")
        delete_result = db.jobs_collection.delete_many(old_jobs_query)
        deleted_count = delete_result.deleted_count
        
        # Get stats after deletion
        stats_after = db.get_database_stats()
        total_jobs_after = stats_after.get('total_jobs', 0)
        
        print(f"::notice::Deletion completed successfully")
        print(f"::notice::Total jobs before: {total_jobs_before} | Deleted: {deleted_count} | Remaining: {total_jobs_after}")
        
        return {
            "deleted_count": deleted_count,
            "total_before": total_jobs_before,
            "total_after": total_jobs_after,
            "days_threshold": days_old,
            "dry_run": False
        }
        
    except Exception as e:
        logger.error(f"Failed to delete old jobs: {e}")
        print(f"::error::Failed to delete old jobs: {e}")
        raise

def main():
    """Main function for GitHub Actions execution"""
    logger = setup_logging(github_mode=True)
    
    try:
        logger.info("Starting auto-deletion of old jobs")
        
        # Get configuration from environment - DEFAULT: 60 days
        days_old = int(os.getenv('DELETE_JOBS_OLDER_THAN_DAYS', '60'))
        dry_run = os.getenv('DRY_RUN', 'false').lower() == 'true'
        
        # Validate environment variables
        required_vars = ['MONGODB_URI', 'DATABASE_NAME', 'JOBS_COLLECTION']
        missing_vars = [var for var in required_vars if not os.getenv(var)]
        
        if missing_vars:
            logger.error(f"Missing required environment variables: {missing_vars}")
            sys.exit(1)
        
        # Run deletion
        results = delete_old_jobs(days_old, dry_run)
        
        logger.info("Auto-deletion completed successfully")
        return True
        
    except Exception as e:
        logger.error(f"Auto-deletion failed: {e}")
        print(f"::error::Auto-deletion failed: {e}")
        return False
    
    finally:
        # Clean up database connection
        try:
            from common.database import db
            db.close_connection()
            logger.info("Database connection closed")
        except Exception as e:
            logger.warning(f"Failed to close database: {e}")
            # Continue - not critical for script exit

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)