import React from "react";

export default function Template4({ data }) {
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
    <div className="flex flex-col font-sans text-sm text-gray-900">
      {/* Header */}
      <div className="bg-gray-100 p-6 text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
        <div className="flex justify-center flex-wrap gap-3 text-gray-600 text-sm">
          <p>{email}</p>
          <span>|</span>
          <p>{phone}</p>
          <span>|</span>
          <p>{address}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col space-y-8 p-6">

        {/* Skills */}
        <section className="w-1/3">
          <h2 className="text-xl font-semibold border-b border-gray-400 pb-1">Skills</h2>
          <ul className="list-disc pl-5 pt-2 grid grid-cols-2 gap-y-1">
            {skills.split(",").map((skill, index) => (
              <li key={index}>{skill.trim()}</li>
            ))}
          </ul>
        </section>

        {/* Experience */}
        <section className="w-1/3">
          <h2 className="text-xl font-semibold border-b border-gray-400 pb-1">Experience</h2>
          <p className="pt-2 text-gray-700 leading-relaxed">{experience}</p>
        </section>

        {/* Education */}
        <section className="w-1/3">
          <h2 className="text-xl font-semibold border-b border-gray-400 pb-1">Education</h2>
          <ul className="list-disc pl-5 pt-2 space-y-1">
            {education.map((edu, i) => (
              <li key={i}>{edu}</li>
            ))}
          </ul>
        </section>

        {/* Projects */}
        <section className="w-1/3">
          <h2 className="text-xl font-semibold border-b border-gray-400 pb-1">Projects</h2>
          <ul className="list-disc pl-5 pt-2 space-y-2">
            {projects.map((proj, i) => (
              <li key={i} className="text-gray-800 font-medium">{proj}</li>
            ))}
          </ul>
        </section>

        {/* Certificates */}
        <section className="w-1/3">
          <h2 className="text-xl font-semibold border-b border-gray-400 pb-1">Certificates</h2>
          <ul className="list-disc pl-5 pt-2 space-y-1">
            {certificates.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </section>

        {/* Links */}
        <section className="w-1/3">
          <h2 className="text-xl font-semibold border-b border-gray-400 pb-1">Links</h2>
          <ul className="list-disc pl-5 pt-2 space-y-1">
            {links.split(",").map((link, i) => (
              <li key={i}>
                <a
                  href={link.trim()}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {link.trim()}
                </a>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
}
