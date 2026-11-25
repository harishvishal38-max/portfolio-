import React from 'react';

export default function ModernBackground({ bgImageUrl }) {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#0b0f19]">
      {/* Optional Custom Background Image with Subtle Clean Overlay */}
      {bgImageUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 filter grayscale"
          style={{ backgroundImage: `url(${bgImageUrl})` }}
        />
      ) : null}

      {/* Subtle Modern Tech Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Soft Ambient Radial Light Accents for Modern Depth (No space or planets) */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
    </div>
  );
}
