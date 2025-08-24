import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useJobsQuery, useDeleteJob } from "../hooks/useJobsQuery";
import Pagination from "../components/ui/Pagination";
import useDebounce from "../hooks/useDebounce.js";
import useJobsStore from "../store/useJobStore.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {Trash, Edit} from 'lucide-react';

const ManageJobs = () => {
  const { isLoading, isError, data, error } = useJobsQuery();
  const { company, page, setCompany, setPage } = useJobsStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [localCompany, setLocalCompany] = useState(company);
  const debouncedCompany = useDebounce(localCompany, 600);

  const deleteJob = useDeleteJob();
  const navigate = useNavigate();

  useEffect(() => {
    setCompany("company_name", debouncedCompany);
    setPage(1);
  }, [debouncedCompany]);

  const totalPages = Math.ceil(data?.totalJobs / 10) || 25;
  const jobs = data?.jobs || [];

  if (isError) return <div>Error: {error.message}</div>;

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await deleteJob.mutateAsync(jobId);
      toast.success("Job deleted successfully");
    } catch {
      toast.error("Failed to delete job");
    }
  };

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center bg-purple-600 text-white p-4 sticky top-0 z-40">
        <h1 className="text-xl font-bold">FutureForge</h1>
        <button onClick={() => setSidebarOpen(true)} className="text-2xl">
          ☰
        </button>
      </div>

      <div className="p-6 md:ml-72 ml-0 bg-white min-h-screen overflow-x-auto">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-center">Manage Jobs</h1>
          <p className="text-gray-700 mb-4 text-center">
            Here you can manage all jobs in the system.
          </p>

          {/* Search filter by company */}
          <div className="flex items-center justify-center w-full">
            <div className="mb-4 w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search by company name..."
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                onChange={(e) => setLocalCompany(e.target.value)}
                value={localCompany}
              />
            </div>
          </div>

          {/* Jobs Table */}
          <div className="p-6 overflow-x-auto text-sm">
            <table className="bg-white md:min-w-full rounded-lg border border-gray-200 shadow-md">
              <thead className="bg-white border-b">
                <tr className="font-semibold">
                  <th className="py-2 px-4 border-b text-left">Company</th>
                  <th className="py-2 px-4 border-b text-left">Job Title</th>
                  <th className="py-2 px-4 border-b text-left">Location</th>
                  <th className="py-2 px-4 border-b text-left">Scraped Date</th>
                  <th className="py-2 px-4 border-b text-left">Links</th>
                  <th className="py-2 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : jobs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No jobs found
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => (
                    <tr key={job._id} className="border-b">
                      <td className="py-2 px-4 border-b max-w-[180px] truncate">
                        {job.company_name}
                      </td>
                      <td className="py-2 px-4 border-b max-w-[180px] truncate">
                        {job.job_title}
                      </td>
                      <td className="py-2 px-4 border-b max-w-[150px] truncate">
                        {job.location}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {new Date(job.scraped_date).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b max-w-[200px] truncate">
                        <a
                          href={job.job_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline mr-2"
                        >
                          Job
                        </a>
                        <a
                          href={job.direct_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-500 hover:underline mr-2"
                        >
                          Direct
                        </a>
                        <a
                          href={job.google_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-500 hover:underline"
                        >
                          Google
                        </a>
                      </td>
                      <td className="py-2 px-4 border-b space-x-3">
                        <button
                          onClick={() => navigate(`/jobs/${job._id}/edit`)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                            <Edit size={18}/>
                        </button>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                            <Trash size={18}/>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </>
  );
};

export default ManageJobs;
