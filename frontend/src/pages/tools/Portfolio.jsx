import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../lib/axios';

const Portfolio = () => {
  const [previous, setPrevious] = useState([]);
  const [step, setStep] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [deployedUrl, setDeployedUrl] = useState('');
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: '', // display name
    deployUsername: '', // for backend/URL
    title: '',
    about: '',
    skills: [''],
    experience: [],
    projects: [{ title: '', description: '', link: '' }],
    education: [{ degree: '', institution: '', year: '' }],
    social: [{ platform: '', link: '' }]
  });

  useEffect(() => {
    axiosInstance.get('/portfolio/all')
      .then(res => setPrevious(res.data.portfolios || []))
      .catch(() => toast.error("Failed to load previous portfolios"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: value.trim() ? null : `${name} is required.` }));
  };

  const handleArrayChange = (type, index, field, value) => {
    const updated = [...form[type]];
    updated[index][field] = value;
    setForm(prev => ({ ...prev, [type]: updated }));
    const errorKey = `${type}-${index}-${field}`;
    setErrors(prev => ({ ...prev, [errorKey]: value.trim() ? null : `${field} is required.` }));
  };

  const addField = (type, template) => {
    setForm(prev => ({ ...prev, [type]: [...prev[type], template] }));
  };

  const removeField = (type, index) => {
    const updated = [...form[type]];
    updated.splice(index, 1);
    setForm(prev => ({ ...prev, [type]: updated }));
  };

  const validateAll = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.about.trim()) newErrors.about = 'About is required';

    if (!Array.isArray(form.skills) || form.skills.length === 0 || !form.skills[0].trim()) {
      newErrors.skills = 'At least one skill is required';
    }

    form.projects.forEach((p, i) => {
      if (!p.title.trim()) newErrors[`projects-${i}-title`] = 'Title required';
      if (!p.description.trim()) newErrors[`projects-${i}-description`] = 'Description required';
      if (!p.link.trim()) newErrors[`projects-${i}-link`] = 'Link required';
    });

    form.education.forEach((e, i) => {
      if (!e.degree.trim()) newErrors[`education-${i}-degree`] = 'Degree required';
      if (!e.institution.trim()) newErrors[`education-${i}-institution`] = 'Institution required';
      if (!e.year.trim()) newErrors[`education-${i}-year`] = 'Year required';
    });

    form.social.forEach((s, i) => {
      if (!s.platform.trim()) newErrors[`social-${i}-platform`] = 'Platform required';
      if (!s.link.trim()) newErrors[`social-${i}-link`] = 'Link required';
    });

    form.experience.forEach((exp, i) => {
      if (!exp.role?.trim()) newErrors[`experience-${i}-role`] = 'Role required';
      if (!exp.company?.trim()) newErrors[`experience-${i}-company`] = 'Company required';
      if (!exp.duration?.trim()) newErrors[`experience-${i}-duration`] = 'Duration required';
      if (!exp.description?.trim()) newErrors[`experience-${i}-description`] = 'Description required';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = async () => {
    if (!validateAll()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setLoading(true);
    try {
      // Generate unique deploy username
      const deployUsername = `${form.name.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 5)}`;
      console.log("Deploy Username:", deployUsername);

      // Use payload with deployUsername for backend, but keep form.name as display name
      const payload = { ...form, deployUsername };

      const res = await axiosInstance.post('/portfolio/generate', payload);
      setPreviewUrl(res.data.previewUrl);
      setForm(prev => ({ ...prev, deployUsername })); // Save for deploy step
      setStep('preview');
      toast.success("Portfolio generated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDeploy = async () => {
    setLoading(true);
    try {
      if (!form.deployUsername) {
        toast.error("Username is required for deployment");
        return;
      }

      const res = await axiosInstance.post('/portfolio/deploy', { username: form.deployUsername });
      setDeployedUrl(res.data.deployedUrl);
      toast.success("Portfolio deployed successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Deployment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {step === 'dashboard' && (
        <>
          <h1 className="text-2xl font-bold mb-4">📜 Your Previous Portfolios</h1>
          {previous.length > 0 ? (
            <ul className="space-y-2 mb-4">
              {previous.map((p, i) => (
                <li key={i} className="border p-2 rounded flex justify-between">
                  <span>{p.deployedUrl}</span>
                  <a href={p.deployedUrl} target="_blank" rel="noreferrer" className="text-indigo-600 underline">View</a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No previous deployments.</p>
          )}
          <button onClick={() => setStep('form')} className="bg-indigo-600 text-white px-4 py-2 rounded mt-4">
            ➕ Create New Portfolio
          </button>
        </>
      )}

      {step === 'form' && (
        <>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border p-2 mt-2" placeholder="username - (enter new or diffrent username for new deploy link of your portfolio)" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input name="title" value={form.title} onChange={handleChange} className="w-full border p-2 mt-2" placeholder="Title" />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

          <textarea name="about" value={form.about} onChange={handleChange} className="w-full border p-2 mt-2" placeholder="About" />
          {errors.about && <p className="text-red-500 text-sm">{errors.about}</p>}

          <input
            className="w-full border p-2 mt-2"
            placeholder="Skills (comma separated) eg. JavaScript, React, Node.js"
            value={form.skills.join(', ')}
            onChange={(e) => setForm(prev => ({ ...prev, skills: e.target.value.split(',').map(s => s.trim()) }))}
          />
          {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}

          {/* Projects Section */}
          <h3 className="font-semibold mt-4">Projects</h3>
          {form.projects.map((proj, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2 items-center">
              <input placeholder="Title" value={proj.title} onChange={(e) => handleArrayChange('projects', i, 'title', e.target.value)} className="border p-2" />
              <input placeholder="Description" value={proj.description} onChange={(e) => handleArrayChange('projects', i, 'description', e.target.value)} className="border p-2" />
              <div className="flex gap-2">
                <input placeholder="Link" value={proj.link} onChange={(e) => handleArrayChange('projects', i, 'link', e.target.value)} className="border p-2 flex-1" />
                {form.projects.length > 1 && (
                  <button onClick={() => removeField('projects', i)} className="text-red-500">✕</button>
                )}
              </div>
            </div>
          ))}

          <button onClick={() => addField('projects', { title: '', description: '', link: '' })} className="text-blue-600 text-sm mb-2">+ Add Project</button>

          {/* Education Section */}
          <h3 className="font-semibold mt-4">Education</h3>
          {form.education.map((edu, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2 items-center">
              <input placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayChange('education', i, 'degree', e.target.value)} className="border p-2" />
              <input placeholder="Institution" value={edu.institution} onChange={(e) => handleArrayChange('education', i, 'institution', e.target.value)} className="border p-2" />
              <div className="flex gap-2">
                <input placeholder="Year" value={edu.year} onChange={(e) => handleArrayChange('education', i, 'year', e.target.value)} className="border p-2 flex-1" />
                {form.education.length > 1 && (
                  <button onClick={() => removeField('education', i)} className="text-red-500">✕</button>
                )}
              </div>
            </div>
          ))}

          <button onClick={() => addField('education', { degree: '', institution: '', year: '' })} className="text-blue-600 text-sm mb-2">+ Add Education</button>

          {/* Social/Contact Section */}
          <h3 className="font-semibold mt-4">Social Links</h3>
          {form.social.map((s, i) => (
            <div key={i} className="grid grid-cols-2 gap-2 mb-2 items-center">
              <input placeholder="Platform" value={s.platform} onChange={(e) => handleArrayChange('social', i, 'platform', e.target.value)} className="border p-2" />
              <div className="flex gap-2">
                <input placeholder="Link" value={s.link} onChange={(e) => handleArrayChange('social', i, 'link', e.target.value)} className="border p-2 flex-1" />
                {form.social.length > 1 && (
                  <button onClick={() => removeField('social', i)} className="text-red-500">✕</button>
                )}
              </div>
            </div>
          ))}

          <button onClick={() => addField('social', { platform: '', link: '' })} className="text-blue-600 text-sm mb-4">+ Add Social</button>

          {/* Optional Experience Section */}
          <h3 className="font-semibold mt-4">Experience (Optional)</h3>
          {form.experience.map((exp, i) => (
            <div key={i} className="grid grid-cols-2 gap-2 mb-2">
              <input placeholder="Role" value={exp.role} onChange={(e) => handleArrayChange('experience', i, 'role', e.target.value)} className="border p-2" />
              <input placeholder="Company" value={exp.company} onChange={(e) => handleArrayChange('experience', i, 'company', e.target.value)} className="border p-2" />
              <input placeholder="Duration" value={exp.duration} onChange={(e) => handleArrayChange('experience', i, 'duration', e.target.value)} className="border p-2 col-span-2" />
              <div className="flex gap-2 col-span-2">
                <textarea placeholder="Description" value={exp.description} onChange={(e) => handleArrayChange('experience', i, 'description', e.target.value)} className="border p-2 flex-1" />
                <button onClick={() => removeField('experience', i)} className="text-red-500">✕</button>
              </div>
            </div>
          ))}

          <button onClick={() => addField('experience', { role: '', company: '', duration: '', description: '' })} className="text-blue-600 text-sm mb-4">+ Add Experience</button>

          <div className="mt-6 flex justify-between items-center">
            <button onClick={() => setStep('dashboard')} className="text-gray-600">← Back</button>
            <button onClick={handleGenerate} className="bg-blue-600 text-white px-4 py-2 rounded">
              {loading ? "Generating..." : "Preview Portfolio"}
            </button>
          </div>
        </>
      )}

      {step === 'preview' && (
        <>
          <h2 className="text-xl font-bold mb-4">🎉 Portfolio Ready</h2>
          <div className="flex gap-4">
            <button onClick={() => window.open(previewUrl, "_blank")} className="bg-green-600 text-white px-4 py-2 rounded">🔍 Preview</button>
            <button onClick={handleDeploy} className="bg-indigo-600 text-white px-4 py-2 rounded" disabled={loading}>
              {loading ? "Deploying..." : "🚀 Deploy"}
            </button>
          </div>
          {deployedUrl && (
            <div className="mt-4">
              <p className="text-green-600">✅ Deployed URL:</p>
              <a href={deployedUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">{deployedUrl}</a>
              <p>Note : open after 2-3 seconds if throw any error </p>
            </div>
          )}

          <button onClick={() => setStep('dashboard')} className="text-gray-600 mt-4">← Back to Dashboard</button>
        </>
      )}
    </div>
  );
};

export default Portfolio;
