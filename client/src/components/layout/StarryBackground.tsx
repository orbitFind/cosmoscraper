import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

// Function to generate a random number within a given range
const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate an array of star positions
const generateStars = (count: number) => {
  return Array.from({ length: count }, () => ({
    x: randomNumber(0, 100), // Percentage positions
    y: randomNumber(0, 100),
    size: randomNumber(1, 3), // Star size in pixels
  }));
};

// Keyframes for zoom and twinkle animations
const zoomKeyframes = `
  @keyframes zoom {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.5);
    }
  }
`;

const twinkleKeyframes = `
  @keyframes twinkle {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
`;

const StarryBackground = () => {
  const [styleInjected, setStyleInjected] = useState(false);
  const [stars] = useState(() => generateStars(600)); // Generate stars initially

  useEffect(() => {
    if (!styleInjected) {
      const styleTag = document.createElement('style');
      styleTag.type = 'text/css';
      styleTag.appendChild(document.createTextNode(zoomKeyframes));
      styleTag.appendChild(document.createTextNode(twinkleKeyframes));
      styleTag.id = 'animation-keyframes';
      document.head.appendChild(styleTag);
      setStyleInjected(true);
    }
  }, [styleInjected]);

  const backgroundStyle = {
    background: 'linear-gradient(180deg, #000000 0%, #1b1b2f 50%, #232946 100%)',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1, // Ensure background is behind other content
    overflow: 'hidden',
    animation: 'zoom 30s alternate infinite',
  };

  const starStyle = (x: number, y: number, size: number) => ({
    position: 'absolute',
    top: `${y}%`,
    left: `${x}%`,
    height: `${size}px`,
    width: `${size}px`,
    backgroundColor: '#fff',
    borderRadius: '50%',
    boxShadow: `0 0 ${size}px rgba(255, 255, 255, 0.8)`,
    animation: 'twinkle 3s infinite',
  });

  return (
    <Box sx={backgroundStyle}>
      {stars.map((star, index) => (
        <Box
          key={index}
          sx={starStyle(star.x, star.y, star.size)}
        />
      ))}
    </Box>
  );
};

export default StarryBackground;
