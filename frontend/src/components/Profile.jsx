import React, { useState, useRef, useCallback } from 'react';
import BackgroundWrapper from './ui/BackgroundWrapper';
import {
  Mail, MapPin, Phone, Edit2, Github, Linkedin, Upload,
  Save, X, User, Briefcase, FileText, Link, Eye, EyeOff,
  Camera, Check, AlertCircle, Globe, Twitter, Instagram,
  Calendar, Award, Star, ExternalLink
} from 'lucide-react';




// Enhanced Input Field Component

const InputField = ({
  label,
  icon: Icon,
  type = "text",
  value,
  onChange,
  disabled,
  error,
  placeholder,
  required = false,
  description
}) => (
  <div className="mb-6">
    <label className="font-medium flex items-center gap-2 mb-2 text-gray-700">
      {Icon && <Icon className="w-4 h-4 text-gray-500" />}
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    {description && (
      <p className="text-sm text-gray-500 mb-2">{description}</p>
    )}
    {disabled ? (
      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-700">{value || 'Not specified'}</p>
      </div>
    ) : (
      <>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full border rounded-lg p-3 transition-all duration-200 ${error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
            } focus:outline-none focus:ring-2`}
          placeholder={placeholder}
          required={required}
        />
        {error && (
          <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </>
    )}
  </div>
);

// Enhanced TextArea Component
const TextAreaField = ({
  label,
  value,
  onChange,
  disabled,
  error,
  placeholder,
  rows = 4,
  maxLength,
  required = false
}) => (
  <div className="mb-6">
    <label className="font-medium flex items-center justify-between mb-2 text-gray-700">
      <span className="flex items-center gap-2">
        <FileText className="w-4 h-4 text-gray-500" />
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      {maxLength && (
        <span className="text-sm text-gray-500">
          {value?.length || 0}/{maxLength}
        </span>
      )}
    </label>
    {disabled ? (
      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-700 whitespace-pre-wrap">{value || 'No bio provided'}</p>
      </div>
    ) : (
      <>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full border rounded-lg p-3 transition-all duration-200 resize-none ${error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
            } focus:outline-none focus:ring-2`}
          rows={rows}
          placeholder={placeholder}
          maxLength={maxLength}
          required={required}
        />
        {error && (
          <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </>
    )}
  </div>
);

// Success Toast Component
const Toast = ({ message, type = 'success', onClose }) => (
  <div className={`fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`}>
    {type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
    <span>{message}</span>
    <button onClick={onClose} className="ml-2">
      <X className="w-4 h-4" />
    </button>
  </div>
);

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "Purv Patel",
    email: "purv.patel@example.com",
    phone: "+91 9876543210",
    location: "Ahmedabad, Gujarat, India",
    title: "Full Stack Developer",
    bio: "Passionate developer with 5+ years of experience building scalable web applications. I specialize in React, Node.js, and cloud technologies, with a keen interest in creating user-centric solutions that solve real-world problems.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    company: "",
    website: "https://purvpatel.dev",
    joinDate: "2020-03-15",
    skills: ["React", "Node.js", "Python", "TypeScript", "AWS", "MongoDB", "Docker", "GraphQL"],
    experience: "5+ years",
    projects: 47,
    certifications: ["AWS Certified", "React Developer", "Scrum Master"],
    links: {
      github: "https://github.com/purvpatel",
      linkedin: "https://linkedin.com/in/purvpatel",
      twitter: "https://twitter.com/purvpatel",
      instagram: "https://instagram.com/purvpatel"
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profileData);
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [skillsInput, setSkillsInput] = useState(profileData.skills.join(', '));
  const [certificationsInput, setCertificationsInput] = useState(
    profileData.certifications.join(', ')
  );
  // Validation functions
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\+?[\d\s\-\(\)]{10,}$/.test(phone);
  const validateURL = (url) => {
    if (!url) return true; // Optional field
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!editData.name?.trim()) newErrors.name = "Name is required";
    if (!editData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(editData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!editData.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(editData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!editData.location?.trim()) newErrors.location = "Location is required";
    if (!editData.title?.trim()) newErrors.title = "Job title is required";
    if (!editData.bio?.trim()) newErrors.bio = "Bio is required";

    // Validate URLs
    Object.entries(editData.links).forEach(([platform, url]) => {
      if (url && !validateURL(url)) {
        newErrors[platform] = `Please enter a valid ${platform} URL`;
      }
    });

    if (editData.website && !validateURL(editData.website)) {
      newErrors.website = "Please enter a valid website URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [editData]);

  const handleEdit = () => {
    setEditData({ ...profileData });
    setIsEditing(true);
    setErrors({});
  };

  const handleSave = () => {
    if (validateForm()) {
      setProfileData(editData);
      setIsEditing(false);
      setErrors({});
      setShowToast({ type: 'success', message: 'Profile updated successfully!' });
      setTimeout(() => setShowToast(null), 3000);
    } else {
      setShowToast({ type: 'error', message: 'Please fix the errors before saving' });
      setTimeout(() => setShowToast(null), 3000);
    }
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
    setErrors({});
  };

  const handleAvatarChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditData(prev => ({ ...prev, avatar: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleAvatarChange(file);
  };


  const handleSkillsChange = (value) => {
    setSkillsInput(value);
    const skillsArray = value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setEditData(prev => ({ ...prev, skills: skillsArray }));
  };
  const handleCertificationsChange = (value) => {
    setCertificationsInput(value);

    const certsArray = value
      .split(',')
      .map(cert => cert.trim())
      .filter(cert => cert);

    setEditData(prev => ({ ...prev, certifications: certsArray }));
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getSocialIcon = (platform) => {
    const icons = {
      github: Github,
      linkedin: Linkedin,
      twitter: Twitter,
      instagram: Instagram
    };
    return icons[platform] || Link;
  };

  const getSocialColor = (platform) => {
    const colors = {
      github: 'hover:bg-gray-200 text-gray-700',
      linkedin: 'hover:bg-blue-200 text-blue-700',
      twitter: 'hover:bg-sky-200 text-sky-700',
      instagram: 'hover:bg-pink-200 text-pink-700'
    };
    return colors[platform] || 'hover:bg-gray-200 text-gray-700';
  };

  return (
    <BackgroundWrapper>


      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={showToast.message}
          type={showToast.type}
          onClose={() => setShowToast(null)}
        />
      )}

      <div className="p-6 max-w-6xl mx-auto py-8">
        {/* Hero Section */}
        <div className="relative mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 p-8 text-white">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-bold">Profile Management</h1>
              <div className="flex gap-2">

                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500/80 backdrop-blur-sm rounded-xl hover:bg-red-600 transition-all"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500/80 backdrop-blur-sm rounded-xl hover:bg-green-600 transition-all"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div
                  className={`relative ${isEditing ? 'cursor-pointer' : ''} ${isDragging ? 'scale-105' : ''} transition-transform`}
                  onDragOver={isEditing ? handleDragOver : undefined}
                  onDragLeave={isEditing ? handleDragLeave : undefined}
                  onDrop={isEditing ? handleDrop : undefined}
                  onClick={isEditing ? () => fileInputRef.current?.click() : undefined}
                >
                  <img
                    src={isEditing ? editData.avatar : profileData.avatar}
                    alt={profileData.name}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover"
                  />
                  {isEditing && (
                    <div className={`absolute inset-0 rounded-full bg-black/50 flex items-center justify-center transition-opacity ${isDragging ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}>
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleAvatarChange(e.target.files[0])}
                />
              </div>

              <div className="text-center md:text-left">
                <h2 className="text-4xl font-bold mb-2">{profileData.name}</h2>
                <p className="text-xl text-white/90 mb-3">{profileData.title}</p>
                <p className="text-white/80 mb-4">{profileData.company}</p>

                {/* Stats */}
                <div className="flex justify-center md:justify-start gap-6 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{profileData.projects}</div>
                    <div className="text-white/80">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{profileData.experience}</div>
                    <div className="text-white/80">Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{profileData.skills.length}</div>
                    <div className="text-white/80">Skills</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Basic Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  label="Full Name"
                  icon={User}
                  value={isEditing ? editData.name : profileData.name}
                  onChange={(value) => {
                    setEditData(prev => ({ ...prev, name: value }));
                    clearError('name');
                  }}
                  disabled={!isEditing}
                  error={errors.name}
                  placeholder="Enter your full name"
                  required
                />

                <InputField
                  label="Job Title"
                  icon={Briefcase}
                  value={isEditing ? editData.title : profileData.title}
                  onChange={(value) => {
                    setEditData(prev => ({ ...prev, title: value }));
                    clearError('title');
                  }}
                  disabled={!isEditing}
                  error={errors.title}
                  placeholder="e.g. Full Stack Developer"
                  required
                />

                <InputField
                  label="Email Address"
                  icon={Mail}
                  type="email"
                  value={isEditing ? editData.email : profileData.email}
                  onChange={(value) => {
                    setEditData(prev => ({ ...prev, email: value }));
                    clearError('email');
                  }}
                  disabled={!isEditing}
                  error={errors.email}
                  placeholder="your.email@example.com"
                  required
                />

                <InputField
                  label="Phone Number"
                  icon={Phone}
                  type="tel"
                  value={isEditing ? editData.phone : profileData.phone}
                  onChange={(value) => {
                    setEditData(prev => ({ ...prev, phone: value }));
                    clearError('phone');
                  }}
                  disabled={!isEditing}
                  error={errors.phone}
                  placeholder="+91 9876543210"
                  required
                />

                <InputField
                  label="Location"
                  icon={MapPin}
                  value={isEditing ? editData.location : profileData.location}
                  onChange={(value) => {
                    setEditData(prev => ({ ...prev, location: value }));
                    clearError('location');
                  }}
                  disabled={!isEditing}
                  error={errors.location}
                  placeholder="City, State, Country"
                  required
                />

                <InputField
                  label="Company"
                  icon={Briefcase}
                  value={isEditing ? editData.company : profileData.company}
                  onChange={(value) => setEditData(prev => ({ ...prev, company: value }))}
                  disabled={!isEditing}
                  placeholder="Your current company"
                />

                <InputField
                  label="Website"
                  icon={Globe}
                  type="url"
                  value={isEditing ? editData.website : profileData.website}
                  onChange={(value) => {
                    setEditData(prev => ({ ...prev, website: value }));
                    clearError('website');
                  }}
                  disabled={!isEditing}
                  error={errors.website}
                  placeholder="https://yourwebsite.com"
                />

                <InputField
                  label="Join Date"
                  icon={Calendar}
                  type="date"
                  value={isEditing ? editData.joinDate : profileData.joinDate}
                  onChange={(value) => setEditData(prev => ({ ...prev, joinDate: value }))}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* About Me */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                About Me
              </h3>

              <TextAreaField
                label="Professional Bio"
                value={isEditing ? editData.bio : profileData.bio}
                onChange={(value) => {
                  setEditData(prev => ({ ...prev, bio: value }));
                  clearError('bio');
                }}
                disabled={!isEditing}
                error={errors.bio}
                placeholder="Tell us about your professional background, experience, and what drives you..."
                maxLength={500}
                rows={6}
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Skills */}

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-blue-600" />
                Skills
              </h3>

              {isEditing ? (
                <div>
                  <textarea
                    value={skillsInput}
                    onChange={(e) => handleSkillsChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    rows={4}
                    placeholder="React, Node.js, Python, TypeScript..."
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Separate skills with commas
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>


            {/* Certifications */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                Certifications
              </h3>

              {isEditing ? (
                <div>
                  <textarea
                    value={certificationsInput}
                    onChange={(e) => handleCertificationsChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    rows={3}
                    placeholder="AWS Certified, React Developer..."
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Separate certifications with commas
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {profileData.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-green-50 rounded-lg"
                    >
                      <Award className="w-4 h-4 text-green-600" />
                      <span className="text-green-800 text-sm font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>


            {/* Social Links */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Link className="w-5 h-5 text-blue-600" />
                Social Links
              </h3>

              {isEditing ? (
                <div className="space-y-4">
                  {Object.entries(editData.links).map(([platform, url]) => {
                    const Icon = getSocialIcon(platform);
                    return (
                      <div key={platform}>
                        <label className="block text-sm font-medium mb-1 capitalize flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {platform}
                        </label>
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => {
                            setEditData(prev => ({
                              ...prev,
                              links: { ...prev.links, [platform]: e.target.value }
                            }));
                            clearError(platform);
                          }}
                          className={`w-full border rounded-lg p-2 text-sm transition-all ${errors[platform] ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                          placeholder={`https://${platform}.com/username`}
                        />
                        {errors[platform] && (
                          <p className="text-red-500 text-xs mt-1">{errors[platform]}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  {Object.entries(profileData.links).map(([platform, url]) => {
                    if (!url) return null;
                    const Icon = getSocialIcon(platform);
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all bg-gray-50 ${getSocialColor(platform)}`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium capitalize">{platform}</span>
                        <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                      </a>
                    );
                  })}

                  {profileData.website && (
                    <a
                      href={profileData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg transition-all bg-gray-50 hover:bg-purple-200 text-purple-700"
                    >
                      <Globe className="w-4 h-4" />
                      <span className="font-medium">Website</span>
                      <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default Profile;