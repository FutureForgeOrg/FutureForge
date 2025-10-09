"""
This script allows manual execution of job scraping with interactive options.
Used for testing and manual runs before implementing automated scheduling.
"""

import os
import sys
import logging
import argparse
from datetime import datetime

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from job_scraper.scraper import JobScraper
from job_scraper.utils import ScrapingUtils
from common.config import config
from common.database import db

from common.logging_config import setup_logging

# Initialize logger
logger = None  # Will be set in main()

def parse_arguments():
    """Parse command line arguments"""
    parser = argparse.ArgumentParser(
        description="Manual Job Scraper Runner",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python run_scraper.py                    # Interactive mode
  python run_scraper.py --all              # Scrape all roles
  python run_scraper.py --test             # Test with first 3 roles
  python run_scraper.py --roles 1,3,5      # Scrape specific roles by number
  python run_scraper.py --max-jobs 50      # Limit jobs per role
  python run_scraper.py --quiet            # Minimal output
        """
    )
    
    parser.add_argument(
        '--all', 
        action='store_true',
        help='Scrape all configured job roles'
    )
    
    parser.add_argument(
        '--test',
        action='store_true', 
        help='Test mode - scrape first 3 roles only'
    )
    
    parser.add_argument(
        '--roles',
        type=str,
        help='Comma-separated list of role numbers to scrape (e.g., 1,3,5)'
    )
    
    parser.add_argument(
        '--max-jobs',
        type=int,
        default=20,
        help='Maximum jobs per role (default: 20)'
    )
    
    parser.add_argument(
        '--quiet',
        action='store_true',
        help='Minimal output - only show warnings and errors'
    )
    
    parser.add_argument(
        '--save-results',
        action='store_true',
        help='Save detailed results to JSON file'
    )
    
    parser.add_argument(
        '--list-roles',
        action='store_true',
        help='List all configured job roles and exit'
    )
    
    return parser.parse_args()

def list_roles():
    """List all configured job roles"""
    roles = config.get_job_roles()
    print("\nConfigured Job Roles:")
    print("=" * 40)
    for i, role in enumerate(roles, 1):
        print(f"{i:2d}. {role}")
    print(f"\nTotal: {len(roles)} roles")

def select_roles(args):
    """Select roles based on command line arguments or interactive input"""
    all_roles = config.get_job_roles()
    
    if args.all:
        return all_roles
    elif args.test:
        return all_roles[:3]
    elif args.roles:
        try:
            indices = [int(x.strip()) - 1 for x in args.roles.split(',')]
            selected_roles = [all_roles[i] for i in indices if 0 <= i < len(all_roles)]
            
            if not selected_roles:
                print("No valid roles selected. Using test mode.")
                return all_roles[:3]
            
            return selected_roles
        except (ValueError, IndexError):
            print("Invalid role selection. Using test mode.")
            return all_roles[:3]
    else:
        # Interactive mode
        return ScrapingUtils.get_role_selection_menu(all_roles)

def main():
    """Main function for manual scraper execution"""
    args = parse_arguments()

    # Setup logging based on arguments
    global logger
    logger = setup_logging(quiet=args.quiet)
    
    try:
        # List roles and exit if requested
        if args.list_roles:
            list_roles()
            return
        
        # Print header
        if not args.quiet:
            print("\n" + "="*60)
            print("JOB SCRAPER - MANUAL EXECUTION")
            print("="*60)
            print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        # Validate configuration
        ScrapingUtils.validate_configuration()
        
        if not args.quiet:
            print(f"Location Mode: {config.LOCATION_MODE}")
            print(f"Search Locations: {config.get_search_locations()}")
            print(f"Max Jobs Per Role: {args.max_jobs}")
        
        # Select roles to scrape
        selected_roles = select_roles(args)
        
        if not selected_roles:
            print("No roles selected. Exiting.")
            return
        
        if not args.quiet:
            print(f"Selected {len(selected_roles)} roles for scraping")
            for i, role in enumerate(selected_roles, 1):
                print(f"  {i}. {role}")
        
        # Confirm before starting (in interactive mode)
        if not any([args.all, args.test, args.roles, args.quiet]):
            confirm = input("\nProceed with scraping? (y/n): ").strip().lower()
            if confirm not in ['y', 'yes']:
                print("Scraping cancelled.")
                return
        
        # Initialize scraper
        scraper = JobScraper()
        
        # Log scraping start
        if not args.quiet:
            ScrapingUtils.log_scraping_start(selected_roles, config.LOCATION_MODE)
        
        # Start scraping
        print(f"\nStarting scraping session...")
        results = scraper.scrape_multiple_roles(selected_roles, args.max_jobs)
        
        # Log scraping end
        if not args.quiet:
            ScrapingUtils.log_scraping_end(results)
        
        # Print summary
        if not args.quiet:
            ScrapingUtils.print_session_summary(results)
        else:
            # Minimal output for quiet mode
            print(f"Scraping completed: {results['total_jobs_saved']} jobs saved")
        
        # Save results to file if requested
        if args.save_results:
            filename = ScrapingUtils.save_results_to_file(results)
            if filename:
                print(f"Results saved to: {filename}")
        
        # Final success message
        if not args.quiet:
            print("\n" + "="*60)
            print("SCRAPING SESSION COMPLETED SUCCESSFULLY")
            print("="*60)
            print(f"Check your MongoDB database for {results['total_jobs_saved']} new jobs!")
    
    except KeyboardInterrupt:
        print("\n\nScraping interrupted by user.")
        logger.info("Scraping session interrupted by user")
    
    except Exception as e:
        print(f"\nError during scraping: {e}")
        logger.error(f"Scraping failed: {e}", exc_info=True)
        sys.exit(1)
    
    finally:
        # Clean up database connection
        try:
            from common.database import db
            db.close_connection()
            logger.info("Database connection closed successfully")
        except Exception as e:
            logger.warning(f"Failed to close database connection: {e}")
            # Continue anyway - not critical for script completion

if __name__ == "__main__":
    main()