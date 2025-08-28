import React from 'react';
import useInterviewStore from '../../store/useInterviewStore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import BackgroundWrapper from '../ui/BackgroundWrapper';
function InterviewSetupPanel() {
  const {
    level, mode, selectedValue, setLevel, setMode, setSelectedValue,
    generateQuestion, isProcessing
  } = useInterviewStore();
  const navigate = useNavigate();

  const handleGenerate = async () => {
    try {
      await generateQuestion();
      // Navigate immediately after successful generation
      navigate("/tools/Interview/InterviewPanel");
    } catch (error) {
      console.error("Failed to generate question:", error);
      // Stay on current page if there's an error
    }
  };

  const roles = [
    "Backend Developer", "Frontend Developer", "Full Stack Developer",
    "Data Scientist", "Machine Learning Engineer", "DevOps Engineer",
    "Mobile Developer", "iOS Developer", "Android Developer",
    "QA Engineer", "System Administrator", "Cloud Engineer",
    "Security Engineer", "Database Administrator", "Product Manager"
  ];

  const topics = [
    "Data Structures", "Algorithms", "Object-Oriented Programming",
    "System Design", "Database Design", "API Development",
    "JavaScript", "Python", "Java", "React", "Node.js",
    "Machine Learning", "Data Analysis", "SQL", "NoSQL",
    "Cloud Computing", "Docker", "Kubernetes", "Security",
    "Testing", "Performance Optimization", "Operating Systems",
    "Computer Networks", "HTML", "CSS"
  ];

  const canSubmit = level && mode && selectedValue;

  return (
  <>
      <Navbar/>
      <BackgroundWrapper>
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 shadow-xl p-8 mt-16 max-w-4xl mx-auto">
        
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8 text-center">
          Start your preparation with our AI interviewer
        </h2>

        {/* Level Selection */}
        <div className="mb-8 border border-blue-200 p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
          <p className="text-gray-800 mb-4 font-medium text-lg">In which level you like to do interview?</p>
          <div className="flex gap-4 sm:flex-row flex-col justify-center">
            {['beginner', 'intermediate', 'advanced'].map((levelOption) => (
              <button
                key={levelOption}
                onClick={() => setLevel(levelOption)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md ${
                  level === levelOption
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200 shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-lg border border-gray-200'
                }`}
              >
                {levelOption.charAt(0).toUpperCase() + levelOption.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Selection */}
        <div className="mb-8 border border-blue-200 p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
          <p className="text-gray-800 mb-4 font-medium text-lg">
            We have two mode for interview by role or by topic, which one you like to use?
          </p>

          {/* Role Mode */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <input
                type="radio"
                id="role-mode"
                name="mode"
                value="role"
                checked={mode === 'role'}
                onChange={(e) => {
                  setMode(e.target.value);
                  setSelectedValue('');
                }}
                className="mr-3 w-5 h-5 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="role-mode" className="text-gray-800 font-semibold text-lg cursor-pointer">Role Mode</label>
            </div>
            <select
              value={mode === 'role' ? selectedValue : ''}
              onChange={(e) => setSelectedValue(e.target.value)}
              disabled={mode !== 'role'}
              className="w-full p-4 border border-gray-300 rounded-xl disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 font-medium shadow-sm"
            >
              <option value="">Select a role (approximately 15 available)</option>
              {roles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div className="text-center text-gray-600 font-bold text-lg mb-6 relative">
            <span className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-1 rounded-full">OR</span>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>

          {/* Topic Mode */}
          <div>
            <div className="flex items-center mb-3">
              <input
                type="radio"
                id="topic-mode"
                name="mode"
                value="topic"
                checked={mode === 'topic'}
                onChange={(e) => {
                  setMode(e.target.value);
                  setSelectedValue('');
                }}
                className="mr-3 w-5 h-5 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="topic-mode" className="text-gray-800 font-semibold text-lg cursor-pointer">Topic Mode</label>
            </div>
            <select
              value={mode === 'topic' ? selectedValue : ''}
              onChange={(e) => setSelectedValue(e.target.value)}
              disabled={mode !== 'topic'}
              className="w-full p-4 border border-gray-300 rounded-xl disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 font-medium shadow-sm"
            >
              <option value="">Select a topic (approximately 25 available)</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={handleGenerate}
            disabled={!canSubmit || isProcessing}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md text-lg"
          >
            {isProcessing ? 'Generating Question...' : 'Submit and Generate Question'}
          </button>
        </div>
      </div>
      </BackgroundWrapper>
    </>
  );
}

export default InterviewSetupPanel;