import React from "react";

export default function TemplatesUnique({ data }) {
  const {
    name,
    email,
    phone,
    address,
    skills,
    education,
    experience,
    projects,
    certificates,
    links,
  } = data;

  return (
    <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-50 to-blue-50 font-sans shadow-2xl rounded-2xl overflow-hidden relative">
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200 to-transparent rounded-full opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200 to-transparent rounded-full opacity-30"></div>
      
      {/* Sidebar */}
      <div className="flex">
        <div className="w-72 bg-gradient-to-b from-slate-800 to-slate-900 text-white p-3 relative">
          
          {/* Profile Circle */}
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center text-lg font-bold shadow-lg">
            {name ? name.split(' ').map(n => n[0]).join('').slice(0,2) : 'JD'}
          </div>
          
          {/* Name */}
          <h1 className="text-lg font-bold text-center mb-3">{name}</h1>
          
          {/* Contact Info */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center text-xs">
              <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center mr-2">
                📧
              </div>
              <span className="break-all">{email}</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center mr-2">
                📱
              </div>
              <span>{phone}</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-6 h-6 bg-red-500 rounded-lg flex items-center justify-center mr-2">
                📍
              </div>
              <span>{address}</span>
            </div>
            {links.map((link, i) => (
              <div key={i} className="flex items-center text-xs">
                <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center mr-2">
                  🔗
                </div>
                <a href={link.url} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-white underline">
                  {link.label}
                </a>
              </div>
            ))}
          </div>

          {/* Skills Sidebar */}
          <div>
            <h2 className="text-sm font-bold mb-2 text-blue-300">Technical Skills</h2>
            <div className="space-y-1">
              {skills.split(",").slice(0,6).map((skill, i) => (
                <div key={i} className="relative">
                  <div className="bg-slate-700 rounded-full p-1.5 text-xs font-medium text-center hover:bg-slate-600 transition-colors">
                    {skill.trim()}
                  </div>
                </div>
              ))}
              {skills.split(",").length > 6 && (
                <div className="text-xs text-slate-400 text-center">
                  +{skills.split(",").length - 6} more
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-3">
          
          {/* Experience Timeline */}
          <div className="mb-3">
            <h2 className="text-lg font-bold text-slate-800 mb-2 flex items-center">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mr-2 flex items-center justify-center text-white text-xs">
                💼
              </div>
              Professional Journey
            </h2>
            <div className="relative">
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400"></div>
              <div className="bg-white rounded-lg p-3 shadow-md border-l-4 border-blue-400 ml-6 relative">
                <div className="absolute -left-9 top-3 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>
                <pre className="whitespace-pre-line text-xs text-gray-700 leading-tight font-sans">{experience}</pre>
              </div>
            </div>
          </div>

          {/* Education & Certificates Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
            
            {/* Education */}
            <div>
              <h2 className="text-sm font-bold text-slate-800 mb-2 flex items-center">
                <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded mr-1 flex items-center justify-center text-white text-xs">
                  🎓
                </div>
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu, i) => (
                  <div key={i} className="bg-white rounded-lg p-2 shadow-md border-l-2 border-green-400 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold text-slate-800 text-xs">{edu.degree || "Degree"}</h3>
                    <p className="text-gray-600 text-xs">{edu.institution || "Institution"}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{edu.year || "Year"}</span>
                      <span>{edu.percentage || "Grade"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div>
              <h2 className="text-sm font-bold text-slate-800 mb-2 flex items-center">
                <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded mr-1 flex items-center justify-center text-white text-xs">
                  🏆
                </div>
                Certifications
              </h2>
              <div className="space-y-2">
                {certificates.map((cert, i) => (
                  <div key={i} className="bg-white rounded-lg p-2 shadow-md border-l-2 border-yellow-400 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold text-slate-800 text-xs">{cert.name || "Certification"}</h3>
                    <p className="text-gray-600 text-xs">{cert.issuer || "Issuing Organization"}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Projects Showcase */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-2 flex items-center">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-2 flex items-center justify-center text-white text-xs">
                🚀
              </div>
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {projects.map((proj, i) => (
                <div key={i} className="group bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-purple-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-purple-100 to-transparent rounded-full opacity-50"></div>
                  <h3 className="font-bold text-slate-800 mb-1 relative z-10 text-sm">{proj.name}</h3>
                  <p className="text-gray-600 text-xs leading-tight mb-2 relative z-10">{proj.description}</p>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-purple-600 hover:text-purple-800 text-xs font-medium group-hover:underline relative z-10"
                    >
                      <span className="mr-1">🔗</span>
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}