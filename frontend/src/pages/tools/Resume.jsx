import React, { useRef, useEffect, useState } from 'react';
import ResumeForm from '../../components/ResumeMaker/ResumeForm';
import { useNavigate } from 'react-router-dom';
import useResumeStore from '../../store/useResumeStore';

function Resume() {
  const { formData, setFormData, selectedTemplate } = useResumeStore();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const previewRef = useRef();

  useEffect(() => {
    const hasBasicInfo = formData.name.trim() && formData.email.trim();
    setIsFormValid(hasBasicInfo);
  }, [formData]);

  const handlePreview = async () => {
    if (!isFormValid) {
      alert('Please fill in at least your name and email before previewing.');
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoading(false);
    navigate('/PreviewPage'); // data will persist because of Zustand
  };

  const handleSaveDraft = () => {
    localStorage.setItem('resumeFormData', JSON.stringify(formData));
    alert('Draft saved successfully!');
  };

  const handleClearForm = () => {
    if (window.confirm('Are you sure you want to clear all form data?')) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        skills: "",
        education: [""],
        experience: "",
        projects: [""],
        certificates: [""],
        links: "",
      });
      localStorage.removeItem('resumeFormData');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Resume Builder
          </h1>
          <p className="text-gray-600">Create your professional resume</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <ResumeForm formData={formData} setFormData={setFormData} />
            </div>
          </div>

          {/* Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={handlePreview}
                  disabled={!isFormValid || isLoading}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    isFormValid && !isLoading
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? 'Processing...' : 'Preview Resume'}
                </button>

                <button 
                  onClick={handleSaveDraft}
                  className="w-full py-2 px-4 rounded-lg font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200"
                >
                  Save Draft
                </button>

                <button 
                  onClick={handleClearForm}
                  className="w-full py-2 px-4 rounded-lg font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200"
                >
                  Clear Form
                </button>
              </div>

              <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">
                  <div className="flex justify-between mb-2">
                    <span>Status:</span>
                    <span className={isFormValid ? 'text-green-600' : 'text-gray-500'}>
                      {isFormValid ? 'Ready' : 'Incomplete'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Template:</span>
                    <span>{selectedTemplate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;
