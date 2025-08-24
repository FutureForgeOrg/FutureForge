import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJobById, useUpdateJob } from "../hooks/useJobsQuery.js"

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
        job_id: ""
    });


    // prefill when job loads
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
            navigate("/manage-jobs"); // goes back to list
        } catch (err) {
            console.error("Error updating job", err);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Edit Job</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="company_name"
                    value={formData.company_name || ""}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className="w-full border p-2 rounded"
                />
                <input
                    name="job_title"
                    value={formData.job_title || ""}
                    onChange={handleChange}
                    placeholder="Job Title"
                    className="w-full border p-2 rounded"
                />
                <input
                    name="location"
                    value={formData.location || ""}
                    onChange={handleChange}
                    placeholder="Location"
                    className="w-full border p-2 rounded"
                />
                <input
                    name="job_link"
                    value={formData.job_link || ""}
                    onChange={handleChange}
                    placeholder="Job Link"
                    className="w-full border p-2 rounded"
                />
                <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full border p-2 rounded h-24"
                />
                <button
                    type="submit"
                    disabled={updateJob.isPending}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {updateJob.isPending ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
}
