import requests
import time
import logging
from datetime import datetime, timezone
from typing import List, Dict, Optional
from urllib.parse import urlparse, parse_qs

from common.config import config
from common.database import db

logger = logging.getLogger(__name__)

class JobScraper:
    """Enhanced job scraper with direct link priority and Google fallback"""
    
    def __init__(self):
        self.api_key = config.SERPAPI_API_KEY
        self.base_url = "https://serpapi.com/search"
        self.request_delay = config.REQUEST_DELAY
        self.max_results = config.MAX_RESULTS_PER_QUERY
        
        # Validate API key
        if not self.api_key:
            raise ValueError("API key not configured. Check environment variables.")
        
        logger.info("Job scraper initialized with Google fallback enabled")
    
    def build_search_query(self, role: str, locations: List[str]) -> str:
        """Build single optimized search query"""
        # Create location string
        location_str = " OR ".join(locations)
        
        # Single focused query
        query = f"{role} jobs in ({location_str})"
        
        logger.info(f"Built search query: {query[:50]}...")
        return query
    
    from typing import List, Dict, Optional
    def search_jobs(self, query: str, location: str) -> Optional[List[Dict]]:
        """Search jobs using SerpAPI with retry logic"""
        max_retries = 3
        
        for attempt in range(max_retries):
            try:
                params = {
                    'engine': 'google_jobs',
                    'q': query,
                    'location': location,
                    'api_key': self.api_key,
                    'num': self.max_results,
                    'sort_by': 'date'
                }
                
                response = requests.get(self.base_url, params=params, timeout=30)
                
                if response.status_code == 429:  # Rate limit exceeded
                    wait_time = 2 ** attempt
                    logger.warning(f"Rate limit hit, waiting {wait_time} seconds...")
                    time.sleep(wait_time)
                    continue
                    
                response.raise_for_status()
                
                data = response.json()
                jobs = data.get('jobs_results', [])
                
                logger.info(f"Found {len(jobs)} jobs")
                return jobs
                
            except requests.RequestException as e:
                logger.error(f"API request attempt {attempt + 1} failed: {type(e).__name__}")
                if attempt == max_retries - 1:
                    logger.error("All API request attempts failed")
                    return None
                time.sleep(2 ** attempt)
                
        return None
    
    def scrape_role(self, role: str, max_jobs: int = 20) -> Dict:
        """Scrape jobs for a specific role"""
        logger.info(f"Starting job search for: {role}")
        
        # Get search locations
        locations = config.get_search_locations()
        
        # Build single search query
        query = self.build_search_query(role, locations)
        
        # Use first location as primary location for API
        primary_location = locations[0]
        
        # Search jobs
        raw_jobs = self.search_jobs(query, primary_location)
        
        if raw_jobs is None:
            logger.error(f"API failed for {role} - skipping this role")
            return {
                'role': role,
                'jobs_found': 0,
                'jobs_processed': 0,
                'jobs_saved': 0,
                'direct_links': 0,
                'google_links': 0,
                'no_links': 0,
                'error': 'API_FAILURE'  
            }
        
        if len(raw_jobs) == 0:
            logger.warning(f"No jobs found for {role} (API worked, just empty results)")
            return {
                'role': role,
                'jobs_found': 0,
                'jobs_processed': 0,
                'jobs_saved': 0,
                'direct_links': 0,
                'google_links': 0,
                'no_links': 0
            }
        
        # Process jobs
        from job_scraper.job_processor import JobProcessor
        processor = JobProcessor()
        
        processed_jobs = []
        link_stats = {'direct': 0, 'google': 0, 'none': 0}
        
        for job_data in raw_jobs[:max_jobs]:
            processed_job = processor.process_job(job_data)
            if processed_job:
                processed_jobs.append(processed_job)
                # Track link types
                link_type = processed_job.get('link_type', 'none')
                if link_type in link_stats:
                    link_stats[link_type] += 1
            else:
                link_stats['none'] += 1
            
            # Small delay to be respectful
            time.sleep(0.1)
        
        logger.info(f"Successfully parsed {len(processed_jobs)} jobs for role: {role}")
        logger.info(f"Link stats - Direct: {link_stats['direct']}, Google: {link_stats['google']}, None: {link_stats['none']}")
        
        # Save to database
        saved_count = 0
        for job in processed_jobs:
            if db.insert_job(job):
                saved_count += 1
        
        # Add delay between role searches
        time.sleep(self.request_delay)
        
        result = {
            'role': role,
            'jobs_found': len(raw_jobs),
            'jobs_processed': len(processed_jobs),
            'jobs_saved': saved_count,
            'direct_links': link_stats['direct'],
            'google_links': link_stats['google'],
            'no_links': link_stats['none']
        }
        
        logger.info(f"Role {role}: {saved_count} jobs saved")
        return result
    
    def scrape_multiple_roles(self, roles: List[str], max_jobs_per_role: int = 20) -> Dict:
        """Scrape multiple roles efficiently"""
        logger.info(f"Starting scraping session for {len(roles)} roles")
        logger.info(f"Location mode: {config.LOCATION_MODE}")
        
        session_start = datetime.now(timezone.utc)
        results = []
        total_api_calls = 0
        total_jobs_saved = 0
        total_direct_links = 0
        total_google_links = 0
        total_no_links = 0
        
        for i, role in enumerate(roles, 1):
            logger.info(f"Processing role {i}/{len(roles)}: {role}")
            
            try:
                result = self.scrape_role(role, max_jobs_per_role)
                results.append(result)
                
                total_api_calls += 1  # One API call per role
                total_jobs_saved += result['jobs_saved']
                total_direct_links += result['direct_links']
                total_google_links += result['google_links']
                total_no_links += result['no_links']
                
                logger.info(f"Role {role}: {result['jobs_saved']} jobs saved "
                           f"(Direct: {result['direct_links']}, Google: {result['google_links']})")
                
            except Exception as e:
                logger.error(f"Failed to scrape role {role}: {e}")
                results.append({
                    'role': role,
                    'jobs_found': 0,
                    'jobs_processed': 0,
                    'jobs_saved': 0,
                    'direct_links': 0,
                    'google_links': 0,
                    'no_links': 0,
                    'error': str(e)
                })
        
        session_end = datetime.now(timezone.utc)
        duration = (session_end - session_start).total_seconds()
        
        # Summary
        summary = {
            'session_start': session_start.isoformat(),
            'session_end': session_end.isoformat(),
            'duration_seconds': duration,
            'location_mode': config.LOCATION_MODE,
            'roles_processed': len(roles),
            'total_api_calls': total_api_calls,
            'total_jobs_saved': total_jobs_saved,
            'total_direct_links': total_direct_links,
            'total_google_links': total_google_links,
            'total_no_links': total_no_links,
            'results': results
        }
        
        logger.info(f"Scraping completed. Total jobs saved: {total_jobs_saved}")
        logger.info(f"Link breakdown - Direct: {total_direct_links}, Google: {total_google_links}, None: {total_no_links}")
        logger.info(f"API calls used: {total_api_calls}")
        
        return summary