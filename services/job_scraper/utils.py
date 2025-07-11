import logging
from datetime import datetime, timezone
from typing import Dict, List
from common.database import db

logger = logging.getLogger(__name__)

class ScrapingUtils:
    """Utility functions for scraping operations"""
    
    @staticmethod
    def print_session_summary(results: Dict):
        """Print detailed session summary"""
        print("\n" + "="*60)
        print("SCRAPING SESSION SUMMARY")
        print("="*60)
        print(f"Duration: {results['duration_seconds']:.1f} seconds")
        print(f"Location Mode: {results['location_mode']}")
        print(f"API Calls Used: {results['total_api_calls']}")
        print(f"Total Jobs Saved: {results['total_jobs_saved']}")
        print(f"Direct Links: {results['total_direct_links']}")
        print(f"Google Links: {results['total_google_links']}")
        print(f"No Links: {results['total_no_links']}")
        
        print("\nRole Results:")
        for result in results['results']:
            print(f"  {result['role']}: {result['jobs_saved']} jobs saved")
            print(f"    └─ Direct: {result['direct_links']}, Google: {result['google_links']}, None: {result['no_links']}")
        
        # Database stats
        stats = db.get_database_stats()
        print(f"\nDatabase Stats:")
        print(f"  Total Jobs: {stats.get('total_jobs', 0)}")
        print(f"  Recent Jobs (7d): {stats.get('recent_jobs_7d', 0)}")
        
        # Link type distribution
        if results['total_jobs_saved'] > 0:
            direct_pct = (results['total_direct_links'] / results['total_jobs_saved']) * 100
            google_pct = (results['total_google_links'] / results['total_jobs_saved']) * 100
            print(f"\nLink Distribution:")
            print(f"  Direct Links: {direct_pct:.1f}%")
            print(f"  Google Links: {google_pct:.1f}%")
    
    @staticmethod
    def validate_configuration():
        """Validate configuration before starting scraping"""
        from common.config import config
        
        logger.info("Validating configuration...")
        
        # Check API key
        if not config.SERPAPI_API_KEY:
            raise ValueError("SERPAPI_API_KEY is required")
        
        # Check database connection
        try:
            db.get_database_stats()
            logger.info("Database connection successful")
        except Exception as e:
            raise ValueError(f"Database connection failed: {e}")
        
        # Log configuration
        logger.info(f"Location Mode: {config.LOCATION_MODE}")
        logger.info(f"Search Locations: {config.get_search_locations()}")
        logger.info(f"Job Roles: {len(config.get_job_roles())} roles configured")
        
        return True
    
    @staticmethod
    def get_role_selection_menu(roles: List[str]) -> List[str]:
        """Interactive menu to select roles for scraping"""
        print("\nAvailable Job Roles:")
        for i, role in enumerate(roles, 1):
            print(f"{i:2d}. {role}")
        
        print("\nSelection Options:")
        print("  - Enter role numbers (e.g., 1,3,5)")
        print("  - Enter 'all' for all roles")
        print("  - Enter 'test' for first 3 roles")
        
        while True:
            try:
                selection = input("\nEnter your selection: ").strip().lower()
                
                if selection == 'all':
                    return roles
                elif selection == 'test':
                    return roles[:3]
                elif selection:
                    # Parse comma-separated numbers
                    indices = [int(x.strip()) - 1 for x in selection.split(',')]
                    selected_roles = [roles[i] for i in indices if 0 <= i < len(roles)]
                    
                    if selected_roles:
                        return selected_roles
                    else:
                        print("Invalid selection. Please try again.")
                else:
                    print("Please enter a valid selection.")
                    
            except (ValueError, IndexError):
                print("Invalid input. Please enter valid role numbers.")
    
    @staticmethod
    def format_duration(seconds: float) -> str:
        """Format duration in human readable format"""
        if seconds < 60:
            return f"{seconds:.1f} seconds"
        elif seconds < 3600:
            minutes = seconds / 60
            return f"{minutes:.1f} minutes"
        else:
            hours = seconds / 3600
            return f"{hours:.1f} hours"
    
    @staticmethod
    def log_scraping_start(roles: List[str], location_mode: str):
        """Log the start of scraping session"""
        logger.info("="*50)
        logger.info("STARTING SCRAPING SESSION")
        logger.info("="*50)
        logger.info(f"Location Mode: {location_mode}")
        logger.info(f"Roles to scrape: {len(roles)}")
        logger.info(f"Session started at: {datetime.now(timezone.utc).isoformat()}")
        
        for i, role in enumerate(roles, 1):
            logger.info(f"  {i}. {role}")
    
    @staticmethod
    def log_scraping_end(results: Dict):
        """Log the end of scraping session"""
        logger.info("="*50)
        logger.info("SCRAPING SESSION COMPLETED")
        logger.info("="*50)
        logger.info(f"Total duration: {ScrapingUtils.format_duration(results['duration_seconds'])}")
        logger.info(f"Jobs saved: {results['total_jobs_saved']}")
        logger.info(f"API calls used: {results['total_api_calls']}")
        logger.info(f"Session ended at: {datetime.now(timezone.utc).isoformat()}")
    
    @staticmethod
    def save_results_to_file(results: Dict, filename: str = None):
        """Save scraping results to JSON file"""
        import json
        
        if not filename:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"scraping_results_{timestamp}.json"
        
        try:
            with open(filename, 'w') as f:
                json.dump(results, f, indent=2, default=str)
            logger.info(f"Results saved to {filename}")
            return filename
        except Exception as e:
            logger.error(f"Failed to save results: {e}")
            return None