import useJobsQuery from '../hooks/useJobsQuery';
import useJobFilters from '../store/useJobFilters.js';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobSearch/JobCard';
import RoleSelector from '../components/JobSearch/RoleSelector';
import Pagination from '../components/JobSearch/Pagination';
import GridBackground from '../components/ui/GridBackground';

function JobSearch() {
  const { job_title, location, page, setFilter, setPage } = useJobFilters();
  const { data, isLoading, isError } = useJobsQuery();

  const jobs = data?.jobs || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 10);

  return (
    <>
      <Navbar />
      <GridBackground>
        <div className="p-6 max-w-4xl mx-auto my-14">
          <h1 className="text-3xl font-bold text-center mb-2">
            Smart Job Matching with FutureForge
          </h1>
          <p className="text-sm text-center text-white mb-6">
            Discover curated job opportunities tailored to your role — updated automatically, just for you
          </p>

          {/* Filters */}
          <div className="flex gap-2 justify-center">
            <RoleSelector selectedRole={job_title} onChange={(val) => setFilter('job_title', val)} />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setFilter('location', e.target.value)}
              className="px-3 py-2 text-black rounded"
            />
          </div>

          <div className="mt-6 space-y-4">
            {isLoading ? (
              <p className="text-center">Loading...</p>
            ) : isError ? (
              <p className="text-center">Error loading jobs.</p>
            ) : jobs.length === 0 ? (
              <p className="text-center">No jobs found.</p>
            ) : (
              jobs.map((job) => <JobCard key={job._id} job={job} />)
            )}
          </div>

          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </GridBackground>
    </>
  );
}

export default JobSearch;
