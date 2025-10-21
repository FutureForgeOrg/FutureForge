
import React from "react";

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
    <div className="max-w-4xl mx-auto bg-white text-gray-800 font-sans border shadow-lg rounded">
      {/* Header */}
      <header className="bg-gray-800 text-white py-6 px-8 text-center rounded-t">
        <h1 className="text-3xl font-bold mb-2">{name}</h1>

        <div className="flex flex-wrap justify-center items-center text-sm">
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
          <div>
            <h2 className="text-lg font-semibold border-b mb-1 text-blue-700">Skills</h2>
            <ul className="list-disc pl-5 text-sm">
              {skills.split(',').map((skill, i) => (
                <li key={i}>{skill.trim()}</li>
              ))}
            </ul>
          </div>



          {/* Certificates */}
          <div>
            <h2 className="text-lg font-semibold border-b mb-1 text-blue-700">Certificates</h2>
            <ul className="list-disc pl-5 text-sm">
              {certificates.map((cert, i) => (
                <li key={i}>
                  {cert.issuer ? cert.issuer : "-"}{cert.name ? ` - ${cert.name}` : ""}
                </li>
              ))}
            </ul>
          </div>


          <div>
            <h2 className="text-xl font-semibold border-b mb-1 text-blue-700">Experience</h2>
            <p className="text-sm whitespace-pre-line max-h-48 overflow-y-auto break-words">
              {experience}
            </p>
          </div>

        </aside>

        {/* Right Column */}
        <section className="col-span-2 space-y-6">

          {/* Education */}
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


          {/* Projects */}
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

        </section>
      </div>
    </div>
  );
}
