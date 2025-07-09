import React from 'react'
import Navbar from '../components/Navbar'

function JobSearch() {
  return (
    <>
    <Navbar/>
    </>
  )
}

export default JobSearch



// import React, { useState, useEffect } from 'react';
// import { Search, MapPin, Clock, DollarSign, Filter, X, Grid } from 'lucide-react';
// import Navbar from '../components/Navbar'
// import GridBackground from '../components/ui/GridBackground';
// const JobSearch = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [location, setLocation] = useState('');
//   const [jobType, setJobType] = useState('');
//   const [salaryRange, setSalaryRange] = useState('');
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [showFilters, setShowFilters] = useState(false);

//   // Mock job data
//   const jobs = [
//     {
//       id: 1,
//       title: 'Frontend Developer',
//       company: 'TechCorp',
//       location: 'San Francisco, CA',
//       type: 'Full-time',
//       salary: '$80,000 - $120,000',
//       description: 'Build amazing user interfaces with React and TypeScript. Join our growing team of passionate developers.',
//       posted: '2 days ago',
//       tags: ['React', 'TypeScript', 'CSS', 'JavaScript']
//     },
//     {
//       id: 2,
//       title: 'Backend Engineer',
//       company: 'DataSolutions',
//       location: 'New York, NY',
//       type: 'Full-time',
//       salary: '$90,000 - $130,000',
//       description: 'Design and implement scalable backend systems using Node.js and Python.',
//       posted: '1 day ago',
//       tags: ['Node.js', 'Python', 'MongoDB', 'AWS']
//     },
//     {
//       id: 3,
//       title: 'UX Designer',
//       company: 'Creative Studio',
//       location: 'Remote',
//       type: 'Contract',
//       salary: '$60,000 - $80,000',
//       description: 'Create intuitive and beautiful user experiences for web and mobile applications.',
//       posted: '3 days ago',
//       tags: ['Figma', 'Sketch', 'Prototyping', 'User Research']
//     },
//     {
//       id: 4,
//       title: 'Data Scientist',
//       company: 'Analytics Co',
//       location: 'Austin, TX',
//       type: 'Full-time',
//       salary: '$100,000 - $140,000',
//       description: 'Analyze complex datasets and build machine learning models to drive business insights.',
//       posted: '5 days ago',
//       tags: ['Python', 'Machine Learning', 'SQL', 'Tableau']
//     },
//     {
//       id: 5,
//       title: 'Product Manager',
//       company: 'InnovateLabs',
//       location: 'Seattle, WA',
//       type: 'Full-time',
//       salary: '$110,000 - $150,000',
//       description: 'Lead product strategy and work with cross-functional teams to deliver exceptional products.',
//       posted: '1 week ago',
//       tags: ['Strategy', 'Agile', 'Analytics', 'Leadership']
//     },
//     {
//       id: 6,
//       title: 'DevOps Engineer',
//       company: 'CloudTech',
//       location: 'Remote',
//       type: 'Part-time',
//       salary: '$70,000 - $100,000',
//       description: 'Maintain and optimize cloud infrastructure and deployment pipelines.',
//       posted: '4 days ago',
//       tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD']
//     }
//   ];

//   // Filter jobs based on search criteria
//   useEffect(() => {
//     let filtered = jobs;

//     if (searchTerm) {
//       filtered = filtered.filter(job =>
//         job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
//       );
//     }

//     if (location) {
//       filtered = filtered.filter(job =>
//         job.location.toLowerCase().includes(location.toLowerCase())
//       );
//     }

//     if (jobType) {
//       filtered = filtered.filter(job => job.type === jobType);
//     }

//     if (salaryRange) {
//       filtered = filtered.filter(job => {
//         const jobSalary = parseInt(job.salary.match(/\$(\d+),/)?.[1] || '0');
//         switch (salaryRange) {
//           case 'under-60k':
//             return jobSalary < 60;
//           case '60k-80k':
//             return jobSalary >= 60 && jobSalary < 80;
//           case '80k-100k':
//             return jobSalary >= 80 && jobSalary < 100;
//           case 'over-100k':
//             return jobSalary >= 100;
//           default:
//             return true;
//         }
//       });
//     }

//     setFilteredJobs(filtered);
//   }, [searchTerm, location, jobType, salaryRange]);

//   const clearFilters = () => {
//     setSearchTerm('');
//     setLocation('');
//     setJobType('');
//     setSalaryRange('');
//   };

//   const hasActiveFilters = searchTerm || location || jobType || salaryRange;

//   return (
//     <>
//     <Navbar/>
//     <GridBackground>
//       <div className="mt-16 p-6">
//        {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-white mb-2">Find Your Dream Job</h1>
//         <p className="text-gray-300">Discover opportunities that match your skills and interests</p>
//       </div>

