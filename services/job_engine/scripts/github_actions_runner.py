#!/usr/bin/env python3
"""
GitHub Actions optimized runner for job scraping
This script is specifically designed for automated execution in GitHub Actions
"""

import os
import sys
import logging
from datetime import datetime

# Add services directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(os.path.join(os.path.dirname(__file__), '../services'))

from common.logging_config import setup_logging

def validate_github_environment():
    """Validate GitHub Actions environment"""
    logger = logging.getLogger(__name__)
    
    # Check if running in GitHub Actions
    if not os.getenv('GITHUB_ACTIONS'):
        logger.warning("Not running in GitHub Actions environment")
    
    # Check required environment variables
    required_vars = [
        'SERPAPI_API_KEY',
        'MONGODB_URI',
        'DATABASE_NAME',
        'JOBS_COLLECTION'
    ]
    
    missing_vars = []
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)
    
    if missing_vars:
        logger.error(f"Missing required environment variables: {missing_vars}")
        sys.exit(1)
    
    logger.info("GitHub Actions environment validated successfully")

def run_scraping_session():
    """Run the scraping session optimized for GitHub Actions"""
    logger = logging.getLogger(__name__)
    
    try:
        # Import after path setup
        from job_scraper.scraper import JobScraper
        from job_scraper.utils import ScrapingUtils
        from common.config import config
        from common.database import db
        
        # Validate configuration
        ScrapingUtils.validate_configuration()
        
        # Get configuration
        max_jobs = int(os.getenv('MAX_JOBS_PER_ROLE', '15'))
        test_mode = os.getenv('TEST_MODE', 'false').lower() == 'true'
        
        # Select roles
        all_roles = config.get_job_roles()
        selected_roles = all_roles[:3] if test_mode else all_roles
        
        logger.info(f"Starting GitHub Actions scraping session")
        logger.info(f"Location Mode: {config.LOCATION_MODE}")
        logger.info(f"Max jobs per role: {max_jobs}")
        logger.info(f"Test mode: {test_mode}")
        logger.info(f"Roles to scrape: {len(selected_roles)}")
        
        # Initialize scraper
        scraper = JobScraper()
        
        # Run scraping
        results = scraper.scrape_multiple_roles(selected_roles, max_jobs)
        
        # Print results for GitHub Actions logs
        print(f"\n::notice::Scraping completed successfully!")
        print(f"::notice::Jobs saved: {results['total_jobs_saved']}")
        print(f"::notice::API calls used: {results['total_api_calls']}")
        print(f"::notice::Duration: {results['duration_seconds']:.1f} seconds")
        
        # Print link distribution
        direct_links = results['total_direct_links']
        google_links = results['total_google_links']
        total_links = direct_links + google_links
        
        if total_links > 0:
            direct_pct = (direct_links / total_links) * 100
            google_pct = (google_links / total_links) * 100
            print(f"::notice::Link distribution - Direct: {direct_pct:.1f}%, Google: {google_pct:.1f}%")
        
        # Save results if requested
        if os.getenv('SAVE_RESULTS', 'false').lower() == 'true':
            filename = ScrapingUtils.save_results_to_file(results)
            if filename:
                print(f"::notice::Results saved to: {filename}")
        
        # Database stats
        stats = db.get_database_stats()
        print(f"::notice::Database total jobs: {stats.get('total_jobs', 0)}")
        print(f"::notice::Recent jobs (7d): {stats.get('recent_jobs_7d', 0)}")
        
        return True
        
    except Exception as e:
        logger.error(f"Scraping session failed: {e}", exc_info=True)
        print(f"::error::Scraping failed: {e}")
        return False
    
    finally:
        # Clean up
        try:
            from common.database import db
            db.close_connection()
            logger.info("Database connection closed")
        except Exception as e:
            logger.warning(f"Failed to close database: {e}")
            # Not critical - GitHub Actions will terminate anyway

def main():
    """Main function for GitHub Actions execution"""
    logger = setup_logging(github_mode=True)

    try:
        logger.info("Starting GitHub Actions job scraping")
        
        # Validate environment
        validate_github_environment()
        
        # Run scraping
        success = run_scraping_session()
        
        if success:
            logger.info("GitHub Actions scraping completed successfully")
            sys.exit(0)
        else:
            logger.error("GitHub Actions scraping failed")
            sys.exit(1)
            
    except KeyboardInterrupt:
        logger.info("Scraping interrupted")
        sys.exit(1)
    except Exception as e:
        logger.error(f"Unexpected error: {e}", exc_info=True)
        sys.exit(1)

if __name__ == "__main__":
    main()