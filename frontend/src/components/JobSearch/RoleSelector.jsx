import React from "react";
const JOB_ROLES = [
    "Software Engineer",
    "Full Stack Web Developer",
    "Backend Software Developer",
    "Frontend Web Developer",
    "Data Scientist",
    "Machine Learning Engineer",
    "Artificial Intelligence Engineer",
    "Cloud Solutions Architect",
    "DevOps Engineer",
    "Cybersecurity Engineer",
    "Mobile Application Developer",
    "UI UX Designer",
    "Data Engineer",
    "Product Manager",
    "Blockchain Engineer"
]

const RoleSelector = ({ selectedRole, onChange }) => {


    return (
        <select
            value={selectedRole}
            onChange={(e) => onChange(e.target.value)}
            className="border p-2 rounded w-full"
        >
            <option value="">Select your role</option>
            {JOB_ROLES.map((role, idx) => (
                <option key={idx} value={role}>
                    {role}
                </option>))}
        </select>
    );
};

export default RoleSelector;
