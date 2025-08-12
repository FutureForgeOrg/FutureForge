// import React from "react";

// export default function Template4({ data }) {
//   const {
//     name,
//     email,
//     phone,
//     address,
//     skills,
//     education,
//     experience,
//     projects,
//     certificates,
//     links,
//   } = data;

//   return (
//     <div className="flex flex-col font-sans text-sm text-gray-900">
//       {/* Header */}
//       <div className="bg-gray-100 p-6 text-center space-y-2">
//         <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
//         <div className="flex justify-center flex-wrap gap-3 text-gray-600 text-sm">
//           <p>{email}</p>
//           <span>|</span>
//           <p>{phone}</p>
//           <span>|</span>
//           <p>{address}</p>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="flex flex-col space-y-8 p-6">

//         {/* Skills */}
//         <section className="w-1/3">
//           <h2 className="text-xl font-semibold border-b border-gray-400 pb-1">Skills</h2>
//           <ul className="list-disc pl-5 pt-2 grid grid-cols-2 gap-y-1">
//             {skills.split(",").map((skill, index) => (
//               <li key={index}>{skill.trim()}</li>
//             ))}
//           </ul>
//         </section>

//         {/* Experience */}
//         <section className="w-1/3">
//           <h2 className="text-xl font-semibold border-b border-gray-400 pb-1">Experience</h2>
//           <p className="pt-2 text-gray-700 leading-relaxed">{experience}</p>
//         </section>

//         {/* Education */}
//         <section className="w-1/3">
//           <h2 className="text-xl font-semibold border-b border-gray-400 pb-1">Education</h2>
//           <ul className="list-disc pl-5 pt-2 space-y-1">
//             {education.map((edu, i) => (
//               <li key={i}>{edu}</li>
//             ))}
//           </ul>
//         </section>

//         {/* Projects */}
//         <section className="w-1/3">
//           <h2 className="text-xl font-semibold border-b border-gray-400 pb-1">Projects</h2>
//           <ul className="list-disc pl-5 pt-2 space-y-2">
//             {projects.map((proj, i) => (
//               <li key={i} className="text-gray-800 font-medium">{proj}</li>
//             ))}
//           </ul>
//         </section>

//         {/* Certificates */}
//         <section className="w-1/3">
//           <h2 className="text-xl font-semibold border-b border-gray-400 pb-1">Certificates</h2>
//           <ul className="list-disc pl-5 pt-2 space-y-1">
//             {certificates.map((cert, i) => (
//               <li key={i}>{cert}</li>
//             ))}
//           </ul>
//         </section>

//         {/* Links */}
//         <section className="w-1/3">
//           <h2 className="text-xl font-semibold border-b border-gray-400 pb-1">Links</h2>
//           <ul className="list-disc pl-5 pt-2 space-y-1">
//             {links.split(",").map((link, i) => (
//               <li key={i}>
//                 <a
//                   href={link.trim()}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="text-blue-600 hover:underline"
//                 >
//                   {link.trim()}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </section>

//       </div>
//     </div>
//   );
// }


import React from "react";

export default function TemplatesTwoPanel({ data }) {
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
    <div className="max-w-6xl mx-auto bg-white text-gray-800 font-sans border shadow-lg rounded overflow-hidden">
      
      {/* Header */}
      <header className="bg-gray-800 text-white py-3 px-4 rounded-t mb-2">
        <h1 className="text-2xl font-bold">{name}</h1>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs mt-1">
          <span>{email}</span>
          <span>|</span>
          <span>{phone}</span>
          <span>|</span>
          <span>{address}</span>
          {links.map((link, i) => (
            <React.Fragment key={i}>
              <span>|</span>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline"
              >
                {link.label}
              </a>
            </React.Fragment>
          ))}
        </div>
      </header>

      {/* Two Panel Layout */}
      <div className="flex gap-4 p-4">
        
        {/* Left Panel - Projects Only */}
        <div className="w-1/2 space-y-2">
          <div>
            <h2 className="font-semibold border-b border-gray-300 text-blue-700 text-sm mb-2">Projects</h2>
            <div className="space-y-3">
              {projects.map((proj, i) => (
                <div key={i} className="bg-gray-50 p-3 rounded border-l-4 border-green-500">
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">{proj.name}</h3>
                  <p className="text-gray-600 text-xs leading-tight mb-2">{proj.description}</p>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-xs"
                    >
                      🔗 View Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - All Other Sections */}
        <div className="w-1/2 space-y-2 text-sm">
          
          {/* Skills */}
          <div>
            <h2 className="font-semibold border-b border-gray-300 text-blue-700 text-sm mb-2">Skills</h2>
            <div className="flex flex-wrap gap-1">
              {skills.split(",").map((skill, i) => (
                <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="font-semibold border-b border-gray-300 text-blue-700 text-sm mb-2">Experience</h2>
            <div className="bg-gray-50 p-3 rounded">
              <pre className="whitespace-pre-line break-words text-xs text-gray-700 font-sans">{experience}</pre>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="font-semibold border-b border-gray-300 text-blue-700 text-sm mb-2">Education</h2>
            <div className="space-y-2">
              {education.map((edu, i) => (
                <div key={i} className="bg-gray-50 p-2 rounded border-l-4 border-blue-500">
                  <div className="grid grid-cols-1 gap-1 text-xs">
                    <div><strong>Degree:</strong> {edu.degree || "-"}</div>
                    <div><strong>Institution:</strong> {edu.institution || "-"}</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div><strong>Year:</strong> {edu.year || "-"}</div>
                      <div><strong>Grade:</strong> {edu.percentage || "-"}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div>
            <h2 className="font-semibold border-b border-gray-300 text-blue-700 text-sm mb-2">Certificates</h2>
            <div className="space-y-1">
              {certificates.map((cert, i) => (
                <div key={i} className="flex items-center bg-gray-50 p-2 rounded border-l-4 border-yellow-500">
                  <span className="mr-2 text-sm">🏆</span>
                  <div className="text-xs">
                    <span className="font-medium text-gray-800">
                      {cert.name ? cert.name : "Certification"}
                    </span>
                    {cert.issuer && (
                      <span className="text-gray-600"> - {cert.issuer}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}