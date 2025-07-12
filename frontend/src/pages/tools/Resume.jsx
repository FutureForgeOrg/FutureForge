import React, { useState } from 'react';
import GridBackground from '../../components/ui/GridBackground';

// Header Component
const Header = () => {
  return (
    <div className="text-center mb-16 pt-10">
      <h1 className="text-5xl font-bold text-white mb-5 drop-shadow-lg">
        Resume Builder
      </h1>
      <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
        Create a professional resume that stands out. Choose from our carefully designed templates and land your dream job.
      </p>
    </div>
  );
};

// Format Card Component
const FormatCard = ({ format, isSelected, onSelect }) => {
  const formatData = {
    professional: {
      icon: '📋',
      title: 'Professional',
      description: 'A clean, traditional format perfect for corporate environments and established industries. Emphasizes experience and achievements.'
    },
    creative: {
      icon: '🎨',
      title: 'Creative',
      description: 'A modern, visually appealing design ideal for creative fields like design, marketing, and media. Showcases personality and creativity.'
    },
    modern: {
      icon: '⚡',
      title: 'Modern',
      description: 'A contemporary layout that balances professionalism with visual appeal. Great for tech, startups, and progressive companies.'
    }
  };

  const data = formatData[format];

  return (
    <div 
      className={`bg-white rounded-2xl p-8 text-center shadow-lg transition-all duration-300 cursor-pointer border-4 hover:transform hover:-translate-y-2 hover:shadow-xl ${
        isSelected ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50' : 'border-transparent'
      }`}
      onClick={() => onSelect(format)}
    >
      <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl">
        {data.icon}
      </div>
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">{data.title}</h3>
      <p className="text-gray-600 leading-relaxed mb-6">{data.description}</p>
      <button 
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(format);
        }}
      >
        Select Format
      </button>
    </div>
  );
};

// Format Selection Component
const FormatSelection = ({ onFormatSelect, selectedFormat }) => {
  const formats = ['professional', 'creative', 'modern'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
      {formats.map(format => (
        <FormatCard 
          key={format}
          format={format}
          isSelected={selectedFormat === format}
          onSelect={onFormatSelect}
        />
      ))}
    </div>
  );
};

// Preview Component
const FormatPreview = ({ format, onCreateResume, onGoBack }) => {
  const formatNames = {
    professional: 'Professional Format',
    creative: 'Creative Format',
    modern: 'Modern Format'
  };

  return (
    <div className="bg-white rounded-2xl p-10 shadow-lg mb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          {formatNames[format]}
        </h2>
      </div>
      
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-16 text-center text-gray-500 text-lg mb-8">
        <p className="mb-2">📄 Resume format preview will be displayed here</p>
        <p>This is a placeholder for the selected resume format</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 justify-center">
        <button 
          className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-10 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
          onClick={onCreateResume}
        >
          Create Resume Using This Format
        </button>
        <button 
          className="bg-transparent text-blue-500 border-2 border-blue-500 px-10 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:bg-blue-500 hover:text-white"
          onClick={onGoBack}
        >
          Back to Formats
        </button>
      </div>
    </div>
  );
};

// Main App Component
const Resume = () => {
  const [selectedFormat, setSelectedFormat] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleFormatSelect = (format) => {
    setSelectedFormat(format);
    setShowPreview(true);
  };

  const handleCreateResume = () => {
    alert(`Creating resume using ${selectedFormat} format!\n\nThis would open the resume builder with your selected format.`);
  };

  const handleGoBack = () => {
    setShowPreview(false);
    setSelectedFormat('');
  };

  return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-purple-700">
    <GridBackground>
    <div className="max-w-6xl mx-auto px-5 py-5">
        <Header />
        
        {!showPreview ? (
          <FormatSelection 
            onFormatSelect={handleFormatSelect}
            selectedFormat={selectedFormat}
          />
        ) : (
          <FormatPreview 
            format={selectedFormat}
            onCreateResume={handleCreateResume}
            onGoBack={handleGoBack}
          />
        )}
      </div>
      </GridBackground>
    // </div>
  );
};

export default Resume;