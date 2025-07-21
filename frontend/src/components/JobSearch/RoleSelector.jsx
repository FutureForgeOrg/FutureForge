import React, { useState } from "react";

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
];

const RoleSelector = ({ selectedRole, onChange }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const filteredRoles = JOB_ROLES.filter((role) =>
        role.toLowerCase().includes(selectedRole.toLowerCase())
    );

    return (
        <div className="relative w-full">
            <input
                type="text"
                placeholder="Search your role"
                value={selectedRole}
                onChange={(e) => {
                    onChange(e.target.value);
                    setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)} // small delay to allow item click
                className="border p-2 rounded w-full bg-black text-white"
            />

            {showDropdown && (
                <ul className="absolute z-10 w-full border rounded bg-black text-white mt-1 max-h-48 overflow-y-auto shadow">
                    {filteredRoles.length === 0 ? (
                        <li className="p-2 text-black">No roles found</li>
                    ) : (
                        filteredRoles.map((role, index) => (
                            <li
                                key={index}
                                onMouseDown={() => {
                                    onChange(role);
                                    setShowDropdown(false);
                                }}
                                className="p-2 hover:bg-gray-700 cursor-pointer"
                            >
                                {role}
                            </li>

                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default RoleSelector;    