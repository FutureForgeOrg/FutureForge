import React, { useState } from 'react';

const SkillsForm = ({ setResumeData }) => {
  const [skills, setSkills] = useState({
    languages: '',
    technologies: '',
    tools: '',
    versionControl: '',
    others: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...skills, [name]: value };
    setSkills(updated);

    // Save as array split by comma
    const parsed = {};
    Object.keys(updated).forEach(key => {
      parsed[key] = updated[key].split(',').map(item => item.trim());
    });

    setResumeData(prev => ({ ...prev, skills: parsed }));
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <h2 className="font-bold text-lg">Skills</h2>
      {Object.keys(skills).map((key) => (
        <input
          key={key}
          name={key}
          value={skills[key]}
          onChange={handleChange}
          placeholder={`${key} (comma-separated)`}
          className="w-full my-2 p-2 border rounded"
        />
      ))}
    </div>
  );
};

export default SkillsForm;
