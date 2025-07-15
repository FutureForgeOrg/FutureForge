// import React, { useState } from 'react';
// import { Download, Eye, Edit, Plus, X } from 'lucide-react';
// import html2pdf from 'html2pdf.js';
// // Form Component
// const ResumeForm = ({ formData, setFormData, onPreview }) => {
//   const handleInputChange = (section, field, value) => {
//   if (section) {
//     setFormData(prev => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: value
//       }
//     }));
//   } else {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   }
// };


//   const handleArrayChange = (section, index, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: prev[section].map((item, i) => 
//         i === index ? { ...item, [field]: value } : item
//       )
//     }));
//   };

//   const addArrayItem = (section, template) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: [...prev[section], { ...template }]
//     }));
//   };

//   const removeArrayItem = (section, index) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: prev[section].filter((_, i) => i !== index)
//     }));
//   };

//   const addSkill = () => {
//     if (formData.skills.length < 10) {
//       setFormData(prev => ({
//         ...prev,
//         skills: [...prev.skills, '']
//       }));
//     }
//   };

//   const removeSkill = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       skills: prev.skills.filter((_, i) => i !== index)
//     }));
//   };

//   const handleSkillChange = (index, value) => {
//     setFormData(prev => ({
//       ...prev,
//       skills: prev.skills.map((skill, i) => i === index ? value : skill)
//     }));
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Resume</h1>
//         <p className="text-gray-600">Fill in your details to generate a Modern resume</p>
//       </div>

//       <div className="space-y-8">
//         {/* Personal Information */}
//         <div className="bg-gray-50 p-6 rounded-lg">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">Personal Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
//               <input
//                 type="text"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={formData.personal.name}
//                 onChange={(e) => handleInputChange('personal', 'name', e.target.value)}
//                 placeholder="Enter your full name"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
//               <input
//                 type="tel"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={formData.personal.phone}
//                 onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
//                 placeholder="(212) 256-1414"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//               <input
//                 type="email"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={formData.personal.email}
//                 onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
//                 placeholder="your.email@gmail.com"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
//               <input
//                 type="url"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={formData.personal.linkedin}
//                 onChange={(e) => handleInputChange('personal', 'linkedin', e.target.value)}
//                 placeholder="linkedin.com/in/yourprofile"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Career Objective */}
//         <div className="bg-gray-50 p-6 rounded-lg">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">Career Objective</h2>
//           <textarea
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows="4"
//             value={formData.objective}
//             onChange={(e) => handleInputChange('', 'objective', e.target.value)}
//             placeholder="Write a brief career objective..."
//           />
//         </div>

//         {/* Education */}
//         <div className="bg-gray-50 p-6 rounded-lg">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold text-gray-800">Education</h2>
//             <button
//               onClick={() => addArrayItem('education', {
//                 degree: '',
//                 school: '',
//                 location: '',
//                 year: '',
//                 gpa: '',
//                 honors: ''
//               })}
//               className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//             >
//               <Plus size={16} />
//               Add Education
//             </button>
//           </div>
          
//           {formData.education.map((edu, index) => (
//             <div key={index} className="mb-6 p-4 bg-white rounded-lg border relative">
//               <button
//                 onClick={() => removeArrayItem('education', index)}
//                 className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//               >
//                 <X size={16} />
//               </button>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
//                   <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={edu.degree}
//                     onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
//                     placeholder="Bachelor of Arts"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">School</label>
//                   <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={edu.school}
//                     onChange={(e) => handleArrayChange('education', index, 'school', e.target.value)}
//                     placeholder="University Name"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
//                   <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={edu.location}
//                     onChange={(e) => handleArrayChange('education', index, 'location', e.target.value)}
//                     placeholder="City, State"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
//                   <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={edu.year}
//                     onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)}
//                     placeholder="May 2023"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">GPA (Optional)</label>
//                   <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={edu.gpa}
//                     onChange={(e) => handleArrayChange('education', index, 'gpa', e.target.value)}
//                     placeholder="3.6/4.0"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Honors (Optional)</label>
//                   <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={edu.honors}
//                     onChange={(e) => handleArrayChange('education', index, 'honors', e.target.value)}
//                     placeholder="cum laude"
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Professional Experience */}
//         <div className="bg-gray-50 p-6 rounded-lg">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold text-gray-800">Professional Experience</h2>
//             <button
//               onClick={() => addArrayItem('experience', {
//                 title: '',
//                 company: '',
//                 location: '',
//                 duration: '',
//                 responsibilities: ['']
//               })}
//               className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//             >
//               <Plus size={16} />
//               Add Experience
//             </button>
//           </div>
          
