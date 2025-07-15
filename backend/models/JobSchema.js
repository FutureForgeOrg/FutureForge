import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  company_name: String,
  job_title: String,
  location: String,
  job_link: String,
  direct_link: String,
  google_link: String,
  link_type: String,
  scraped_date: Date,
  description: String,
  job_id: String,
});

// force it to use collection "jobs" from DB "jobscraper"
export default mongoose.connection.useDb('jobscraper').model('Job', JobSchema, 'jobs');
