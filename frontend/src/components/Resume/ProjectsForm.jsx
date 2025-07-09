import React, { useState } from 'react';

const ProjectsForm = ({ setResumeData }) => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({
    name: '',
    description: '',
    stack: '',
    live: '',
    github: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleAdd = () => {
    const updated = [...projects, { ...project, stack: project.stack.split(',').map(s => s.trim()) }];
    setProjects(updated);
    setResumeData(prev => ({ ...prev, projects: updated }));
    setProject({ name: '', description: '', stack: '', live: '', github: '' });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <h2 className="font-bold text-lg">Projects</h2>
      {['name', 'description', 'stack', 'live', 'github'].map(key => (
        <input
          key={key}
          name={key}
          value={project[key]}
          onChange={handleChange}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          className="w-full my-2 p-2 border rounded"
        />
      ))}
      <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-1 rounded">Add</button>
    </div>
  );
};

export default ProjectsForm;
