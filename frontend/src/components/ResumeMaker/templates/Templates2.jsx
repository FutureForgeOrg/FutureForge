import { Dot, Mail, MapPin, Phone } from "lucide-react";
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
    <div className="max-w-4xl mx-auto bg-white text-gray-800 font-sans border shadow-lg rounded p-4">

      {/* Header */}
      <header className="bg-gray-800 text-white py-3 px-4 rounded mb-2">
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
                {i < arr.length - 1 && <span className="mx-2">|</span>}
              </React.Fragment>
            ))}
        </div>
      </header>

      {/* All sections in one column */}
      <div className="space-y-3 text-sm">

        {/* Skills */}
        {skills && skills.trim() !== "" && (
          <div>
            <h2 className="font-semibold border-b border-gray-300 text-blue-700 text-sm">Skills</h2>
            {/* <Dot>
              {skills.split(",").map((skill, i) => (
                <li key={i}>{skill.trim()}</li>
              ))}
            </Dot> */}
            {skills.split(',').map((skill, i) => (
              <div className="inline-flex items-center" key={i}>
                <Dot className="pt-0.5" />
                <span key={i} className="">{skill.trim()}</span>
              </div>
            ))}

          </div>
        )}

        {/* Certificates */}
        {Array.isArray(certificates) && certificates.some(cert => cert.issuer || cert.name) && (
          <div>
            <h2 className="font-semibold border-b border-gray-300 text-blue-700 text-sm">Certificates</h2>
            <ul className="list-disc pl-4">
              {certificates
                .filter(cert => cert.issuer || cert.name)
                .map((cert, i) => (
                  <li key={i}>
                    {cert.issuer ? cert.issuer : "-"}
                    {cert.name ? ` - ${cert.name}` : ""}
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* Experience */}
        {experience && experience.trim() !== "" && (
          <div>
            <h2 className="font-semibold border-b border-gray-300 text-blue-700 text-sm">Experience</h2>
            <p className="whitespace-pre-line break-words">{experience}</p>
          </div>
        )}

        {/* Education */}
        {Array.isArray(education) && education.some(edu => edu.degree || edu.institution) && (
          <div>
            <h2 className="font-semibold border-b border-gray-300 text-blue-700 text-sm">Education</h2>
            <ul className="list-disc pl-4 space-y-1">
              {education.map((edu, i) => (
                <li key={i}>
                  <div className="flex gap-4">
                    <div className="flex-1"><strong>Degree:</strong> {edu.degree || "-"}</div>
                    <div className="flex-1"><strong>Institution:</strong> {edu.institution || "-"}</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1"><strong>Year:</strong> {edu.year || "-"}</div>
                    <div className="flex-1"><strong>Percentage:</strong> {edu.percentage || "-"}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Projects */}
        {Array.isArray(projects) && projects.some(proj => proj.name || proj.description) && (
          <div>
            <h2 className="font-semibold border-b border-gray-300 text-blue-700 text-sm">Projects</h2>
            <ul className="list-disc pl-4 space-y-1">
              {projects.map((proj, i) => (
                <li key={i}>
                  <div className="font-semibold">{proj.name}</div>
                  <div className="text-gray-600">{proj.description}</div>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      🔗 View
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}
