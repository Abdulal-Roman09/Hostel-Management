import React from 'react';

const Dot = () => {
  // Generate 20 random dots
  const dots = Array.from({ length: 20 }, (_, i) => {
    const top = Math.floor(Math.random() * 100); // 0–100%
    const left = Math.floor(Math.random() * 100); // 0–100%
    const size = Math.floor(Math.random() * 11) + 10; // size: 10–20px
    const colors = [
      'bg-orange-200',
      'bg-orange-300',
      'bg-orange-400',
      'bg-orange-500',
      'bg-orange-600',
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return (
      <div
        key={i}
        className={`absolute rounded-full ${color}`}
        style={{
          top: `${top}%`,
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: 0.6,
          zIndex: 0,
        }}
      />
    );
  });

  // return <div className="absolute inset-0 pointer-events-none z-0">{dots}</div>;
};

export default Dot;
