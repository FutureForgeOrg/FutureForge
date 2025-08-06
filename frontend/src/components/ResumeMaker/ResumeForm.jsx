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
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 resize-none"
                  />
                </div>

                <div className="relative">
                  <Link className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <textarea
                    placeholder="Professional Links (GitHub, LinkedIn, Portfolio - comma-separated)"
                    value={formData.links}
                    onChange={(e) => handleChange("links", e.target.value)}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 resize-none"
                  />
                </div>
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
              
              <div className="space-y-3">
                {formData.education.map((edu, i) => (
                  <div key={i} className="relative">
                    <GraduationCap className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                      placeholder={`Education ${i + 1} (Degree, Institution, Year)`}
                      value={edu}
                      onChange={(e) => handleArrayChange("education", i, e.target.value)}
                      rows={2}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 resize-none"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField("education")}
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
                  <div key={i} className="relative">
                    <FolderOpen className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                      placeholder={`Project ${i + 1} (Title, Description, Technologies)`}
                      value={proj}
                      onChange={(e) => handleArrayChange("projects", i, e.target.value)}
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 resize-none"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField("projects")}
                  className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200 group"
                >
                  <Plus className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  Add Project
                </button>
              </div>
            </div>

            {/* Certificates Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-red-500" />
                Certificates
              </h2>
              
              <div className="space-y-3">
                {formData.certificates.map((cert, i) => (
                  <div key={i} className="relative">
                    <Award className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                      placeholder={`Certificate ${i + 1} (Name, Issuer, Date)`}
                      value={cert}
                      onChange={(e) => handleArrayChange("certificates", i, e.target.value)}
                      rows={2}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 resize-none"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField("certificates")}
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