import React, { useState } from "react";
import { useProfileQuery } from "../hooks/useProfile";
import { useSaveProfileMutation } from "../hooks/useProfile";
import BackgroundWrapper from "../components/ui/BackgroundWrapper"
import Navbar from "../components/Navbar"
import { useAuthStore } from "../store/useAuthStore";

const calculateCompletion = (profile) => {
  let total = 0;

  if (profile.name && profile.title && profile.about) total += 30;
  if (profile.skills?.length >= 1) total += 15;
  if (profile.experience?.length > 0) total += 20;
  if (profile.projects?.length > 0) total += 15;
  if (profile.education?.length > 0) total += 10;
  if (profile.social?.length > 0) total += 10;

  return total;
};


export default function Profile() {
  const { data: profile, isLoading } = useProfileQuery();
  const updateProfile = useSaveProfileMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const { authUser } = useAuthStore();
  if (isLoading) return <p>Loading...</p>;
  if (!profile) return <p>No profile found.</p>;

  const completion = calculateCompletion(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(profile); // clone existing profile
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (field, index, key, value) => {
    const updatedArray = [...formData[field]];

    if (key === null) {
      // skills = array of strings
      updatedArray[index] = value;
    } else {
      // experience, projects, etc. = array of objects
      updatedArray[index][key] = value;
    }

    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleAddField = (field, template) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], template],
    });
  };

  const handleRemoveField = (field, index) => {
    const updated = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updated });
  };

  const handleSave = () => {
    updateProfile.mutate(formData, {
      onSuccess: () => {
        setIsEditing(false);
        setFormData(null);
      },
    });
  };

  return (

    <div className="text-white">
      <BackgroundWrapper>
        <Navbar />

        {completion < 100 && (
          <div className="pt-20 max-w-3xl text-center mx-auto">
            <div className="bg-yellow-100 p-4 rounded-md mb-4">
              <h3 className="font-semibold text-yellow-700">Complete your profile</h3>
              <p className="text-yellow-600">
                Your profile is {completion}% complete. Add missing details to get to 100%,
                so that you can easily auto fill details in resume and portfolio maker.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                <div
                  className="bg-yellow-500 h-3 rounded-full"
                  style={{ width: `${completion}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div className={`max-w-3xl mx-auto p-8 ${completion < 100 ? "pt-6" : "pt-20"} bg-white/10`}>
          {!isEditing ? (
            <>
              <h1 className="text-3xl font-bold">{profile?.name}</h1>
              <h2 className="text-xl text-gray-400">{profile.title}</h2>
              <p className="mt-4">{profile.about}</p>

              <div className="mt-6">
                <h3 className="font-semibold">Skills</h3>
                <ul className="list-disc ml-6">
                  {profile.skills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 max-w-3xl">
                <h3 className="font-semibold mb-2">Experience</h3>
                <div className="flex flex-wrap gap-4">
                  {profile.experience.map((exp, i) => (
                    <div key={i} className="w-full md:w-[88%] lg:w-[82%] border p-3 rounded-lg">
                      <p className="font-semibold">{exp.role} @{exp.company}</p>
                      <p className="text-md text-gray-300 font-elegant mb-1">{exp.duration}</p>
                      <p className="break-words">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 max-w-3xl">
                <h3 className="font-semibold mb-2">Projects</h3>
                <div className="flex flex-wrap gap-4">
                  {profile.projects.map((proj, i) => (
                    <div key={i} className="mb-2 w-full md:w-[88%] lg:w-[82%] border p-3 rounded-lg">
                      <p className="font-medium">{proj.title}</p>
                      <p className="break-words">{proj.description}</p>
                      <a href={proj.link} className="text-blue-500 underline" target="_blank" rel="noreferrer">
                        {proj.link}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold">Education</h3>
                {profile.education.map((edu, i) => (
                  <p key={i}>{edu.degree}, {edu.institution} ({edu.year})</p>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="font-semibold">Social</h3>
                {profile.social.map((s, i) => (
                  <a key={i} href={s.link} className="block text-blue-500 underline" target="_blank" rel="noreferrer">
                    {s.platform}
                  </a>
                ))}
              </div>

              <button
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleEdit}
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              {/* --- Edit Form --- */}
              <div className="space-y-4 text-black">
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  placeholder="Title"
                  className="w-full border p-2 rounded"
                />
                <textarea
                  name="about"
                  value={formData.about || ""}
                  onChange={handleChange}
                  placeholder="About"
                  className="w-full border p-2 rounded h-24"
                />

                {/* Skills */}
                <div>
                  <h3 className="font-semibold mb-2">Skills</h3>
                  {formData.skills.map((skill, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) =>
                          handleArrayChange("skills", i, null, e.target.value)
                        }
                        className="flex-1 border p-2 rounded"
                        placeholder="Enter skill"
                      />
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                        onClick={() => handleRemoveField("skills", i)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
                    onClick={() => handleAddField("skills", "")}
                  >
                    Add Skill
                  </button>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="font-semibold mb-2">Experience</h3>
                  {formData.experience.map((exp, i) => (
                    <div key={i} className="border p-4 rounded mb-4">
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <input
                          type="text"
                          value={exp.role || ""}
                          onChange={(e) => handleArrayChange("experience", i, "role", e.target.value)}
                          placeholder="Role"
                          className="border p-2 rounded"
                        />
                        <input
                          type="text"
                          value={exp.company || ""}
                          onChange={(e) => handleArrayChange("experience", i, "company", e.target.value)}
                          placeholder="Company"
                          className="border p-2 rounded"
                        />
                      </div>
                      <input
                        type="text"
                        value={exp.duration || ""}
                        onChange={(e) => handleArrayChange("experience", i, "duration", e.target.value)}
                        placeholder="Duration (e.g., Jan 2020 - Dec 2022)"
                        className="w-full border p-2 rounded mb-2"
                      />
                      <textarea
                        value={exp.description || ""}
                        onChange={(e) => handleArrayChange("experience", i, "description", e.target.value)}
                        placeholder="Description"
                        className="w-full border p-2 rounded h-20"
                      />
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded mt-2"
                        onClick={() => handleRemoveField("experience", i)}
                      >
                        Remove Experience
                      </button>
                    </div>
                  ))}
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
                    onClick={() => handleAddField("experience", { role: "", company: "", duration: "", description: "" })}
                  >
                    Add Experience
                  </button>
                </div>

                {/* Projects */}
                <div>
                  <h3 className="font-semibold mb-2">Projects</h3>
                  {formData.projects.map((proj, i) => (
                    <div key={i} className="border p-4 rounded mb-4">
                      <input
                        type="text"
                        value={proj.title || ""}
                        onChange={(e) => handleArrayChange("projects", i, "title", e.target.value)}
                        placeholder="Project Title"
                        className="w-full border p-2 rounded mb-2"
                      />
                      <textarea
                        value={proj.description || ""}
                        onChange={(e) => handleArrayChange("projects", i, "description", e.target.value)}
                        placeholder="Project Description"
                        className="w-full border p-2 rounded h-20 mb-2"
                      />
                      <input
                        type="url"
                        value={proj.link || ""}
                        onChange={(e) => handleArrayChange("projects", i, "link", e.target.value)}
                        placeholder="Project Link (URL)"
                        className="w-full border p-2 rounded"
                      />
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded mt-2"
                        onClick={() => handleRemoveField("projects", i)}
                      >
                        Remove Project
                      </button>
                    </div>
                  ))}
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
                    onClick={() => handleAddField("projects", { title: "", description: "", link: "" })}
                  >
                    Add Project
                  </button>
                </div>

                {/* Education */}
                <div>
                  <h3 className="font-semibold mb-2">Education</h3>
                  {formData.education.map((edu, i) => (
                    <div key={i} className="border p-4 rounded mb-4">
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <input
                          type="text"
                          value={edu.degree || ""}
                          onChange={(e) => handleArrayChange("education", i, "degree", e.target.value)}
                          placeholder="Degree"
                          className="border p-2 rounded"
                        />
                        <input
                          type="text"
                          value={edu.institution || ""}
                          onChange={(e) => handleArrayChange("education", i, "institution", e.target.value)}
                          placeholder="Institution"
                          className="border p-2 rounded"
                        />
                      </div>
                      <input
                        type="text"
                        value={edu.year || ""}
                        onChange={(e) => handleArrayChange("education", i, "year", e.target.value)}
                        placeholder="Year (e.g., 2020)"
                        className="w-full border p-2 rounded"
                      />
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded mt-2"
                        onClick={() => handleRemoveField("education", i)}
                      >
                        Remove Education
                      </button>
                    </div>
                  ))}
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
                    onClick={() => handleAddField("education", { degree: "", institution: "", year: "" })}
                  >
                    Add Education
                  </button>
                </div>

                {/* Social */}
                <div>
                  <h3 className="font-semibold mb-2">Social Links</h3>
                  {formData.social.map((s, i) => (
                    <div key={i} className="border p-4 rounded mb-4">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={s.platform || ""}
                          onChange={(e) => handleArrayChange("social", i, "platform", e.target.value)}
                          placeholder="Platform (e.g., LinkedIn, GitHub)"
                          className="border p-2 rounded"
                        />
                        <input
                          type="url"
                          value={s.link || ""}
                          onChange={(e) => handleArrayChange("social", i, "link", e.target.value)}
                          placeholder="Profile URL"
                          className="border p-2 rounded"
                        />
                      </div>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded mt-2"
                        onClick={() => handleRemoveField("social", i)}
                      >
                        Remove Social Link
                      </button>
                    </div>
                  ))}
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
                    onClick={() => handleAddField("social", { platform: "", link: "" })}
                  >
                    Add Social Link
                  </button>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                    onClick={handleSave}
                    disabled={updateProfile.isLoading}
                  >
                    {updateProfile.isLoading ? "Saving..." : "Save"}
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </BackgroundWrapper>
    </div>
  );
}