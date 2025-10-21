// import React from "react";

// export default function Template2({ data }) {
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
//     <div className="flex font-sans text-sm text-gray-900">
//       {/* Sidebar */}
//       <div className="w-1/3 bg-gray-100 p-4 space-y-4">
//         <h1 className="text-2xl font-bold">{name}</h1>
//         <p>{email}</p>
//         <p>{phone}</p>
//         <p>{address}</p>

//         <div>
//           <h2 className="text-lg font-semibold border-b">Skills</h2>
//           <ul className="list-disc pl-4">
//             {skills.split(",").map((skill, index) => (
//               <li key={index}>{skill.trim()}</li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="w-2/3 p-6 space-y-6">
//         <div>
//           <h2 className="text-xl font-semibold border-b">Experience</h2>
//           <p>{experience}</p>
//         </div>

//         <div>
//           <h2 className="text-xl font-semibold border-b">Education</h2>
//           <ul className="list-disc pl-5">
//             {education.map((edu, i) => (
//               <li key={i}>{edu}</li>
//             ))}
//           </ul>
//         </div>

//         <div>
//           <h2 className="text-xl font-semibold border-b">Projects</h2>
//           <ul className="list-disc pl-5">
//             {projects.map((proj, i) => (
//               <li key={i}>{proj}</li>
//             ))}
//           </ul>
//         </div>

//         <div>
//           <h2 className="text-xl font-semibold border-b">Certificates</h2>
//           <ul className="list-disc pl-5">
//             {certificates.map((cert, i) => (
//               <li key={i}>{cert}</li>
//             ))}
//           </ul>
//         </div>

//         <div>
//           <h2 className="text-xl font-semibold border-b">Links</h2>
//           <ul className="list-disc pl-5">
//             {links.split(",").map((link, i) => (
//               <li key={i}>
//                 <a href={link.trim()} target="_blank" rel="noreferrer" className="text-blue-600 underline">
//                   {link.trim()}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from "react";

export default function TemplatesCompact({ data }) {
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
    <div className="max-w-4xl mx-auto bg-white text-gray-800 font-sans border shadow-lg rounded p-4">

      {/* Header */}
      <header className="bg-gray-800 text-white py-3 px-4 rounded mb-2">
        <h1 className="text-2xl font-bold">{name}</h1>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs mt-1">
          {[
            email && <span key="email">{email}</span>,
            phone && <span key="phone">{phone}</span>,
            address && <span key="address">{address}</span>,
            ...(links?.filter(l => l.label && l.url).map((link, i) => (
              <a
                key={`link-${i}`}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline"
              >
                {link.label}
              </a>
            )) || []),
          ]
            .filter(Boolean) // remove any falsy (empty) items
            .map((item, i, arr) => (
              <React.Fragment key={i}>
                {item}
                {i < arr.length - 1 && <span className="mx-2">|</span>} {/* add dash only between */}
              </React.Fragment>
            ))}
        </div>
      </header>

      {/* All sections in one column */}
      <div className="space-y-2 text-sm">

        {/* Skills */}
        <div>
          <h2 className="font-semibold border-b border-gray-300 text-blue-700 text-sm">Skills</h2>
          <ul className="list-disc pl-4 flex flex-wrap gap-x-4 gap-y-1">
            {skills.split(",").map((skill, i) => (
              <li key={i}>{skill.trim()}</li>
            ))}
          </ul>
        </div>

        {/* Certificates */}
        <div>
          <h2 className="font-semibold border-b border-gray-300 text-blue-700 text-sm">Certificates</h2>
          <ul className="list-disc pl-4">
            {certificates.map((cert, i) => (
              <li key={i}>
                {cert.issuer ? cert.issuer : "-"}{cert.name ? ` - ${cert.name}` : ""}
              </li>
            ))}
          </ul>
        </div>

        {/* Experience */}
        <div>
          <h2 className="font-semibold border-b border-gray-300 text-blue-700 text-sm">Experience</h2>
          <p className="whitespace-pre-line break-words">{experience}</p>
        </div>

        {/* Education */}
        <div>
          <h2 className="font-semibold border-b border-gray-300 text-blue-700 text-sm">Education</h2>
          <ul className="list-disc pl-4 space-y-1">
            {education.map((edu, i) => (
              <li key={i}>
                <div className="flex gap-4">
                  <div className="flex-1"><strong>Degree:</strong> {edu.degree || "-"}</div>
                  <div className="flex-1"><strong>Institution:</strong> {edu.institution || "-"}</div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1"><strong>Year:</strong> {edu.year || "-"}</div>
                  <div className="flex-1"><strong>Percentage:</strong> {edu.percentage || "-"}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div>
          <h2 className="font-semibold border-b border-gray-300 text-blue-700 text-sm">Projects</h2>
          <ul className="list-disc pl-4 space-y-1">
            {projects.map((proj, i) => (
              <li key={i}>
                <div className="font-semibold">{proj.name}</div>
                <div className="text-gray-600">{proj.description}</div>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    🔗 View
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
