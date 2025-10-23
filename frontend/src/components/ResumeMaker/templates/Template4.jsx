import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

export default function TemplatesTwoPanel({ data }) {
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
    <div className="max-w-3xl mx-auto bg-white text-gray-800 font-sans border shadow-lg rounded overflow-hidden">

      {/* Header */}
      <header className="bg-gray-800 text-white py-3 px-4 rounded-t mb-2">
        <h1 className="text-2xl font-bold">{name}</h1>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs mt-1">
          {[
            email && <div className="flex items-center gap-1"> <Mail size={16} className="pt-0.5" /><span key="email">{email}</span></div>,
            phone && <div className="flex items-center gap-1"> <Phone size={16} className="pt-0.5" /><span key="phone">{phone}</span></div>,
            address && <div className="flex items-center gap-1"> <MapPin size={16} className="" /><span key="address">{address}</span></div>,
            ...(links?.filter(l => l.label && l.url).map((link, i) => (
              <a
                key={`link-${i}`}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline"
              >
                {link.label}
              </a>
            )) || []),
          ]
            .filter(Boolean)
            .map((item, i, arr) => (
              <React.Fragment key={i}>
                {item}
                {i < arr.length - 1 && <span className="text-gray-400">|</span>}
              </React.Fragment>
            ))}
        </div>
      </header>

      {/* Two Panel Layout */}
      <div className="flex gap-4 p-4">

        {/* Left Panel - Projects Only */}
        {Array.isArray(projects) && projects.some(proj => proj.name || proj.description) && (
          <div className="w-1/2 space-y-2">
            <div>
              <h2 className="font-semibold border-b border-gray-300 text-blue-700 text-sm mb-2">Projects</h2>
              <div className="space-y-3">
                {projects.map((proj, i) => (
                  <div key={i} className="bg-gray-50 p-3 rounded border-l-4 border-green-500">
                    {proj.name && <h3 className="font-semibold text-gray-800 text-sm mb-1">{proj.name}</h3>}
                    {proj.description && <p className="text-gray-600 text-xs leading-tight mb-2">{proj.description}</p>}
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline text-xs"
                      >
                        🔗 View Project
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Right Panel - All Other Sections */}
        <div className="w-1/2 space-y-2 text-sm">

          {/* Skills */}
          {skills && skills.trim() !== "" && (
            <div>
              <h2 className="font-semibold border-b border-gray-300 text-blue-700 text-sm mb-2">Skills</h2>
              <div className="flex flex-wrap gap-1">
                {skills.split(",").map((skill, i) => (
                  <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {experience && experience.trim() !== "" && (
            <div>
              <h2 className="font-semibold border-b border-gray-300 text-blue-700 text-sm mb-2">Experience</h2>
              <div className="bg-gray-50 p-3 rounded">
                <pre className="whitespace-pre-line break-words text-xs text-gray-700 font-sans">{experience}</pre>
              </div>
            </div>
          )}

          {/* Education */}
          {Array.isArray(education) && education.some(edu => edu.degree || edu.institution) && (
            <div>
              <h2 className="font-semibold border-b border-gray-300 text-blue-700 text-sm mb-2">Education</h2>
              <div className="space-y-2">
                {education.map((edu, i) => (
                  <div key={i} className="bg-gray-50 p-2 rounded border-l-4 border-blue-500">
                    <div className="grid grid-cols-1 gap-1 text-xs">
                      <div><strong>Degree:</strong> {edu.degree || "-"}</div>
                      <div><strong>Institution:</strong> {edu.institution || "-"}</div>
                      <div className="grid grid-cols-2 gap-2">
                        <div><strong>Year:</strong> {edu.year || "-"}</div>
                        <div><strong>Grade:</strong> {edu.percentage || "-"}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates */}
          {Array.isArray(certificates) && certificates.some(cert => cert.name || cert.issuer) && (
            <div>
              <h2 className="font-semibold border-b border-gray-300 text-blue-700 text-sm mb-2">Certificates</h2>
              <div className="space-y-1">
                {certificates
                  .filter(cert => cert.name || cert.issuer)
                  .map((cert, i) => (
                    <div key={i} className="flex items-center bg-gray-50 p-2 rounded border-l-4 border-yellow-500">
                      <span className="mr-2 text-sm">🏆</span>
                      <div className="text-xs">
                        {cert.name && <span className="font-medium text-gray-800">{cert.name}</span>}
                        {cert.issuer && <span className="text-gray-600"> - {cert.issuer}</span>}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
