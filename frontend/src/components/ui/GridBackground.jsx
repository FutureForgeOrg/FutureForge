import React from 'react';

const GridBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0f0f23]">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundSize: '40px 40px',
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GridBackground;
