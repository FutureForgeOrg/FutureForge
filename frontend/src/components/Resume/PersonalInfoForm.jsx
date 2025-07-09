import React, { useState } from 'react';

const PersonalInfoForm = ({ setResumeData }) => {
  const [info, setInfo] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...info, [name]: value };
    setInfo(updated);
    setResumeData(prev => ({ ...prev, personalInfo: updated }));
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <h2 className="font-bold text-lg">Personal Info</h2>
      {Object.keys(info).map((key) => (
        <input
          key={key}
          name={key}
          value={info[key]}
          onChange={handleChange}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          className="w-full my-2 p-2 border border-gray-300 rounded"
        />
      ))}
    </div>
  );
};

export default PersonalInfoForm;
