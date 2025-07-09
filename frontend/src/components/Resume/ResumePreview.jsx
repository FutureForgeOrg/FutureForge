import React from 'react';

const ResumePreview = ({ resumeData }) => {
  const { personalInfo, skills, education, projects, experience } = resumeData;

  return (
    <div id="resume-preview" className="p-6 bg-white shadow-md rounded-lg space-y-6">
      <header className="text-center">
        <h1 className="text-3xl font-bold">{personalInfo.name || "Your Name"}</h1>
        <p>{personalInfo.email} | {personalInfo.phone}</p>
        <p><a href={personalInfo.linkedin}>LinkedIn</a> | <a href={personalInfo.github}>GitHub</a></p>
        <p>{personalInfo.location}</p>
      </header>

      <section>
        <h2 className="font-bold text-xl mb-2">Skills</h2>
        <p>{Object.values(skills).flat().join(', ')}</p>
      </section>

      <section>
        <h2 className="font-bold text-xl mb-2">Education</h2>
        {education.map((edu, idx) => (
          <div key={idx}>
            <p className="font-semibold">{edu.degree} – {edu.institute}</p>
            <p>{edu.duration || edu.year} | {edu.cgpa || edu.score}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="font-bold text-xl mb-2">Experience</h2>
        {experience.map((exp, idx) => (
          <div key={idx}>
            <p className="font-semibold">{exp.role} @ {exp.company}</p>
            <p>{exp.duration}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="font-bold text-xl mb-2">Projects</h2>
        {projects.map((proj, idx) => (
          <div key={idx}>
            <p className="font-semibold">{proj.name}</p>
            <p>{proj.description}</p>
            <p>Tech: {proj.stack?.join(', ')}</p>
            <a href={proj.live}>Live</a> | <a href={proj.github}>GitHub</a>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ResumePreview;
