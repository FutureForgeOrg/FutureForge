import React from 'react'
import Navbar from '../components/Navbar'
import JobCard from '../components/JobSearch/JobCard'
import RoleSelector from '../components/JobSearch/RoleSelector' 
import Pagination from '../components/JobSearch/Pagination'
import { useState } from 'react'
import GridBackground from '../components/ui/GridBackground'
const jobs = [
  {
    id: 1,
    company: "Google",
    title: "Frontend Developer",
    location: "Remote",
    description: "Work with React, TypeScript, and GraphQL.",
  },
  {
    id: 2,
    company: "Amazon",
    title: "Backend Developer",
    location: "Bangalore",
    description: "",
  },
  {
    id: 3,
    company: "StartupX",
    title: "Full Stack Engineer",
    location: "Pune",
    description: "You’ll work across the entire stack.",
  },
   {
    id: 4,
    company: "OpenExcel",
    title: "React Developer",
    location: "Remote",
    description: "Work with React, TypeScript, and GraphQL.",
  },
  {
    id: 5,
    company: "TechCorp",
    title: "Node Js Developer",
    location: "Bangalore",
    description: "",
  },
  {
    id: 6,
    company: "Innovatech",
    title: "Full Stack Engineer",
    location: "Pune",
    description: "You’ll work across the entire stack.",
  },
];


function JobSearch() {
 const [selectedRole, setSelectedRole] = useState("");
 const [currentPage, setCurrentPage] = useState(0);
 const jobsPerPage = 3;

 const filteredJobs = jobs.filter((job)=> 
    job.title.toLowerCase().includes(selectedRole.toLowerCase()));

 const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const currentJobs = filteredJobs.slice(
      currentPage * jobsPerPage,
      (currentPage + 1) * jobsPerPage
    );


  return (
    <>
    <Navbar/>
    <GridBackground>
      <div>
      <div className="p-6 max-w-4xl mx-auto my-14">
      <h1 className="text-3xl font-bold text-center mb-2">Smart Job Matching with FutureForge</h1>
      <p className="text-sm text-center text-white mb-6">Discover curated job opportunities tailored to your role — updated automatically, just for you</p>

      <RoleSelector selectedRole={selectedRole} onChange={setSelectedRole} />

      <div className="mt-6 space-y-4 ">
        {currentJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  </div>
    </GridBackground>
    </>
  )
}

export default JobSearch
