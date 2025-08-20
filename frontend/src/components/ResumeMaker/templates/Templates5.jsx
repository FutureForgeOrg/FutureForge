import React from "react";

export default function TemplatesDark({ data }) {
  const { name, email, phone, address, skills, education, experience, projects, certificates, links } = data;

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 text-gray-200 font-sans border border-gray-700 rounded-lg">
      <header className="bg-gray-800 text-white py-4 px-6 text-center rounded-t-lg">
        <h1 className="text-2xl font-bold">{name}</h1>
        <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-300">
          <span>{email}</span>
          <span>{phone}</span>
          <span>{address}</span>
          {links.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 underline">
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6 p-6">
        <aside className="col-span-1 space-y-4">
          <div>
            <h2 className="text-blue-400 font-semibold">Skills</h2>
            <ul className="list-disc pl-5 text-sm">
              {skills.split(",").map((skill, i) => (
                <li key={i}>{skill.trim()}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-blue-400 font-semibold">Certificates</h2>
            <ul className="list-disc pl-5 text-sm">
              {certificates.map((cert, i) => (
                <li key={i}>{cert.issuer ? cert.issuer : "-"}{cert.name ? ` - ${cert.name}` : ""}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-blue-400 font-semibold">Experience</h2>
            <p className="text-sm whitespace-pre-line break-words text-gray-300">{experience}</p>
          </div>
        </aside>

        <section className="col-span-2 space-y-4">
          <div>
            <h2 className="text-blue-400 font-semibold">Education</h2>
            <ul className="list-disc pl-5 text-sm space-y-2">
              {education.map((edu, i) => (
                <li key={i}>
                  <div><strong>Degree:</strong> {edu.degree || "-"}</div>
                  <div><strong>Institution:</strong> {edu.institution || "-"}</div>
                  <div><strong>Year:</strong> {edu.year || "-"}</div>
                  <div><strong>Percentage:</strong> {edu.percentage || "-"}</div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-blue-400 font-semibold">Projects</h2>
            <ul className="list-disc pl-5 text-sm space-y-2">
              {projects.map((proj, i) => (
                <li key={i}>
                  <div className="font-semibold text-gray-100">{proj.name}</div>
                  <div className="text-gray-400">{proj.description}</div>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                      View
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
