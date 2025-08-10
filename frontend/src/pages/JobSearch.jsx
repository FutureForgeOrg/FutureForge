// import useJobsQuery from '../hooks/useJobsQuery';
// import useJobFilters from '../store/useJobFilters.js';
// import Navbar from '../components/Navbar';
// import JobCard from '../components/JobSearch/JobCard';
// import RoleSelector from '../components/JobSearch/RoleSelector';
// import Pagination from '../components/JobSearch/Pagination';
// import GridBackground from '../components/ui/GridBackground';
// import useDebounce from '../hooks/useDebounce.js';
// import { useState,useEffect } from 'react';

// function JobSearch() {
//   const { job_title, location, keyword, page, setFilter, setPage } = useJobFilters();
//   const { data, isLoading, isError } = useJobsQuery();

//   const [localLocation, setLocalLocation] = useState(location);
//   const [localKeyword, setLocalKeyword] = useState(keyword);

//   // Debounced values
//   const debouncedLocation = useDebounce(localLocation, 600);
//   const debouncedKeyword = useDebounce(localKeyword, 600);

//   // Apply debounced filter to global store when debounce value changes
//   useEffect(() => {
//     setFilter('location', debouncedLocation);
//     setPage(1);
//   }, [debouncedLocation]);

//   useEffect(() => {
//     setFilter('keyword', debouncedKeyword);
//     setPage(1);
//   }, [debouncedKeyword]);

//   const jobs = data?.jobs || [];
//   const total = data?.total || 0;
//   const totalPages = Math.ceil(total / 10);

//   return (
//     <>
//       <Navbar />
//       <GridBackground>
//         <div className="p-6 max-w-4xl mx-auto my-14">
//           <h1 className="text-3xl font-bold text-center mb-2">
//             Smart Job Matching with FutureForge
//           </h1>
//           <p className="text-sm text-center text-white mb-6">
//             Discover curated job opportunities tailored to your role — updated automatically, just for you
//           </p>

//           {/* Filters */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
//             {/* Role Selector */}
//             <div className="w-full">
//               <RoleSelector
//                 selectedRole={job_title}
//                 onChange={(val) => {
//                   setFilter('job_title', val);
//                   setPage(1);
//                 }}
//               />
//             </div>

//             {/* Location Filter */}
//             <input
//               type="text"
//               placeholder="Location"
//               value={localLocation}
//               onChange={(e) => setLocalLocation(e.target.value)}
//               className="p-2 rounded w-full text-white border bg-black"
//             />

//             {/* Keyword Filter */}
//             <input
//               type="text"
//               placeholder="Keyword (e.g. remote, React)"
//               value={localKeyword}
//               onChange={(e) => setLocalKeyword(e.target.value)}
//               className="p-2 rounded w-full text-white border bg-black"
//             />
//           </div>


//           {/* Jobs */}
//           <div className="mt-6 space-y-4">
//             {isLoading ? (
//               <p className="text-center">Loading...</p>
//             ) : isError ? (
//               <p className="text-center text-red-400">Error loading jobs.</p>
//             ) : jobs.length === 0 ? (
//               <p className="text-center">No jobs found.</p>
//             ) : (
//               jobs.map((job) => <JobCard key={job._id} job={job} />)
//             )}
//           </div>

//           {/* Pagination */}
//           <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
//         </div>
//       </GridBackground>
//     </>
//   );
// }

// export default JobSearch;


import useJobsQuery from '../hooks/useJobsQuery';
import useJobFilters from '../store/useJobFilters.js';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobSearch/JobCard';
import RoleSelector from '../components/JobSearch/RoleSelector';
import Pagination from '../components/JobSearch/Pagination';
import useDebounce from '../hooks/useDebounce.js';
import { useState, useEffect } from 'react';
import BackgroundWrapper from '../components/ui/BackgroundWrapper.jsx';
import KeyWordSelector from '../components/JobSearch/KeyWordSelctor.jsx';

function JobSearch() {
  const { job_title, location, keyword, page, setFilter, setPage } = useJobFilters();
  const { data, isLoading, isError } = useJobsQuery();

  const [localLocation, setLocalLocation] = useState(location);
  const [localKeyword, setLocalKeyword] = useState(keyword);
  const [localRole, setLocalRole] = useState(job_title)

  const debouncedLocation = useDebounce(localLocation, 600);
  const debouncedKeyword = useDebounce(localKeyword, 600);
  const debouncedRole = useDebounce(localRole, 600)

  useEffect(() => {
    setFilter('location', debouncedLocation);
    setPage(1);
  }, [debouncedLocation]);

  useEffect(() => {
    setFilter('keyword', debouncedKeyword);
    setPage(1);
  }, [debouncedKeyword]);

  useEffect(() => {
    setFilter('job_title', debouncedRole)
    setPage(1);
  }, [debouncedRole])

  const jobs = data?.jobs || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 10);

  return (
    <BackgroundWrapper>

      <Navbar />

      <div className="p-6 py-14 max-w-4xl mx-auto">
        <div className='mt-6'>
          <h1 className="text-3xl font-bold text-center mb-2 text-white">
            Smart Job Matching with FutureForge
          </h1>
          <p className="text-sm text-center text-white mb-6">
            Discover curated job opportunities tailored to your role — updated automatically, just for you
          </p>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            <div className="w-full">
              <RoleSelector
                selectedRole={localRole}
                onChange={(val) => {
                  setLocalRole(val);
                }}
              />
            </div>

            <input
              type="text"
              placeholder="Location"
              value={localLocation}
              onChange={(e) => setLocalLocation(e.target.value)}
              className="p-2 rounded w-full text-white border bg-black"
            />

            <div className="w-full">
              <KeyWordSelector
                selectedRole={localKeyword}
                onChange={(val) => {
                  setLocalKeyword(val);
                }}
              />
            </div>
          </div>

          {/* Jobs */}
          <div className="mt-6 space-y-4">
            {isLoading ? (
              <p className="text-center">Loading...</p>
            ) : isError ? (
              <p className="text-center text-red-400">Error loading jobs.</p>
            ) : jobs.length === 0 ? (
              <p className="text-center">No jobs found.</p>
            ) : (
              jobs.map((job) => <JobCard key={job._id} job={job} />)
            )}
          </div>

          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>

    </BackgroundWrapper>
  );
}

export default JobSearch;
