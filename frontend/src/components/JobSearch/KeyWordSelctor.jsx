import React, { useState } from "react";
import {TECH_KEYWORDS} from "../../utils/Suggestions.js"

const KeyWordSelector = ({ selectedRole, onChange }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const filteredRoles = TECH_KEYWORDS.filter((role) =>
        role.toLowerCase().includes(selectedRole.toLowerCase())
    );

    return (
        <div className="relative w-full">
            <input
                type="text"
                placeholder="Search by Keyword"
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
                        <li className="p-2 text-white">No such keyword found</li>
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

export default KeyWordSelector;    