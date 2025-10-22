import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

export default function Template6({ data }) {
    const {
        name, email, phone, address, experience, projects, skills, certificates, education, links
    } = data;

    return (
        <div className="max-w-3xl mx-auto bg-white text-gray-900 font-sans border rounded shadow-md">

            {/* Header */}
            <header className="text-center py-6 border-b">
                <h1 className="text-3xl font-bold mb-2">{name}</h1>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700">
                    {email && <div className="flex items-center gap-1"> <Mail size={16} className="pt-0.5" /><span key="email">{email}</span></div>}
                    {phone && <div className="flex items-center gap-1"> <Phone size={16} className="pt-0.5" /><span key="phone">{phone}</span></div>}
                    {address && <div className="flex items-center gap-1"> <MapPin size={16} className="" /><span key="address">{address}</span></div>}
                    {Array.isArray(links) && links.filter(l => l.label && l.url).map((link, i) => (
                        <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="underline text-blue-600 hover:text-blue-800"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </header>

            <main className="p-6 space-y-6">

                {/* Education */}
                {Array.isArray(education) && education.some(e => e.degree || e.institution) && (
                    <section>
                        <h2 className="text-xl font-semibold border-b pb-1 mb-2">Education</h2>
                        <ul className="list-disc pl-5 text-sm space-y-2">
                            {education.map((edu, i) => (
                                <li key={i}>
                                    {edu.degree && <div><strong>Degree:</strong> {edu.degree}</div>}
                                    {edu.institution && <div><strong>Institution:</strong> {edu.institution}</div>}
                                    {edu.year && <div><strong>Year:</strong> {edu.year}</div>}
                                    {edu.percentage && <div><strong>Percentage:</strong> {edu.percentage}</div>}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Experience */}
                {experience && experience.trim() !== "" && (
                    <section>
                        <h2 className="text-xl font-semibold border-b pb-1 mb-2">Experience</h2>
                        <p className="text-sm whitespace-pre-line">{experience}</p>
                    </section>
                )}

                {/* Projects */}
                {Array.isArray(projects) && projects.some(p => p.name || p.description) && (
                    <section>
                        <h2 className="text-xl font-semibold border-b pb-1 mb-2">Projects</h2>
                        <div className="space-y-3">
                            {projects.map((proj, i) => (
                                <div key={i} className="text-sm">
                                    {proj.name && <div className="font-semibold">{proj.name}</div>}
                                    {proj.description && <div className="text-gray-700">{proj.description}</div>}
                                    {proj.link && (
                                        <a
                                            href={proj.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-600 underline text-sm"
                                        >
                                            View Project
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills && skills.trim() !== "" && (
                    <section>
                        <h2 className="text-xl font-semibold border-b pb-1 mb-2">Skills</h2>
                        <div className="flex flex-wrap gap-2 text-sm">
                            {skills.split(",").map((skill, i) => (
                                <span key={i} className="bg-gray-100 px-2 py-1 rounded">{skill.trim()}</span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certificates */}
                {Array.isArray(certificates) && certificates.some(c => c.name || c.issuer) && (
                    <section>
                        <h2 className="text-xl font-semibold border-b pb-1 mb-2">Certificates</h2>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                            {certificates.filter(c => c.name || c.issuer).map((cert, i) => (
                                <li key={i}>
                                    {cert.name || "-"}{cert.issuer ? ` - ${cert.issuer}` : ""}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

            </main>
        </div>
    );
}