//           {formData.experience.map((exp, index) => (
//             <div key={index} className="mb-6 p-4 bg-white rounded-lg border relative">
//               <button
//                 onClick={() => removeArrayItem('experience', index)}
//                 className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//               >
//                 <X size={16} />
//               </button>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
//                   <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={exp.title}
//                     onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)}
//                     placeholder="Digital Marketing Specialist"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
//                   <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={exp.company}
//                     onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
//                     placeholder="Company Name"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
//                   <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={exp.location}
//                     onChange={(e) => handleArrayChange('experience', index, 'location', e.target.value)}
//                     placeholder="City, State"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
//                   <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={exp.duration}
//                     onChange={(e) => handleArrayChange('experience', index, 'duration', e.target.value)}
//                     placeholder="September 2023 - Present"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities</label>
//                 {exp.responsibilities.map((resp, respIndex) => (
//                   <div key={respIndex} className="flex gap-2 mb-2">
//                     <input
//                       type="text"
//                       className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={resp}
//                       onChange={(e) => {
//                         const newRespons = [...exp.responsibilities];
//                         newRespons[respIndex] = e.target.value;
//                         handleArrayChange('experience', index, 'responsibilities', newRespons);
//                       }}
//                       placeholder="Describe your responsibility..."
//                     />
//                     <button
//                       onClick={() => {
//                         const newRespons = exp.responsibilities.filter((_, i) => i !== respIndex);
//                         handleArrayChange('experience', index, 'responsibilities', newRespons);
//                       }}
//                       className="px-2 py-2 text-red-500 hover:text-red-700"
//                     >
//                       <X size={16} />
//                     </button>
//                   </div>
//                 ))}
//                 <button
//                   onClick={() => {
//                     const newRespons = [...exp.responsibilities, ''];
//                     handleArrayChange('experience', index, 'responsibilities', newRespons);
//                   }}
//                   className="text-blue-500 hover:text-blue-700 text-sm"
//                 >
//                   + Add Responsibility
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Skills */}
//         <div className="bg-gray-50 p-6 rounded-lg">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
//             <button
//               onClick={addSkill}
//               className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//             >
//               <Plus size={16} />
//               Add Skill
//             </button>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {formData.skills.map((skill, index) => (
//               <div key={index} className="flex gap-2">
//                 <input
//                   type="text"
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={skill}
//                   onChange={(e) => handleSkillChange(index, e.target.value)}
//                   placeholder="Enter a skill"
//                 />
//                 <button
//                   onClick={() => removeSkill(index)}
//                   className="px-2 py-2 text-red-500 hover:text-red-700"
//                 >
//                   <X size={16} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Preview Button */}
//         <div className="text-center">
//           <button
//             onClick={onPreview}
//             className="flex items-center gap-2 mx-auto px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-lg font-semibold"
//           >
//             <Eye size={20} />
//             Preview Resume
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Preview Component
// const ResumePreview = ({ formData, onEdit, onDownload }) => {
//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="mb-6 flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-900">Resume Preview</h2>
//         <div className="flex gap-3">
//           <button
//             onClick={onEdit}
//             className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
//           >
//             <Edit size={16} />
//             Edit
//           </button>
//           <button
//             onClick={onDownload}
//             className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
//           >
//             <Download size={16} />
//             Download
//           </button>
//         </div>
//       </div>

//       <div id="resume-content" className="bg-white border shadow-lg">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-2">
//           <div className="text-center">
//             <h1 className="text-3xl font-bold mb-0 uppercase tracking-wide">
//               {formData.personal.name || 'Your Name'}
//             </h1>
//             <p className="text-lg font-light">Modern Resume Format</p>
//           </div>
//         </div>

//         <div className="flex">
//           {/* Left Column */}
//           <div className="w-2/3 p-8">
//             {/* Career Objective */}
//             <div className="mb-8">
//               <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
//                 Career Objective
//               </h2>
//               <p className="text-gray-700 leading-relaxed">
//                 {formData.objective || 'Your career objective will appear here...'}
//               </p>
//             </div>

