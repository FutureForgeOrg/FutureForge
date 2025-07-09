import React, { useState } from 'react';

const EducationForm = ({ setResumeData }) => {
  const [education, setEducation] = useState([]);
  const [eduInput, setEduInput] = useState({
    degree: '',
    institute: '',
    duration: '',
    cgpa: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEduInput({ ...eduInput, [name]: value });
  };

  const handleAdd = () => {
    const updated = [...education, eduInput];
    setEducation(updated);
    setResumeData(prev => ({ ...prev, education: updated }));
    setEduInput({ degree: '', institute: '', duration: '', cgpa: '' });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <h2 className="font-bold text-lg">Education</h2>
      {['degree', 'institute', 'duration', 'cgpa'].map(key => (
        <input
          key={key}
          name={key}
          value={eduInput[key]}
          onChange={handleChange}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          className="w-full my-2 p-2 border rounded"
        />
      ))}
      <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-1 rounded">Add</button>
    </div>
  );
};

export default EducationForm;
