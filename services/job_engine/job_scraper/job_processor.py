import logging
from datetime import datetime, timezone
from typing import Dict, Optional
from urllib.parse import urlparse, parse_qs

from common.database import db

logger = logging.getLogger(__name__)

class JobProcessor:
    """Process and clean job data with link extraction"""
    
    def __init__(self):
        pass
    
    def extract_job_links(self, job_data: Dict) -> Dict[str, str]:
        """Extract both direct and Google links from job data"""
        links = {
            'direct_link': '',
            'google_link': '',
            'link_type': 'none'
        }
        
        try:
            # First priority: Extract direct job link
            direct_link = self.extract_direct_link(job_data)
            if direct_link:
                links['direct_link'] = direct_link
                links['link_type'] = 'direct'
                logger.debug(f"Found direct link: {direct_link[:50]}...")
            
            # Second priority: Extract Google Jobs link
            google_link = self.extract_google_link(job_data)
            if google_link:
                links['google_link'] = google_link
                if not links['direct_link']:
                    links['link_type'] = 'google'
                    logger.debug(f"Found Google link: {google_link[:50]}...")
            
            # Determine final link to use
            final_link = links['direct_link'] or links['google_link']
            links['final_link'] = final_link
            
            return links
            
        except Exception as e:
            logger.warning(f"Link extraction failed: {e}")
            return links
    
    def extract_direct_link(self, job_data: Dict) -> str:
        """Extract direct job link (LinkedIn, Indeed, company site)"""
        try:
            # Priority order for link extraction
            link_sources = [
                # 1. Apply options (usually direct links)
                ('apply_options', 'link'),
                # 2. Related links
                ('related_links', 'link'),
                # 3. Direct link field
                ('link', None)
            ]
            
            for source, field in link_sources:
                if source in job_data:
                    if field is None:
                        # Direct field access
                        link = job_data[source]
                        if self.is_valid_direct_link(link):
                            return link
                    else:
                        # Array of objects
                        items = job_data[source]
                        if isinstance(items, list):
                            for item in items:
                                if isinstance(item, dict) and field in item:
                                    link = item[field]
                                    if self.is_valid_direct_link(link):
                                        return link
            
            return ""
            
        except Exception as e:
            logger.warning(f"Direct link extraction failed: {e}")
            return ""
    
    def extract_google_link(self, job_data: Dict) -> str:
        """Extract Google Jobs link as fallback"""
        try:
            # Look for Google Jobs specific fields
            google_sources = [
                'link',  # Main link field
                'job_link',  # Alternative field name
                'url'  # Another possible field
            ]
            
            for source in google_sources:
                if source in job_data:
                    link = job_data[source]
                    if self.is_valid_google_link(link):
                        return link
            
            # If no direct Google link, try to construct one
            if 'job_id' in job_data:
                job_id = job_data['job_id']
                google_link = f"https://www.google.com/search?q={job_id}&ibp=htl;jobs"
                return google_link
            
            return ""
            
        except Exception as e:
            logger.warning(f"Google link extraction failed: {e}")
            return ""
    
    def is_valid_direct_link(self, link: str) -> bool:
        """Check if link is a valid direct job link"""
        if not link or not isinstance(link, str):
            return False
        
        # Must be http/https
        if not link.startswith(('http://', 'https://')):
            return False
        
        # Avoid Google/aggregator links first
        avoid_domains = [
            'google.com',
            'google.co.in',
            'googlejobs',
            'serpapi.com',
            'bing.com'
        ]
        
        link_lower = link.lower()
        for domain in avoid_domains:
            if domain in link_lower:
                return False
        
        # Preferred domains (direct links)
        preferred_domains = [
            'linkedin.com',
            'indeed.com',
            'naukri.com',
            'monster.com',
            'glassdoor.com',
            'careers.',  # Company career pages
            'jobs.',     # Company job pages
            'workday.com',
            'lever.co',
            'greenhouse.io',
            'smartrecruiters.com',
            'jobvite.com'
        ]
        
        # Check for preferred domains
        for domain in preferred_domains:
            if domain in link_lower:
                return True
        
        # For other domains, check if URL structure suggests it's a job posting
        try:
            parsed = urlparse(link)
            domain = parsed.netloc.lower()
            path = parsed.path.lower()
            
            # Skip if it's clearly a tracking/redirect URL
            if any(track in domain for track in ['track', 'redirect', 'click', 'ref']):
                return False
            
            # Check for job-related keywords in path
            job_keywords = ['job', 'career', 'position', 'vacancy', 'opening', 'role']
            if any(keyword in path for keyword in job_keywords):
                return True
            
            # Check query parameters for job-related content
            query_params = parse_qs(parsed.query)
            for param_name in query_params:
                if any(keyword in param_name.lower() for keyword in job_keywords):
                    return True
                    
        except Exception:
            pass
        
        return False
    
    def is_valid_google_link(self, link: str) -> bool:
        """Check if link is a valid Google Jobs link"""
        if not link or not isinstance(link, str):
            return False
        
        # Must be http/https
        if not link.startswith(('http://', 'https://')):
            return False
        
        # Should be a Google domain
        google_domains = [
            'google.com',
            'google.co.in',
            'google.co.uk',
            'google.ca',
            'google.com.au'
        ]
        
        link_lower = link.lower()
        for domain in google_domains:
            if domain in link_lower:
                return True
        
        return False
    
    def process_job(self, job_data: Dict) -> Optional[Dict]:
        """Process single job and return cleaned data with link fallback"""
        try:
            # Extract required fields
            company_name = job_data.get('company_name', '').strip()
            job_title = (job_data.get('job_title') or job_data.get('title', '')).strip()
            location = job_data.get('location', '').strip()
            
            # Validate basic fields
            if not company_name or not job_title or not location:
                logger.warning("Missing required fields in job result")
                return None
            
            # Extract links (direct + Google fallback)
            links = self.extract_job_links(job_data)
            
            # Must have at least one link (direct or Google)
            if not links['final_link']:
                logger.warning(f"No valid link found for {job_title} at {company_name}")
                return None
            
            # Create job document
            job_doc = {
                'company_name': company_name,
                'job_title': job_title,
                'location': location,
                'job_link': links['final_link'],  # The link we'll use
                'direct_link': links['direct_link'],  # Store direct link if available
                'google_link': links['google_link'],  # Store Google link if available
                'link_type': links['link_type'],  # Track which type we're using
                'scraped_date': datetime.now(timezone.utc)
            }
            
            # Add optional fields if available
            if 'description' in job_data:
                job_doc['description'] = job_data['description'][:500]  # Limit description length
            
            if 'salary' in job_data:
                job_doc['salary'] = job_data['salary']
            
            if 'job_type' in job_data:
                job_doc['job_type'] = job_data['job_type']
            
            if 'posted_at' in job_data:
                job_doc['posted_at'] = job_data['posted_at']
            
            # Generate job_id
            job_doc['job_id'] = db.generate_job_id(
                company_name, job_title, location
            )
            
            logger.info(f"Processed job: {job_title} at {company_name} (Link type: {links['link_type']})")
            return job_doc
            
        except Exception as e:
            logger.error(f"Job processing failed: {e}")
            return None