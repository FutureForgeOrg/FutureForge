// import React from "react";

// export default function ResumeForm({ formData, setFormData }) {
//     const handleChange = (field, value) => {
//         setFormData({ ...formData, [field]: value });
//     };
//     return (
//         <>
// <div className="p-4 grid gap-4 max-w-xl mx-auto">
//       <input
//         type="text"
//         placeholder="Full Name"
//         value={formData.name}
//         onChange={(e) => handleChange("name", e.target.value)}
//         className="border p-2 rounded"
//       />

//       <input
//         type="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={(e) => handleChange("email", e.target.value)}
//         className="border p-2 rounded"
//       />

//       <input
//         type="text"
//         placeholder="Phone Number"
//         value={formData.phone}
//         maxLength={10}
//         onChange={(e) => handleChange("phone", e.target.value)}
//         className="border p-2 rounded"
//       />

//       <input
//         type="text"
//         placeholder="Address"
//         value={formData.address}
//         onChange={(e) => handleChange("address", e.target.value)}
//         className="border p-2 rounded"
//       />

//       <textarea
//         placeholder="Skills (comma-separated)"
//         value={formData.skills}
//         onChange={(e) => handleChange("skills", e.target.value)}
//         className="border p-2 rounded"
//       />

//       <textarea
//         placeholder="Education"
//         value={formData.education}
//         onChange={(e) => handleChange("education", e.target.value)}
//         className="border p-2 rounded"
//       />

//       <textarea
//         placeholder="Experience"
//         value={formData.experience}
//         onChange={(e) => handleChange("experience", e.target.value)}
//         className="border p-2 rounded"
//       />

//       <textarea
//         placeholder="Projects (e.g. Project Name - Short Description)"
//         value={formData.projects}
//         onChange={(e) => handleChange("projects", e.target.value)}
//         className="border p-2 rounded"
//       />

//       <textarea
//         placeholder="Certificates (e.g. Course Name - Issuer)"
//         value={formData.certificates}
//         onChange={(e) => handleChange("certificates", e.target.value)}
//         className="border p-2 rounded"
//       />

//       <textarea
//         placeholder="Links (comma-separated: GitHub, LinkedIn, Portfolio)"
//         value={formData.links}
//         onChange={(e) => handleChange("links", e.target.value)}
//         className="border p-2 rounded"
//       />
//     </div>
//         </>
//     )
// }

import React from "react";

export default function ResumeForm({ formData, setFormData }) {
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleAddField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  return (
    <div className="p-4 grid gap-4 max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        className="border p-2 rounded"
      />

      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        className="border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={formData.phone}
        maxLength={10}
        onChange={(e) => handleChange("phone", e.target.value)}
        className="border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Address"
        value={formData.address}
        onChange={(e) => handleChange("address", e.target.value)}
        className="border p-2 rounded"
      />

      <textarea
        placeholder="Skills (comma-separated)"
        value={formData.skills}
        onChange={(e) => handleChange("skills", e.target.value)}
        className="border p-2 rounded"
      />

      {/* Dynamic Education */}
      <div>
        <h2 className="font-semibold">Education</h2>
        {formData.education.map((edu, i) => (
          <textarea
            key={i}
            placeholder={`Education ${i + 1}`}
            value={edu}
            onChange={(e) => handleArrayChange("education", i, e.target.value)}
            className="border p-2 rounded mb-2 w-full"
          />
        ))}
        <button
          type="button"
          onClick={() => handleAddField("education")}
          className="text-blue-600 underline"
        >
          + Add more education
        </button>
      </div>

      {/* Dynamic Experience */}
      <textarea
        placeholder="Experience"
        value={formData.experience}
        onChange={(e) => handleChange("experience", e.target.value)}
        className="border p-2 rounded"
      />

      {/* Dynamic Projects */}
      <div>
        <h2 className="font-semibold">Projects</h2>
        {formData.projects.map((proj, i) => (
          <textarea
            key={i}
            placeholder={`Project ${i + 1}`}
            value={proj}
            onChange={(e) => handleArrayChange("projects", i, e.target.value)}
            className="border p-2 rounded mb-2 w-full"
          />
        ))}
        <button
          type="button"
          onClick={() => handleAddField("projects")}
          className="text-blue-600 underline"
        >
          + Add more projects
        </button>
      </div>

      {/* Dynamic Certificates */}
      <div>
        <h2 className="font-semibold">Certificates</h2>
        {formData.certificates.map((cert, i) => (
          <textarea
            key={i}
            placeholder={`Certificate ${i + 1}`}
            value={cert}
            onChange={(e) => handleArrayChange("certificates", i, e.target.value)}
            className="border p-2 rounded mb-2 w-full"
          />
        ))}
        <button
          type="button"
          onClick={() => handleAddField("certificates")}
          className="text-blue-600 underline"
        >
          + Add more certificates
        </button>
      </div>

      <textarea
        placeholder="Links (comma-separated: GitHub, LinkedIn, Portfolio)"
        value={formData.links}
        onChange={(e) => handleChange("links", e.target.value)}
        className="border p-2 rounded"
      />
    </div>
  );
}
