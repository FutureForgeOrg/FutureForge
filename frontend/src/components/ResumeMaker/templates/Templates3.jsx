import React from "react";

export default function TemplatesCompact({ data }) {
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
    <div className="max-w-4xl mx-auto bg-white text-gray-800 font-sans border shadow-lg rounded overflow-hidden">

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-2 px-3">
        <h1 className="text-xl font-bold mb-1">{name}</h1>
        <div className="flex flex-wrap items-center gap-x-2 text-xs">
          {[
            email && <span key="email">{email}</span>,
            phone && <span key="phone">{phone}</span>,
            address && <span key="address">{address}</span>,
            ...(links?.filter(l => l.label && l.url).map((link, i) => (
              <a
                key={`link-${i}`}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-300 hover:text-white underline"
              >
                {link.label}
              </a>
            )) || []),
          ]
            .filter(Boolean)
            .map((item, i, arr) => (
              <React.Fragment key={i}>
                {item}
                {i < arr.length - 1 && (
                  <span className="text-blue-200">•</span>
                )}
              </React.Fragment>
            ))}
        </div>

      </header>

      {/* Content */}
      <div className="p-3 space-y-2 text-xs leading-tight">

        {/* Skills */}
        <section>
          <h2 className="font-bold text-blue-800 text-sm mb-1 border-b border-blue-200">Technical Skills</h2>
          <div className="flex flex-wrap gap-1">
            {skills.split(",").map((skill, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">{skill.trim()}</span>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="font-bold text-blue-800 text-sm mb-1 border-b border-blue-200">Experience</h2>
          <div className="bg-gray-50 p-2 rounded">
            <pre className="whitespace-pre-line text-gray-700 font-sans text-xs">{experience}</pre>
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="font-bold text-blue-800 text-sm mb-1 border-b border-blue-200">Education</h2>
          <div className="space-y-1">
            {education.map((edu, i) => (
              <div key={i} className="bg-gray-50 p-2 rounded border-l-2 border-blue-400">
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div><span className="font-semibold">Degree:</span> {edu.degree || "N/A"}</div>
                  <div><span className="font-semibold">Institution:</span> {edu.institution || "N/A"}</div>
                  <div><span className="font-semibold">Year:</span> {edu.year || "N/A"}</div>
                  <div><span className="font-semibold">Grade:</span> {edu.percentage || "N/A"}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="font-bold text-blue-800 text-sm mb-1 border-b border-blue-200">Projects</h2>
          <div className="space-y-1">
            {projects.map((proj, i) => (
              <div key={i} className="bg-gray-50 p-2 rounded border-l-2 border-green-400">
                <h3 className="font-semibold text-gray-800 text-xs">{proj.name}</h3>
                <p className="text-gray-600 text-xs leading-tight">{proj.description}</p>
                {proj.link && (
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">🔗 View</a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Certificates */}
        <section>
          <h2 className="font-bold text-blue-800 text-sm mb-1 border-b border-blue-200">Certifications</h2>
          <div className="space-y-1">
            {certificates.map((cert, i) => (
              <div key={i} className="flex items-center bg-gray-50 p-1.5 rounded border-l-2 border-yellow-400">
                <span className="mr-1 text-xs"></span>
                <div className="text-xs">
                  <span className="font-medium">{cert.name || "Certification"}</span>
                  {cert.issuer && <span className="text-gray-600"> - {cert.issuer}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}