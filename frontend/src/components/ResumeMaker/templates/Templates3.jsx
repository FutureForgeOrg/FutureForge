import React from "react";
import { Mail, Phone, MapPin, Globe, User, Briefcase, GraduationCap, FolderOpen, Award, Code } from "lucide-react";

export default function Templates3({ data }) {


  // Helper function to parse comma-separated values
  const parseCommaList = (str) => {
    return str ? str.split(',').map(item => item.trim()).filter(item => item) : [];
  };

  // Helper function to format links
  const formatLinks = (linksStr) => {
    const links = parseCommaList(linksStr);
    return links.map(link => {
      if (link.toLowerCase().includes('github')) return { text: link, icon: '🔗', type: 'GitHub' };
      if (link.toLowerCase().includes('linkedin')) return { text: link, icon: '💼', type: 'LinkedIn' };
      if (link.toLowerCase().includes('portfolio') || link.includes('http')) return { text: link, icon: '🌐', type: 'Portfolio' };
      return { text: link, icon: '🔗', type: 'Link' };
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-1">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">{data.name || "Your Name"}</h1>
          <div className="flex flex-wrap justify-center items-center gap-6 text-blue-100">
            {data.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{data.email}</span>
              </div>
            )}
            {data.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{data.phone}</span>
              </div>
            )}
            {data.address && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{data.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-2">
            {/* Experience Section */}
            {data.experience && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {data.experience}
                  </p>
                </div>
              </div>
            )}

            {/* Projects Section */}
            {data.projects && data.projects.some(proj => proj.trim()) && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <FolderOpen className="w-5 h-5 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
                </div>
                <div className="space-y-4">
                  {data.projects.filter(proj => proj.trim()).map((project, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {project}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Section */}
            {data.education && data.education.some(edu => edu.trim()) && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Education</h2>
                </div>
                <div className="space-y-4">
                  {data.education.filter(edu => edu.trim()).map((education, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg border-l-4 border-purple-500">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {education}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Skills Section */}
            {data.skills && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Code className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Skills</h2>
                </div>
                <div className="space-y-2">
                  {parseCommaList(data.skills).map((skill, index) => (
                    <div key={index} className="bg-green-50 px-3 py-2 rounded-md text-green-800 text-sm font-medium">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}

           
            {/* Links Section */}
            {data.links && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Globe className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Links</h2>
                </div>
                <div className="space-y-3">
                  {formatLinks(data.links).map((link, index) => (
                    <a
                      key={index}
                      href={link.text.startsWith("http") ? link.text : `https://${link.text}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <span className="text-lg">{link.icon}</span>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">
                          {link.type}
                        </div>
                        <div className="text-sm font-medium break-all underline">
                          {link.text}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}


            {/* Certificates Section */}
            {data.certificates && data.certificates.some(cert => cert.trim()) && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-100 p-2 rounded-full">
                    <Award className="w-5 h-5 text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Certificates</h2>
                </div>
                <div className="space-y-3">
                  {data.certificates.filter(cert => cert.trim()).map((certificate, index) => (
                    <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                      <p className="text-red-800 text-sm font-medium leading-relaxed whitespace-pre-line">
                        {certificate}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}