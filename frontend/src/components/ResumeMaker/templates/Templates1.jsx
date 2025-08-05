
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
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="mt-2">{email} | {phone}</p>
        <p>{address}</p>
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

          {/* Links */}
          <div>
            <h2 className="text-lg font-semibold border-b mb-1 text-blue-700">Links</h2>
            <ul className="list-disc pl-5 text-sm">
              {links.split(',').map((link, i) => (
                <li key={i}>
                  <a href={link.trim()} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                    {link.trim()}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Certificates */}
          <div>
            <h2 className="text-lg font-semibold border-b mb-1 text-blue-700">Certificates</h2>
            <ul className="list-disc pl-5 text-sm">
              {certificates.map((cert, i) => (
                <li key={i}>{cert}</li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Right Column */}
        <section className="col-span-2 space-y-6">
          {/* Experience */}
          <div>
            <h2 className="text-xl font-semibold border-b mb-1 text-blue-700">Experience</h2>
            <p className="text-sm whitespace-pre-line">{experience}</p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xl font-semibold border-b mb-1 text-blue-700">Education</h2>
            <ul className="list-disc pl-5 text-sm">
              {education.map((edu, i) => (
                <li key={i}>{edu}</li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xl font-semibold border-b mb-1 text-blue-700">Projects</h2>
            <ul className="list-disc pl-5 text-sm">
              {projects.map((proj, i) => (
                <li key={i}>{proj}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
