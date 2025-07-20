import React, { useState } from 'react';
import { Mail, MapPin, Phone, Edit2, Github, Linkedin } from 'lucide-react';
import profile from '../assets/profile.png';
import BackgroundWrapper from './ui/BackgroundWrapper';
import Navbar from './Navbar';
const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "Purv Patel",
    email: "purv.patel@example.com",
    phone: "+91 9876543210",
    location: "India, Gujarat",
    title: "Full Stack Developer",
    bio: "Passionate developer with 5+ years of experience building web applications.",
    avatar: profile,
    links: {
      github: "https://github.com/purvpatel",
      linkedin: "https://linkedin.com/in/purvpatel"
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profileData);

  const handleEdit = () => {
    setEditData({ ...profileData });
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleLinkChange = (platform, value) => {
    setEditData(prev => ({
      ...prev,
      links: {
        ...prev.links,
        [platform]: value
      }
    }));
  };

  return (
    <BackgroundWrapper>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto py-16">
        <div className="max-w-3xl mx-auto mt-10 p-10 border rounded-2xl shadow-md bg-white">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Profile</h1>
            <div className="space-x-2">
              {isEditing ? (
                <>
                  <button onClick={handleCancel} className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200">Cancel</button>
                  <button onClick={handleSave} className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium hover:bg-green-200">Save</button>
                </>
              ) : (
                <button onClick={handleEdit} className="text-blue-600 hover:text-blue-800"><Edit2 /></button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <img src={profileData.avatar} alt={profileData.name} className="w-20 h-20 rounded-full border" />
            <div>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="block w-full border rounded-md p-2 mb-2"
                  />
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="block w-full border rounded-md p-2"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold">{profileData.name}</h2>
                  <p className="text-gray-600">{profileData.title}</p>
                </>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="font-medium flex items-center gap-2"><Mail className="w-4 h-4" /> Email</label>
            {isEditing ? (
              <input
                type="email"
                value={editData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full border p-2 rounded-md"
              />
            ) : (
              <p>{profileData.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="font-medium flex items-center gap-2"><Phone className="w-4 h-4" /> Phone</label>
            {isEditing ? (
              <input
                type="tel"
                value={editData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full border p-2 rounded-md"
              />
            ) : (
              <p>{profileData.phone}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="font-medium flex items-center gap-2"><MapPin className="w-4 h-4" /> Location</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full border p-2 rounded-md"
              />
            ) : (
              <p>{profileData.location}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="font-medium">Bio</label>
            {isEditing ? (
              <textarea
                value={editData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                className="w-full border p-2 rounded-md"
                rows={4}
              />
            ) : (
              <p className="text-gray-700">{profileData.bio}</p>
            )}
          </div>

          {/* Social Links Section */}
          <div className="mb-2">
            <h3 className="font-medium mb-2">Social Links</h3>
            {isEditing ? (
              <>
                <div className="mb-3">
                  <label className="block text-sm mb-1">GitHub</label>
                  <input
                    type="url"
                    value={editData.links.github}
                    onChange={(e) => handleLinkChange('github', e.target.value)}
                    className="w-full border p-2 rounded-md"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm mb-1">LinkedIn</label>
                  <input
                    type="url"
                    value={editData.links.linkedin}
                    onChange={(e) => handleLinkChange('linkedin', e.target.value)}
                    className="w-full border p-2 rounded-md"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </>
            ) : (
              <div className="flex gap-4 mt-2">
                <a
                  href={profileData.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black flex items-center gap-1"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a
                  href={profileData.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default Profile;
