import React, { useState } from 'react';

const ExperienceForm = ({ setResumeData }) => {
  const [experience, setExperience] = useState([]);
  const [expInput, setExpInput] = useState({
    role: '',
    company: '',
    duration: '',
    description: '',
    techStack: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpInput({ ...expInput, [name]: value });
  };

  const handleAdd = () => {
    const updated = [...experience, {
      ...expInput,
      techStack: expInput.techStack.split(',').map(t => t.trim())
    }];
    setExperience(updated);
    setResumeData(prev => ({ ...prev, experience: updated }));
    setExpInput({ role: '', company: '', duration: '', description: '', techStack: '' });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <h2 className="font-bold text-lg">Experience</h2>
      {['role', 'company', 'duration', 'description', 'techStack'].map(key => (
        <input
          key={key}
          name={key}
          value={expInput[key]}
          onChange={handleChange}
          placeholder={`${key} ${key === 'techStack' ? '(comma-separated)' : ''}`}
          className="w-full my-2 p-2 border rounded"
        />
      ))}
      <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-1 rounded">Add</button>
    </div>
  );
};

export default ExperienceForm;
