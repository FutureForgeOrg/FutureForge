import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../lib/axios';
import { Plus, SquareArrowUpRight, Monitor, Flame } from 'lucide-react';
import GridBackground from '../../components/ui/GridBackground';
import Navbar from '../../components/Navbar';
import BackgroundWrapper from '../../components/ui/BackgroundWrapper';
// import useProfileStore from '../../store/useProfileStore';
import { useProfileQuery } from '../../hooks/useProfile';

// const themeImages = import.meta.glob('/src/assets/themes/*.webp', {
//   eager: true,
//   import: 'default',
// });


const Portfolio = () => {
  const { data: profile, isLoading } = useProfileQuery();

  const [previous, setPrevious] = useState([]);
  const [step, setStep] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [deployedUrl, setDeployedUrl] = useState('');
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    theme: 'modern', // default theme
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

  // const { profile } = useProfileStore();

  useEffect(() => {
    axiosInstance.get('/portfolio/all')
      .then(res => setPrevious(res.data.portfolios || []))
      .catch(() => toast.error("Failed to load previous portfolios"));
  }, []);

  useEffect(() => {
    if (step === "form") {
      try {
        if (profile) {
          setForm(prev => ({
            ...prev,
            name: profile.name || "",
            title: profile.title || "",
            about: profile.about || "",
            skills: profile.skills?.length ? profile.skills : [""],
            experience: profile.experience?.length
              ? profile.experience
              : [{ role: "", company: "", duration: "", description: "" }],
            projects: profile.projects?.length
              ? profile.projects
              : [{ title: "", description: "", link: "" }],
            education: profile.education?.length
              ? profile.education
              : [{ degree: "", institution: "", year: "" }],
            social: profile.social?.length
              ? profile.social
              : [{ platform: "", link: "" }]
          }));
        }
      } catch (error) {
          toast.error("Failed to load profile details : ",error.message());
      }
    }
  },[step])

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
    <BackgroundWrapper>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 pt-14">
        <div className='mt-6'>
          {step === 'dashboard' && (
            <>
              {/* Fixed top bar with button */}
              <div className="sticky top-0 z-10 backdrop-blur-md bg-white/10 border-b border-gray-200 py-4 px-4 flex justify-between items-center mb-6 shadow-sm">
                <h1 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                  📜 Your Portfolios
                </h1>

                <button
                  onClick={() => setStep('form')}
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 transition-all duration-200"
                >
                  <span className="text-lg hover:animate-spin"><Plus /></span>
                  <span className="hidden sm:inline">Create New Portfolio</span>
                </button>
              </div>

              {previous.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {previous.map((p, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-4 shadow-md border hover:scale-[1.02] transition-transform duration-300 
                      backdrop-blur-md dark:bg-gray-800 bg-white/50 dark:border-gray-700 border-gray-200"
                      style={{
                        background: `linear-gradient(135deg, hsl(${i * 40}, 70%, 80%), hsl(${i * 40 + 60}, 70%, 60%))`,
                        onhover: { transform: 'scale(2.05)' },
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <div className="text-gray-900 font-semibold break-words">{p.deployedUrl}</div>
                      <a
                        href={p.deployedUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-block bg-white text-indigo-600 hover:text-indigo-800 px-3 py-1 rounded text-sm font-medium"
                      >
                        <div className='flex items-center justify-center gap-2'>
                          <SquareArrowUpRight className="w-4 h-4" />
                          <span>View Portfolio</span>
                        </div>

                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 mt-6">No previous deployments.</p>
              )}
            </>
          )}


          {step === 'form' && (
            <>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
                <h2 className="text-xl md:text-4xl font-bold mb-4 text-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">Create Your Portfolio</h2>
                <label className="block mb-6 mt-4 text-center text-md sm:text-2xl font-medium text-white">Select Theme</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                  {[
                    'modern', 'classic', 'glass', 'darkcard',
                    'neobrutal', 'pastel', 'resume', 'terminal',
                    'neon', 'retro', 'space', 'funky'
                  ].map((themeKey) => (
                    <div
                      key={themeKey}
                      onClick={() => setForm((prev) => ({ ...prev, theme: themeKey }))}
                      className={`cursor-pointer border p-4 rounded-xl text-center shadow-md transition-all 
                        duration-300 backdrop-blur-sm hover:scale-105
                      ${form.theme === themeKey
                          ? 'bg-gradient-to-br from-green-700 to-blue-700 text-white border-white'
                          : 'bg-white/10 hover:bg-purple-400 dark:hover:bg-white/20'
                        }
                      `}
                    >
                      <img
                        src={`/themes/${themeKey}.webp`}
                        alt={themeKey}
                        className="w-full h-24 object-cover rounded-md mb-2"
                      />
                      <span className="text-sm text-white">
                        {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>


                <input name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 rounded-md border border-white/20 bg-gray-800/90 backdrop-blur-sm text-white placeholder-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                  placeholder="Username"
                />
                {errors.name && <p className="text-red-500 text-sm ">{errors.name}</p>}

                <input name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 rounded-md border border-white/20 bg-gray-800/90 backdrop-blur-sm text-white placeholder-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                  placeholder="Title"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

                <textarea name="about"
                  value={form.about}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 rounded-md border border-white/20 bg-gray-800/90 backdrop-blur-sm text-white placeholder-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                  placeholder="About"
                />
                {errors.about && <p className="text-red-500 text-sm">{errors.about}</p>}

                <input
                  className="w-full px-4 py-2 mt-2 rounded-md border border-white/20 bg-gray-800/90 backdrop-blur-sm text-white placeholder-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                  placeholder="Skills (comma separated) eg. JavaScript, React, Node.js"
                  value={form.skills.join(', ')}
                  onChange={(e) => setForm(prev => ({ ...prev, skills: e.target.value.split(',').map(s => s.trim()) }))}
                />
                {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}

                {/* Projects Section */}
                <div className="flex items-center gap-4 my-8">
                  <div className="flex-1 border-t border-white/40" />
                  <h3 className="text-white text-xl font-semibold whitespace-nowrap">Projects</h3>
                  <div className="flex-1 border-t border-white/40" />
                </div>
                {form.projects.map((proj, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2 items-center">
                    <input placeholder="Title" value={proj.title} onChange={(e) => handleArrayChange('projects', i, 'title', e.target.value)} className="w-full px-4 py-2 mt-2 rounded-md border border-white/20 bg-gray-800/90 backdrop-blur-sm text-white placeholder-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
                    <input placeholder="Description" value={proj.description} onChange={(e) => handleArrayChange('projects', i, 'description', e.target.value)} className="w-full px-4 py-2 mt-2 rounded-md border border-white/20 bg-gray-800/90 backdrop-blur-sm text-white placeholder-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
                    <div className="flex gap-2">
                      <input placeholder="Link" value={proj.link} onChange={(e) => handleArrayChange('projects', i, 'link', e.target.value)} className="w-full px-4 py-2 mt-2 rounded-md border border-white/20 bg-gray-800/90 backdrop-blur-sm text-white placeholder-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition flex-1" />
                      {form.projects.length > 1 && (
                        <button onClick={() => removeField('projects', i)} className=" font-extrabold text-red-500">✕</button>
                      )}
                    </div>
                  </div>
                ))}

                <button onClick={() => addField('projects', { title: '', description: '', link: '' })} className="text-green-200 ml-2 text-sm mb-2">+ Add Project</button>

                {/* Education Section */}
                <div className="flex items-center gap-4 my-8">
                  <div className="flex-1 border-t border-white/40" />
                  <h3 className="text-white text-xl font-semibold whitespace-nowrap">Education</h3>
                  <div className="flex-1 border-t border-white/40" />
                </div>
                {form.education.map((edu, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2 items-center">
                    <input placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayChange('education', i, 'degree', e.target.value)} className="w-full px-4 py-2 mt-2 rounded-md border border-white/20 bg-gray-800/90 backdrop-blur-sm text-white placeholder-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
                    <input placeholder="Institution" value={edu.institution} onChange={(e) => handleArrayChange('education', i, 'institution', e.target.value)} className="w-full px-4 py-2 mt-2 rounded-md border border-white/20 bg-gray-800/90 backdrop-blur-sm text-white placeholder-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
                    <div className="flex gap-2">
                      <input placeholder="Year" value={edu.year} onChange={(e) => handleArrayChange('education', i, 'year', e.target.value)} className="w-full px-4 py-2 mt-2 rounded-md border border-white/20 bg-gray-800/90 backdrop-blur-sm text-white placeholder-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition flex-1" />
                      {form.education.length > 1 && (
                        <button onClick={() => removeField('education', i)} className=" font-extrabold text-red-500">✕</button>
                      )}
                    </div>
                  </div>
                ))}

                <button onClick={() => addField('education', { degree: '', institution: '', year: '' })} className="text-green-200 ml-2 text-sm mb-2">+ Add Education</button>

                {/* Social/Contact Section */}
                <div className="flex items-center gap-4 my-8">
                  <div className="flex-1 border-t border-white/40" />
                  <h3 className="text-white text-xl font-semibold whitespace-nowrap">Socials</h3>
                  <div className="flex-1 border-t border-white/40" />
                </div>
                {form.social.map((s, i) => (
                  <div key={i} className="grid grid-cols-2 gap-2 mb-2 items-center">
                    <input placeholder="Platform" value={s.platform} onChange={(e) => handleArrayChange('social', i, 'platform', e.target.value)} className="w-full px-4 py-2 mt-2 rounded-md border border-white/20 bg-gray-800/90 backdrop-blur-sm text-white placeholder-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
                    <div className="flex gap-2">
                      <input placeholder="Link" value={s.link} onChange={(e) => handleArrayChange('social', i, 'link', e.target.value)} className="w-full px-4 py-2 mt-2 rounded-md border border-white/20 bg-gray-800/90 backdrop-blur-sm text-white placeholder-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition flex-1" />
                      {form.social.length > 1 && (
                        <button onClick={() => removeField('social', i)} className="font-extrabold text-red-500">✕</button>
                      )}
                    </div>
                  </div>
                ))}

                <button onClick={() => addField('social', { platform: '', link: '' })} className="text-green-200 ml-2 text-sm mb-4">+ Add Social</button>

                {/* Optional Experience Section */}
                <div className="flex items-center gap-4 my-8">
                  <div className="flex-1 border-t border-white/40" />
                  <h3 className="text-white text-xl font-semibold whitespace-nowrap">Experience (optional)</h3>
                  <div className="flex-1 border-t border-white/40" />
                </div>
                {form.experience.map((exp, i) => (
                  <div key={i} className="grid grid-cols-2 gap-2 mb-2">
                    <input placeholder="Role" value={exp.role} onChange={(e) => handleArrayChange('experience', i, 'role', e.target.value)} className="w-full px-4 py-2 mt-2 rounded-md border border-white/20 bg-gray-800/90 backdrop-blur-sm text-white placeholder-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
                    <input placeholder="Company" value={exp.company} onChange={(e) => handleArrayChange('experience', i, 'company', e.target.value)} className="w-full px-4 py-2 mt-2 rounded-md border border-white/20 bg-gray-800/90 backdrop-blur-sm text-white placeholder-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
                    <input placeholder="Duration" value={exp.duration} onChange={(e) => handleArrayChange('experience', i, 'duration', e.target.value)} className="w-full px-4 py-2 mt-2 rounded-md border border-white/20 bg-gray-800/90 backdrop-blur-sm text-white placeholder-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition col-span-2" />
                    <div className="flex gap-2 col-span-2">
                      <textarea placeholder="Description" value={exp.description} onChange={(e) => handleArrayChange('experience', i, 'description', e.target.value)} className="w-full px-4 py-2 mt-2 rounded-md border border-white/20 bg-gray-800/90 backdrop-blur-sm text-white placeholder-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition flex-1" />
                      <button onClick={() => removeField('experience', i)} className="font-extrabold text-red-500">✕</button>
                    </div>
                  </div>
                ))}

                <button onClick={() => addField('experience', { role: '', company: '', duration: '', description: '' })} className="text-green-200 ml-2 text-sm mb-4">+ Add Experience</button>

                <div className="mt-6 flex justify-between items-center">
                  <button onClick={() => setStep('dashboard')} className="text-black rounded-md text-md font-semibold bg-red-600 px-4 py-2">← Back</button>
                  <button onClick={handleGenerate} className="font-semibold bg-gradient-to-t from-purple-500 via-pink-500 to-red-500 text-clip px-4 py-2 rounded">
                    {loading ? "Generating..." : "Preview Portfolio"}
                  </button>
                </div>
              </div>
            </>
          )}

          {step === 'preview' && (
            <>
              <div className="bg-white/10 backdrop-blur-md p-6 md:p-10 rounded-xl shadow-xl max-w-5xl mx-auto">
                <div className='mb-10'>
                  <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center 
                  bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                    Portfolio Ready
                  </h2>
                </div>
                <div className='flex flex-col items-center'>


                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4 items-center">
                    <button
                      onClick={() => window.open(previewUrl, "_blank")}
                      className="bg-green-600 text-white px-5 md:px-7 py-2 rounded">
                      <span className="flex items-center gap-2">
                        <Monitor className="" />
                        View Preview
                      </span>
                    </button>
                    <button
                      onClick={handleDeploy}
                      className="bg-indigo-600 text-white px-5 md:px-7 py-2 rounded"
                      disabled={loading}
                    >
                      <span className="flex items-center gap-2">
                        <Flame className="" />
                        {loading ? "Deploying..." : "Deploy Portfolio"}
                      </span>
                    </button>
                  </div>
                  {deployedUrl && (
                    <div className="mt-4 text-[16px] text-center">
                      <p className="text-green-500">Deployed URL</p>
                      <a href={deployedUrl} target="_blank" rel="noreferrer" className="text-blue-200 underline ">{deployedUrl}</a>
                      <p className='text-green-400'>Note : open after 2-3 seconds if throw any error </p>
                    </div>
                  )}
                </div>

                <button onClick={() => setStep('dashboard')} className="text-white mt-4">← Back to Dashboard</button>
              </div>
            </>
          )}
        </div>
      </div>

    </BackgroundWrapper>
  );
};

export default Portfolio;
