import React from 'react';
import useInterviewStore from '../../store/useInterviewStore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

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
      <div className="bg-white rounded-lg border-2 border-gray-200 p-8 mt-16">
        
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Start your preparation with our AI interviewer
        </h2>

        {/* Level Selection */}
        <div className="mb-6 border-blue-200 border-2 p-4 rounded-lg bg-slate-300">
          <p className="text-gray-700 mb-3">In which level you like to do interview?</p>
          <div className="flex gap-4 sm:flex-row flex-col justify-center">
            {['beginner', 'intermediate', 'advanced'].map((levelOption) => (
              <button
                key={levelOption}
                onClick={() => setLevel(levelOption)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  level === levelOption
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {levelOption.charAt(0).toUpperCase() + levelOption.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Selection */}
        <div className="mb-6 border-blue-200 border-2 p-4 rounded-lg bg-slate-300">
          <p className="text-gray-700 mb-3">
            We have two mode for interview by role or by topic, which one you like to use?
          </p>

          {/* Role Mode */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
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
                className="mr-2"
              />
              <label htmlFor="role-mode" className="text-gray-700 font-medium">Role Mode</label>
            </div>
            <select
              value={mode === 'role' ? selectedValue : ''}
              onChange={(e) => setSelectedValue(e.target.value)}
              disabled={mode !== 'role'}
              className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100"
            >
              <option value="">Select a role (approximately 15 available)</option>
              {roles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div className="text-center text-gray-500 font-medium mb-4">OR</div>

          {/* Topic Mode */}
          <div>
            <div className="flex items-center mb-2">
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
                className="mr-2"
              />
              <label htmlFor="topic-mode" className="text-gray-700 font-medium">Topic Mode</label>
            </div>
            <select
              value={mode === 'topic' ? selectedValue : ''}
              onChange={(e) => setSelectedValue(e.target.value)}
              disabled={mode !== 'topic'}
              className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100"
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
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            {isProcessing ? 'Generating Question...' : 'Submit and Generate Question'}
          </button>
        </div>
      </div>
    </>
  );
}

export default InterviewSetupPanel;