
import React from "react";
import { Mail } from "lucide-react";
import { Phone } from "lucide-react";
import { MapPin } from "lucide-react";

export default function Templates1({ data }) {
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
    <div className="max-w-3xl mx-auto bg-white text-gray-800 font-sans border shadow-lg rounded">
      {/* Header */}
      <header className="bg-gray-800 text-white py-6 px-8 text-center rounded-t">
        <h1 className="text-3xl font-bold mb-2">{name}</h1>

        <div className="flex flex-wrap justify-center items-center text-sm">
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
            .filter(Boolean) // remove any falsy (empty) items
            .map((item, i, arr) => (
              <React.Fragment key={i}>
                {item}
                {i < arr.length - 1 && <span className="mx-2">|</span>} {/* add dash only between */}
              </React.Fragment>
            ))}
        </div>

      </header>


      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6 p-6">
        {/* Left Column */}
        <aside className="col-span-1 space-y-4">
          {/* Skills */}
          {skills.trim() !== "" && (
            <div>
              <h2 className="text-lg font-semibold border-b mb-1 text-blue-700">Skills</h2>
              <ul className="list-disc pl-5 text-sm">
                {skills.split(',').map((skill, i) => (
                  <li key={i}>{skill.trim()}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Certificates */}
          {certificates.some(cert => cert.issuer || cert.name) && (
            <div>
              <h2 className="text-lg font-semibold border-b mb-1 text-blue-700">Certificates</h2>
              <ul className="list-disc pl-5 text-sm">
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


          {experience.trim() !== "" && (
            <div>
              <h2 className="text-xl font-semibold border-b mb-1 text-blue-700">Experience</h2>
              <p className="text-sm whitespace-pre-line">
                {experience}
              </p>
            </div>
          )}

        </aside>

        {/* Right Column */}
        <section className="col-span-2 space-y-6">

          {/* Education */}
          {education.some(edu => edu.degree || edu.institution) && (
            <div>
              <h2 className="text-xl font-semibold border-b mb-1 text-blue-700">Education</h2>
              <ul className="list-disc pl-5 text-sm space-y-2">
                {education.map((edu, i) => (
                  <li key={i} className="space-y-2">
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
          {projects.some(proj => proj.name || proj.description) && (
            <div>
              <h2 className="text-xl font-semibold border-b mb-1 text-blue-700">Projects</h2>
              <ul className="list-disc pl-5 text-sm space-y-2">
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

        </section>
      </div>
    </div>
  );
}
