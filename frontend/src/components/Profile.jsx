import React, { useState } from 'react';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Globe, Edit2, Save, X, User, Briefcase } from 'lucide-react';
import profile from '../assets/profile.png';
import GridBackground from '../components/ui/GridBackground';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Full Stack Developer",
    bio: "Passionate developer with 5+ years of experience building web applications. I love creating clean, efficient code and learning new technologies.",
    avatar: profile,
    links: {
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
      // website: "https://johndoe.dev"
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profileData);

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    // website: Globe
  };

  const socialColors = {
    github: "hover:bg-gray-800 hover:text-white",
    linkedin: "hover:bg-blue-600 hover:text-white",
    twitter: "hover:bg-sky-500 hover:text-white",
    // website: "hover:bg-green-600 hover:text-white"
  };

  const handleEdit = () => {
    setEditData({ ...profileData }); // Create a deep copy
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profileData }); // Reset to original data
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
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
    <GridBackground>
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm border border-gray-100 min-h-[calc(100vh-3rem)]">

          {/* Left Side - Profile Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[calc(100vh-3rem)]">
            <div className="lg:col-span-1 relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white flex flex-col">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>

              <button
                onClick={isEditing ? handleCancel : handleEdit}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-transform duration-300 hover:scale-105 z-20"

              >
                {isEditing ? <X className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
              </button>

              {/* Profile Image and Basic Info */}
              <div className="relative z-10 flex-1 flex flex-col justify-center">
                <div className="text-center mb-8">
                  <div className="relative mx-auto mb-6">
                    <div className="w-32 h-32 rounded-full bg-white/20 p-1  mx-auto">
                      <img
                        src={isEditing ? editData.avatar : profileData.avatar}
                        alt={isEditing ? editData.name : profileData.name}
                        className="w-full h-full rounded-full object-cover border-2 border-white/50 shadow-xl"
                      />
                    </div>
                    {/* {!isEditing && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )} */}
                  </div>

                  {/* {isEditing && (
                    <div className="mb-6">
                      <input
                        type="url"
                        value={editData.avatar}
                        onChange={(e) => handleInputChange('avatar', e.target.value)}
                        className="w-full text-sm p-3 rounded-lg text-gray-800 bg-white/90 backdrop-blur-sm placeholder-gray-500"
                        placeholder="Avatar URL"
                      />
                    </div>
                  )} */}

                  {isEditing ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="text-2xl font-bold bg-white/10 border border-white/30 text-white placeholder-white/70 w-full py-3 px-4 rounded-lg  text-center"
                        placeholder="Your Name"
                      />
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="text-white/90 bg-white/10 border border-white/30 placeholder-white/60 w-full py-3 px-4 rounded-lg text-center"
                        placeholder="Your Job Title"
                      />
                    </div>
                  ) : (
                    <div>
                      <h1 className="text-4xl font-bold mb-3 text-white drop-shadow-lg">{profileData.name}</h1>
                      <div className="flex items-center justify-center space-x-2 mb-6">
                        <Briefcase className="w-5 h-5 text-white/80" />
                        <p className="text-white/90 text-xl font-medium">{profileData.title}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Social Links in Sidebar */}
                {!isEditing && (
                  <div className="mt-auto pb-8">
                    <h3 className="text-xl font-semibold text-white mb-4 text-center">Connect with me</h3>
                    <div className="flex justify-center flex-wrap gap-3">
                      {Object.entries(profileData.links).map(([platform, url]) => {
                        const IconComponent = socialIcons[platform];
                        return (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center w-12 h-12 rounded-xl bg-white/20  transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-white/30"
                          >
                            <IconComponent className="w-6 h-6 text-white group-hover:text-white transition-colors" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Edit Mode Info */}
                {isEditing && (
                  <div className="mt-auto pb-8 text-center">
                    <p className="text-white/80 text-sm">Edit your profile information on the right panel</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="lg:col-span-2 p-8 bg-gradient-to-b from-gray-50 to-white flex flex-col">
              {/* Bio Section */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <User className="w-6 h-6 text-indigo-600 mr-3" />
                  <h3 className="text-2xl font-semibold text-gray-800">About</h3>
                </div>
                {isEditing ? (
                  <textarea
                    value={editData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="w-full text-gray-700 p-6 border-2 border-gray-200 rounded-xl resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-lg"
                    rows="6"
                    placeholder="Tell people about yourself..."
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-lg">{profileData.bio}</p>
                )}
              </div>

              {/* Contact Info */}
              <div className={isEditing ? "flex-1 space-y-8" : "flex-1"}>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                  <Mail className="w-6 h-6 text-indigo-600 mr-3" />
                  Contact Information
                </h3>
                <div className={isEditing ? "space-y-6 mb-8" : "grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-6 mb-8"}>
                  <div className="flex items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full text-gray-700 p-6 border-2 border-gray-200 rounded-xl resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-lg"
                        placeholder="your.email@example.com"
                      />
                    ) : (
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Email</p>
                        <a href={`mailto:${profileData.email}`} className="text-gray-800 hover:text-blue-600 transition-colors font-medium text-lg">
                          {profileData.email}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full text-gray-700 p-6 border-2 border-gray-200 rounded-xl resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-lg"
                        placeholder="+1 (555) 123-4567"
                      />
                    ) : (
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Phone</p>
                        <a href={`tel:${profileData.phone}`} className="text-gray-800 hover:text-green-600 transition-colors font-medium text-lg">
                          {profileData.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {!isEditing && (
                  <div className="mb-8">
                    <div className="flex items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 max-w-md">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                        <MapPin className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Location</p>
                        <span className="text-gray-800 font-medium text-lg">{profileData.location}</span>
                      </div>
                    </div>
                  </div>
                )}

                {isEditing && (
                  <div className="mb-8">
                    <div className="flex items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                        <MapPin className="w-6 h-6 text-red-600" />
                      </div>
                      <input
                        type="text"
                        value={editData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="w-full text-gray-700 p-6 border-2 border-gray-200 rounded-xl resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-lg"
                        placeholder="Your City, State"
                      />
                    </div>
                  </div>
                )}

                {/* Social Links in Edit Mode */}
                {isEditing && (
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Social Links</h3>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
                      {Object.entries(editData.links).map(([platform, url]) => {
                        const IconComponent = socialIcons[platform];
                        return (
                          <div key={platform} className="flex items-center p-4 bg-white rounded-lg border border-gray-200">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                              <IconComponent className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-600 capitalize mb-1">{platform}</p>
                              <input
                                type="url"
                                value={url}
                                onChange={(e) => handleLinkChange(platform, e.target.value)}
                                className="w-full text-gray-700 p-6 border-2 border-gray-200 rounded-xl resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-lg"
                                placeholder={`Your ${platform} URL`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Save Button */}
                {isEditing && (
                  <div className="mt-auto">
                    <button
                      onClick={handleSave}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 font-semibold text-lg hover:shadow-lg transform hover:scale-[1.02]"
                    >
                      <Save className="w-5 h-5" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </GridBackground>
  );
};

export default Profile;