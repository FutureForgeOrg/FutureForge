import React from 'react';

const BackgroundWrapper = ({ children }) => {
  return (
    <div
      className="relative min-h-screen w-full bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/bg2.webp')",
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay Layer */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>

      {/* Children Container */}
      <div className="relative z-10 min-h-screen w-full">
        {children}
      </div>
    </div>
  );
};

export default BackgroundWrapper;