//             {/* Professional Experience */}
//             <div className="mb-8">
//               <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
//                 Professional Experience
//               </h2>
//               {formData.experience.map((exp, index) => (
//                 <div key={index} className="mb-6">
//                   <div className="mb-2">
//                     <p className="text-sm text-gray-600 mb-1">
//                       {exp.duration || 'Duration'} | {exp.company || 'Company'}, {exp.location || 'Location'}
//                     </p>
//                     <h3 className="font-bold text-gray-800 mt-6">
//                       {exp.title || 'Job Title'}
//                     </h3>
//                   </div>
//                   <ul className="list-disc list-inside text-gray-700 space-y-1">
//                     {exp.responsibilities.filter(resp => resp.trim()).map((resp, respIndex) => (
//                       <li key={respIndex} className="text-sm">{resp}</li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>

//             {/*skills */}
//              <div>
//               <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
//                 Relevant Skills
//               </h2>
//               <div className="space-y-2">
//                 {formData.skills.filter(skill => skill.trim()).map((skill, index) => (
//                   <div key={index} className="text-sm text-gray-700">
//                     {skill}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="w-1/3 bg-gray-50 p-8">
//             {/* Contact Info */}
//             <div className="mb-8">
//               <div className="space-y-3">
//                 {formData.personal.phone && (
//                   <div className="flex items-center gap-2">
//                     <span className="text-gray-600">📞</span>
//                     <span className="text-sm">{formData.personal.phone}</span>
//                   </div>
//                 )}
//                 {formData.personal.email && (
//                   <div className="flex items-center gap-2">
//                     <span className="text-gray-600">✉️</span>
//                     <span className="text-sm">{formData.personal.email}</span>
//                   </div>
//                 )}
//                 {formData.personal.linkedin && (
//                   <div className="flex items-center gap-2">
//                     <span className="text-gray-600">🔗</span>
//                     <span className="text-sm">{formData.personal.linkedin}</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Education */}
//             <div className="mb-8">
//               <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
//                 Education
//               </h2>
//               {formData.education.map((edu, index) => (
//                 <div key={index} className="mb-4">
//                   <p className="text-sm text-gray-600 mb-1">{edu.year || 'Year'}</p>
//                   <p className="font-medium text-gray-800">{edu.school || 'School'}</p>
//                   <p className="text-sm text-gray-700">{edu.location || 'Location'}</p>
//                   <p className="text-sm text-gray-700">{edu.degree || 'Degree'}</p>
//                   {edu.honors && (
//                     <p className="text-sm text-gray-700">Honors: {edu.honors}</p>
//                   )}
//                   {edu.gpa && (
//                     <p className="text-sm text-gray-700">(GPA: {edu.gpa})</p>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Skills */}
           
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main App Component
// const Modern = () => {
//   const [currentView, setCurrentView] = useState('form');
//   const [formData, setFormData] = useState({
//     personal: {
//       name: '',
//       phone: '',
//       email: '',
//       linkedin: ''
//     },
//     objective: '',
//     education: [{
//       degree: '',
//       school: '',
//       location: '',
//       year: '',
//       gpa: '',
//       honors: ''
//     }],
//     experience: [{
//       title: '',
//       company: '',
//       location: '',
//       duration: '',
//       responsibilities: ['']
//     }],
//     skills: ['']
//   });

//   const handlePreview = () => {
//     setCurrentView('preview');
//   };

//   const handleEdit = () => {
//     setCurrentView('form');
//   };

//   const handleDownload = () => {
//   const element = document.getElementById("resume-content");

//   const opt = {
//     margin:       0,
//     filename:     `${formData.personal.name || "resume"}.pdf`,
//     image:        { type: 'jpeg', quality: 0.98 },
//     html2canvas:  { scale: 2 },
//     jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
//   };

//   html2pdf().set(opt).from(element).save();
// };
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {currentView === 'form' ? (
//         <ResumeForm 
//           formData={formData} 
//           setFormData={setFormData} 
//           onPreview={handlePreview}
//         />
//       ) : (
//         <ResumePreview 
//           formData={formData} 
//           onEdit={handleEdit} 
//           onDownload={handleDownload}
//         />
//       )}
//     </div>
//   );
// };

// export default Modern;