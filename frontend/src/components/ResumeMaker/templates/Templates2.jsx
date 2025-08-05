import React from "react";

export default function Template2({ data }) {
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
    <div className="flex font-sans text-sm text-gray-900">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-100 p-4 space-y-4">
        <h1 className="text-2xl font-bold">{name}</h1>
        <p>{email}</p>
        <p>{phone}</p>
        <p>{address}</p>

        <div>
          <h2 className="text-lg font-semibold border-b">Skills</h2>
          <ul className="list-disc pl-4">
            {skills.split(",").map((skill, index) => (
              <li key={index}>{skill.trim()}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold border-b">Experience</h2>
          <p>{experience}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold border-b">Education</h2>
          <ul className="list-disc pl-5">
            {education.map((edu, i) => (
              <li key={i}>{edu}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold border-b">Projects</h2>
          <ul className="list-disc pl-5">
            {projects.map((proj, i) => (
              <li key={i}>{proj}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold border-b">Certificates</h2>
          <ul className="list-disc pl-5">
            {certificates.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold border-b">Links</h2>
          <ul className="list-disc pl-5">
            {links.split(",").map((link, i) => (
              <li key={i}>
                <a href={link.trim()} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                  {link.trim()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