//       {/* Search Bar */}
//       <div className="rounded-3xl shadow-2xl p-4 md:p-8 mb-8 border border-white/10 bg-gradient-to-br from-[#1f1f2f]/60 to-[#1a1a2a]/60 backdrop-blur-md transform transition-all duration-1000 hover:from-transparent hover:to-transparent overflow-hidden">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Job title, company, or keywords..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/10 backdrop-blur-sm text-white placeholder-gray-300"
//             />
//           </div>
//           <div className="flex-1 relative">
//             <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Location..."
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/10 backdrop-blur-sm text-white placeholder-gray-300"
//             />
//           </div>
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600/80 text-white rounded-lg hover:bg-blue-700/90 transition-colors backdrop-blur-sm"
//           >
//             <Filter className="h-5 w-5" />
//             Filters
//           </button>
//         </div>

//         {/* Advanced Filters */}
//         {showFilters && (
//           <div className="mt-4 pt-4 border-t border-white/20">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">Job Type</label>
//                 <select
//                   value={jobType}
//                   onChange={(e) => setJobType(e.target.value)}
//                   className="w-full px-3 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/10 backdrop-blur-sm text-white"
//                 >
//                   <option value="">All Types</option>
//                   <option value="Full-time">Full-time</option>
//                   <option value="Part-time">Part-time</option>
//                   <option value="Contract">Contract</option>
//                   <option value="Internship">Internship</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">Salary Range</label>
//                 <select
//                   value={salaryRange}
//                   onChange={(e) => setSalaryRange(e.target.value)}
//                   className="w-full px-3 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/10 backdrop-blur-sm text-white"
//                 >
//                   <option value="">All Ranges</option>
//                   <option value="under-60k">Under $60,000</option>
//                   <option value="60k-80k">$60,000 - $80,000</option>
//                   <option value="80k-100k">$80,000 - $100,000</option>
//                   <option value="over-100k">Over $100,000</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Active Filters */}
//         {hasActiveFilters && (
//           <div className="mt-4 flex items-center gap-2">
//             <span className="text-sm text-gray-300">Active filters:</span>
//             {searchTerm && (
//               <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
//                 Search: {searchTerm}
//                 <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchTerm('')} />
//               </span>
//             )}
//             {location && (
//               <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
//                 Location: {location}
//                 <X className="h-3 w-3 cursor-pointer" onClick={() => setLocation('')} />
//               </span>
//             )}
//             {jobType && (
//               <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
//                 Type: {jobType}
//                 <X className="h-3 w-3 cursor-pointer" onClick={() => setJobType('')} />
//               </span>
//             )}
//             {salaryRange && (
//               <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
//                 Salary: {salaryRange}
//                 <X className="h-3 w-3 cursor-pointer" onClick={() => setSalaryRange('')} />
//               </span>
//             )}
//             <button
//               onClick={clearFilters}
//               className="text-sm text-red-600 hover:text-red-800"
//             >
//               Clear all
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Results Count */}
//       <div className="mb-4">
//         <p className="text-gray-300">
//           {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
//         </p>
//       </div>

//       {/* Job Listings */}
//       <div className="space-y-4">
//         {filteredJobs.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-300 text-lg">No jobs found matching your criteria.</p>
//             <p className="text-gray-400 mt-2">Try adjusting your search terms or filters.</p>
//           </div>
//         ) : (
//           filteredJobs.map((job) => (
//             <div key={job.id} className="rounded-3xl shadow-2xl p-4 md:p-8 mb-8 border border-white/10 bg-gradient-to-br from-[#1f1f2f]/60 to-[#1a1a2a]/60 backdrop-blur-md transform transition-all duration-1000 hover:from-transparent hover:to-transparent overflow-hidden">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h3 className="text-xl font-semibold text-white mb-1">{job.title}</h3>
//                   <p className="text-lg text-blue-400 font-medium">{job.company}</p>
//                 </div>
//                 <div className="text-right">
//                   <div className="flex items-center text-gray-400 mb-1">
//                     <Clock className="h-4 w-4 mr-1" />
//                     <span className="text-sm">{job.posted}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-300">
//                 <div className="flex items-center">
//                   <MapPin className="h-4 w-4 mr-1" />
//                   {job.location}
//                 </div>
//                 <div className="flex items-center">
//                   <Clock className="h-4 w-4 mr-1" />
//                   {job.type}
//                 </div>
//                 <div className="flex items-center">
//                   <DollarSign className="h-4 w-4 mr-1" />
//                   {job.salary}
//                 </div>
//               </div>

//               <p className="text-gray-200 mb-4">{job.description}</p>

//               <div className="flex flex-wrap gap-2 mb-4">
//                 {job.tags.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="px-3 py-1 bg-white/10 text-gray-200 text-sm rounded-full border border-white/20"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>

//               <div className="flex gap-3">
//                 <button className="px-4 py-2 bg-blue-600/80 text-white rounded-lg hover:bg-blue-700/90 transition-colors backdrop-blur-sm">
//                   Apply Now
//                 </button>
//                 <button className="px-4 py-2 border border-white/20 text-gray-200 rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm">
//                   Save Job
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
   
//     </div>
//     </GridBackground>
//     </>
//   );
// };

// export default JobSearch;