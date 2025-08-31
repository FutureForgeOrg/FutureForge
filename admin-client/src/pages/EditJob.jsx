import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJobById, useUpdateJob } from "../hooks/useJobsQuery.js";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: job, isLoading } = useJobById(id);
  const updateJob = useUpdateJob();

  const [formData, setFormData] = useState({
    company_name: "",
    job_title: "",
    location: "",
    job_link: "",
    direct_link: "",
    google_link: "",
    link_type: "",
    scraped_date: "",
    description: "",
    job_id: "",
  });

  useEffect(() => {
    if (job) {
      setFormData({
        company_name: job.company_name || "",
        job_title: job.job_title || "",
        location: job.location || "",
        job_link: job.job_link || "",
        direct_link: job.direct_link || "",
        google_link: job.google_link || "",
        link_type: job.link_type || "",
        scraped_date: job.scraped_date || "",
        description: job.description || "",
        job_id: job.job_id || "",
      });
    }
  }, [job]);

  if (isLoading || !formData) return <p>Loading...</p>;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateJob.mutateAsync({ id, data: formData });
      navigate("/jobs");
    } catch (err) {
      console.error("Error updating job", err);
    }
  };

  return (
    <div className="p-12">
    <div className="p-6 max-w-2xl mx-auto border rounded-lg border-gray-500">
      <h1 className="text-2xl font-bold mb-6">Edit Job</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          { name: "company_name", label: "Company Name" },
          { name: "job_title", label: "Job Title" },
          { name: "location", label: "Location" },
          { name: "job_link", label: "Job Link" },
          { name: "direct_link", label: "Direct Link" },
          { name: "google_link", label: "Google Link" },
          { name: "link_type", label: "Link Type" },
        ].map(({ name, label }) => (
          <div 
          key={name}
          className=""
          >
            <label htmlFor={name} className="block text-sm font-medium mb-1">
              {label}
            </label>
            <input
              id={name}
              name={name}
              value={formData[name] || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        ))}

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 h-28 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={updateJob.isPending}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          {updateJob.isPending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
    </div>
  );
}
