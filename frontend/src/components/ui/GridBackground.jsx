// import React from 'react';

// const GridBackground = ({ children }) => {
//   return (
//     // <div className="relative min-h-screen overflow-hidden bg-[#0f0f23]">
//      <div className="relative min-h-screen overflow-hidden bg-[#3b113bd4]">
//       {/* Grid overlay */}
//       <div
//         className="absolute inset-0 z-0 pointer-events-none"
//         style={{
//           backgroundSize: '50px 50px',
//           backgroundImage: `
//             linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
//             linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
//           `,
//         }}
//       />
//       <div className="relative z-10">{children}</div>
//     </div>
//   );
// };

// export default GridBackground;



// import React from 'react';

// const GridBackground = ({ children }) => {
//   return (
//     <div className="relative min-h-screen overflow-hidden bg-[#1a0e2a]">
//       {/* Grid overlay with glowing points */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <svg
//           className="w-full h-full"
//           xmlns="http://www.w3.org/2000/svg"
//           preserveAspectRatio="none"
//         >
//           <defs>
//             <pattern
//               id="dotPattern"
//               width="50"
//               height="50"
//               patternUnits="userSpaceOnUse"
//             >
//               <circle cx="1" cy="1" r="1.5" fill="rgba(255,255,255,0.1)" />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#dotPattern)" />
//         </svg>
//       </div>

//       {/* Soft gradient lights */}
//       <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
//         <div className="absolute top-[30%] left-[40%] w-48 h-48 bg-purple-500 opacity-20 blur-3xl rounded-full" />
//         <div className="absolute bottom-[10%] right-[20%] w-64 h-64 bg-pink-400 opacity-10 blur-3xl rounded-full" />
//       </div>

//       <div className="relative z-10">{children}</div>
//     </div>
//   );
// };

// export default GridBackground;



// import React from 'react';

// const GridBackground = ({ children }) => {
//   return (
//     <div className="relative min-h-screen overflow-hidden bg-[#0e0a1f] text-white">
//       {/* Grid dots */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
//           <defs>
//             <pattern
//               id="dotPattern"
//               width="50"
//               height="50"
//               patternUnits="userSpaceOnUse"
//             >
//               <circle cx="1" cy="1" r="1.5" fill="rgba(255,255,255,0.06)" />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#dotPattern)" />
//         </svg>
//       </div>

//       {/* Aurora blobs */}
//       <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
//         <div className="aurora aurora-1" />
//         <div className="aurora aurora-2" />
//         <div className="aurora aurora-3" />
//       </div>

//       <div className="relative z-10">{children}</div>
//     </div>
//   );
// };

// export default GridBackground;


import React from 'react';
import './GridBackground.css'; // <- Add custom styles separately

const generateStars = (count = 80) =>
  Array.from({ length: count }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1, // 1px - 3px
    opacity: Math.random() * 0.3 + 0.2, // 0.2 - 0.5
    delay: `${Math.random() * 5}s`,
  }));

const GridBackground = ({ children }) => {
  const stars = generateStars();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0e0a1f] text-white">
      {/* Dot Grid Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="w-full h-full">
          <defs>
            <pattern id="dotPattern" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1.5" fill="rgba(255,255,255,0.06)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
      </div>

      {/* Aurora Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
      </div>

      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 z-0 animate-gradient-mesh mix-blend-overlay opacity-[0.04]" />

      {/* Stars / Sparkles */}
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: 'white',
            opacity: star.opacity,
            animationDelay: star.delay,
          }}
        />
      ))}

      {/* Glass/Noise Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[url('/noise.png')] opacity-[0.015] mix-blend-overlay" />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GridBackground;
