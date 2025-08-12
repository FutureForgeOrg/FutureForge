import React from "react";
import { User, Mail, Phone, MapPin, Code, Briefcase, Link, GraduationCap, FolderOpen, Award, Plus } from "lucide-react";

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

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index][field] = value;
    setFormData({ ...formData, education: updatedEducation });
  };

  const handleCertificateChange = (index, field, value) => {
    const updatedCertificates = [...formData.certificates];
    updatedCertificates[index][field] = value;
    setFormData({ ...formData, certificates: updatedCertificates });
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...formData.links];
    updatedLinks[index][field] = value;
    setFormData({ ...formData, links: updatedLinks });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Resume Builder</h1>
          <p className="text-gray-600">Create your professional resume with ease</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Personal Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                Personal Information
              </h2>

              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={formData.phone}
                    maxLength={10}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Skills & Experience */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Code className="w-5 h-5 text-green-500" />
                Skills & Experience
              </h2>

              <div className="space-y-4">
                <div className="relative">
                  <Code className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <textarea
                    placeholder="Skills (comma-separated)"
                    value={formData.skills}
                    onChange={(e) => handleChange("skills", e.target.value)}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 resize-none"
                  />

                </div>

                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <textarea
                    placeholder="Work Experience"
                    value={formData.experience}
                    onChange={(e) => handleChange("experience", e.target.value)}
                    rows={4}
                    wrap="soft"
                    className="w-full max-w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 resize-none max-h-[150px] overflow-y-auto"
                  />
                </div>


                {formData.links.map((link, i) => (
                  <div key={i} className="space-y-2">
                    <input
                      type="text"
                      placeholder="Label (e.g., GitHub)"
                      value={link.label}
                      onChange={(e) => handleLinkChange(i, "label", e.target.value)}
                      className="border p-2 rounded w-full"
                    />

                    <input
                      type="text"
                      placeholder="URL (e.g., https://github.com/username)"
                      value={link.url}
                      onChange={(e) => handleLinkChange(i, "url", e.target.value)}
                      className="border p-2 rounded w-full"
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      links: [...formData.links, { label: "", url: "" }]
                    })
                  }
                >
                  Add Link
                </button>

              </div>
            </div>
          </div>

          {/* Right Column - Dynamic Sections */}
          <div className="space-y-6">
            {/* Education Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-500" />
                Education
              </h2>

              <div className="space-y-6">
                {formData.education.map((edu, i) => (
                  <div key={i} className="p-4 border border-gray-200 rounded-lg space-y-3 relative">
                    <GraduationCap className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

                    <input
                      type="text"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(i, "degree", e.target.value)}
                      className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-500"
                    />

                    <input
                      type="text"
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(i, "institution", e.target.value)}
                      className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-500"
                    />

                    <input
                      type="text"
                      placeholder="Year"
                      value={edu.year}
                      onChange={(e) => handleEducationChange(i, "year", e.target.value)}
                      className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-500"
                    />

                    <input
                      type="text"
                      placeholder="Percentage"
                      value={edu.percentage}
                      onChange={(e) => handleEducationChange(i, "percentage", e.target.value)}
                      className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => setFormData({
                    ...formData,
                    education: [...formData.education, { degree: "", institution: "", year: "", percentage: "" }]
                  })}
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 group"
                >
                  <Plus className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  Add Education
                </button>
              </div>
            </div>


            {/* Projects Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-orange-500" />
                Projects
              </h2>

              <div className="space-y-3">
                {formData.projects.map((proj, i) => (

                  <div key={i} className="p-4 border border-gray-200 rounded-lg space-y-3">

                    {/* Project Name */}
                    <input
                      type="text"
                      placeholder="Project Name"
                      value={proj.name}
                      onChange={(e) => handleProjectChange(i, "name", e.target.value)}
                      className="w-full border p-2 rounded focus:ring-2 focus:ring-orange-500"
                    />

                    {/* Project Description */}
                    <textarea
                      placeholder="Project Description"
                      value={proj.description}
                      onChange={(e) => handleProjectChange(i, "description", e.target.value)}
                      rows={3}
                      className="w-full border p-2 rounded focus:ring-2 focus:ring-orange-500 resize-none"
                    />

                    {/* Project Link */}
                    <input
                      type="text"
                      placeholder="Project Link"
                      value={proj.link}
                      onChange={(e) => {
                        let val = e.target.value.trim();
                        // Automatically prepend https:// if user types something that doesn't start with http/https and isn't empty
                        if (val && !val.startsWith("http://") && !val.startsWith("https://")) {
                          val = "https://" + val;
                        }
                        handleProjectChange(i, "link", val);
                      }}
                      className="w-full border p-2 rounded focus:ring-2 focus:ring-orange-500"
                    />

                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setFormData({
                    ...formData,
                    projects: [...formData.projects, { name: "", description: "", link: "" }]
                  })}
                  className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              </div>
            </div>

            {/* Certificates Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-red-500" />
                Certificates
              </h2>

              <div className="space-y-6">
                {formData.certificates.map((cert, i) => (
                  <div key={i} className="relative p-4 border border-gray-200 rounded-lg space-y-3">
                    <Award className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

                    <input
                      type="text"
                      placeholder="Certificate Name"
                      value={cert.name}
                      onChange={(e) => handleCertificateChange(i, "name", e.target.value)}
                      className="w-full border p-2 rounded focus:ring-2 focus:ring-red-500"
                    />

                    <input
                      type="text"
                      placeholder="Issuer"
                      value={cert.issuer}
                      onChange={(e) => handleCertificateChange(i, "issuer", e.target.value)}
                      className="w-full border p-2 rounded focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      certificates: [...formData.certificates, { name: "", issuer: "" }]
                    })
                  }
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors duration-200 group"
                >
                  <Plus className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  Add Certificate
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}