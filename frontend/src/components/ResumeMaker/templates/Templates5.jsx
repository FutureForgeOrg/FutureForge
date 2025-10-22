import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

export default function TemplatesDark({ data }) {
  const { name, email, phone, address, skills, education, experience, projects, certificates, links } = data;

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 text-gray-200 font-sans border border-gray-700 rounded-lg">

      {/* Header */}
      <header className="bg-gray-800 text-white py-4 px-6 text-center rounded-t-lg">
        <h1 className="text-2xl font-bold mb-1">{name}</h1>
        <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-300">
          {email && <div className="flex items-center gap-1"> <Mail size={16} className="pt-0.5" /><span key="email">{email}</span></div>}
          {phone && <div className="flex items-center gap-1"> <Phone size={16} className="pt-0.5" /><span key="phone">{phone}</span></div>}
          {address && <div className="flex items-center gap-1"> <MapPin size={16} className="" /><span key="address">{address}</span></div>}
          {Array.isArray(links) && links.filter(l => l.label && l.url).map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6 p-6">

        {/* Left Column */}
        <aside className="col-span-1 space-y-4">
          {/* Skills */}
          {skills && skills.trim() !== "" && (
            <div>
              <h2 className="text-blue-400 font-semibold">Skills</h2>
              <ul className="list-disc pl-5 text-sm">
                {skills.split(",").map((skill, i) => (
                  <li key={i}>{skill.trim()}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Certificates */}
          {Array.isArray(certificates) && certificates.some(cert => cert.name || cert.issuer) && (
            <div>
              <h2 className="text-blue-400 font-semibold">Certificates</h2>
              <ul className="list-disc pl-5 text-sm">
                {certificates
                  .filter(cert => cert.name || cert.issuer)
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
              <h2 className="text-blue-400 font-semibold">Experience</h2>
              <p className="text-sm whitespace-pre-line break-words text-gray-300">{experience}</p>
            </div>
          )}
        </aside>

        {/* Right Column */}
        <section className="col-span-2 space-y-4">
          {/* Education */}
          {Array.isArray(education) && education.some(edu => edu.degree || edu.institution) && (
            <div>
              <h2 className="text-blue-400 font-semibold">Education</h2>
              <ul className="list-disc pl-5 text-sm space-y-2">
                {education.map((edu, i) => (
                  <li key={i}>
                    {edu.degree && <div><strong>Degree:</strong> {edu.degree}</div>}
                    {edu.institution && <div><strong>Institution:</strong> {edu.institution}</div>}
                    {edu.year && <div><strong>Year:</strong> {edu.year}</div>}
                    {edu.percentage && <div><strong>Percentage:</strong> {edu.percentage}</div>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Projects */}
          {Array.isArray(projects) && projects.some(proj => proj.name || proj.description) && (
            <div>
              <h2 className="text-blue-400 font-semibold">Projects</h2>
              <ul className="list-disc pl-5 text-sm space-y-2">
                {projects.map((proj, i) => (
                  <li key={i}>
                    {proj.name && <div className="font-semibold text-gray-100">{proj.name}</div>}
                    {proj.description && <div className="text-gray-400">{proj.description}</div>}
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        View
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
