//main grid whihc made by param

// import React from 'react';
// import './GridBackground.css';
// import StarsLayer from './StarLayer'

// const GridBackground = ({ children }) => {
//   return (
//     <div className="relative min-h-screen overflow-hidden bg-[#0e0a1f] text-white">
//       {/* Dot Grid Pattern */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <svg className="w-full h-full">
//           <defs>
//             <pattern id="dotPattern" width="50" height="50" patternUnits="userSpaceOnUse">
//               <circle cx="1" cy="1" r="1.5" fill="rgba(255,255,255,0.06)" />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#dotPattern)" />
//         </svg>
//       </div>

//       {/* Aurora Blobs */}
//       <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
//         <div className="aurora aurora-1" />
//         <div className="aurora aurora-2" />
//         <div className="aurora aurora-3" />
//       </div>

//       {/* Gradient Mesh Background */}
//       <div className="absolute inset-0 z-0 animate-gradient-mesh mix-blend-overlay opacity-[0.04]" />

//       {/* Stars / Sparkles */}
//       <StarsLayer />

//       {/* Noise Layer */}
//       <div className="absolute inset-0 z-0 pointer-events-none bg-[url('/noise.png')] opacity-[0.015] mix-blend-overlay" />

//       <div className="relative z-10">{children}</div>
//     </div>
//   );
// };

// export default GridBackground;


//made by purv

import React, { useMemo } from 'react';

const GridBackground = ({ children }) => {
  // Generate stars positions once and memoize them
  const stars = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      size: Math.random() * 2 + 1
    }));
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0e0a1f] via-[#1a0e2a] to-[#0e0a1f] text-white">
      {/* Optimized Dot Grid using CSS background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-300"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Simplified Aurora Effects using CSS gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Aurora 1 */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20 animate-pulse"
          style={{
            top: '-10%',
            left: '-5%',
            background: 'radial-gradient(circle, rgba(255, 0, 150, 0.6) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'float1 25s ease-in-out infinite'
          }}
        />
        
        {/* Aurora 2 */}
        <div 
          className="absolute w-80 h-80 rounded-full opacity-15"
          style={{
            bottom: '-15%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(0, 200, 255, 0.5) 0%, transparent 70%)',
            filter: 'blur(50px)',
            animation: 'float2 30s ease-in-out infinite'
          }}
        />
        
        {/* Aurora 3 */}
        <div 
          className="absolute w-64 h-64 rounded-full opacity-10"
          style={{
            top: '20%',
            right: '30%',
            background: 'radial-gradient(circle, rgba(0, 255, 150, 0.4) 0%, transparent 70%)',
            filter: 'blur(40px)',
            animation: 'float3 20s ease-in-out infinite'
          }}
        />
      </div>

      {/* Optimized Moving Gradient */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-5"
        style={{
          background: 'linear-gradient(-45deg, #ff4ecd, #00ffe5, #1a0e2a, #ff4ecd)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 25s ease infinite'
        }}
      />

      {/* Optimized Stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.animationDelay}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>

      {/* Subtle Texture Overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.03) 2px,
              rgba(255,255,255,0.03) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.03) 2px,
              rgba(255,255,255,0.03) 4px
            )
          `
        }}
      />

      <div className="relative z-10">{children}</div>

      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          33% { transform: translateY(-30px) translateX(20px) scale(1.1); }
          66% { transform: translateY(15px) translateX(-15px) scale(0.9); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          50% { transform: translateY(-25px) translateX(-20px) scale(1.05); }
        }
        
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          25% { transform: translateY(20px) translateX(15px) scale(1.1); }
          75% { transform: translateY(-10px) translateX(-10px) scale(0.95); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};
export default GridBackground;





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



