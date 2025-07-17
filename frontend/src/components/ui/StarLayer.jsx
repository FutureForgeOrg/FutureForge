import React, { useMemo } from 'react';

const generateStars = (count = 80) =>
  Array.from({ length: count }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.3 + 0.2,
    delay: `${Math.random() * 5}s`,
  }));

const StarsLayer = () => {
  const stars = useMemo(() => generateStars(), []); // generate once

  return (
    <>
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
    </>
  );
};

export default StarsLayer;
