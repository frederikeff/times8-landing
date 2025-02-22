"use client";

// src/components/layout/Background.tsx
import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main dark background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-zinc-900"></div>
      
      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-times8-purple/20 rounded-full filter blur-[100px] opacity-50 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-times8-purple/30 rounded-full filter blur-[80px] opacity-30 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full filter blur-[120px] opacity-30 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-times8-purple/30 rounded-full filter blur-[100px] opacity-40 animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
      
      {/* Optional subtle noise texture for more depth */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light"></div>
    </div>
  );
};

export default Background;