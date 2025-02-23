"use client";

// src/components/layout/Background.tsx
import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Adaptive main background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:to-zinc-900"></div>
      
      {/* Enhanced light mode patterns */}
      <div className="absolute inset-0 opacity-30 dark:opacity-0" 
           style={{ 
             backgroundImage: `radial-gradient(circle at 1px 1px, rgba(192, 38, 211, 0.05) 1px, transparent 0)`,
             backgroundSize: '24px 24px' 
           }}>
      </div>
      
      {/* Subtle light mode stripes */}
      <div className="absolute inset-0 opacity-10 dark:opacity-0"
           style={{
             backgroundImage: `linear-gradient(45deg, rgba(192, 38, 211, 0.1) 25%, transparent 25%, transparent 50%, rgba(192, 38, 211, 0.1) 50%, rgba(192, 38, 211, 0.1) 75%, transparent 75%, transparent)`,
             backgroundSize: '100px 100px'
           }}>
      </div>
      
      {/* Adaptive glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-times8-purple/5 dark:bg-times8-purple/20 rounded-full filter blur-[100px] opacity-70 dark:opacity-50 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-pink-500/5 dark:bg-times8-purple/30 rounded-full filter blur-[80px] opacity-50 dark:opacity-30 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-times8-purple/5 dark:bg-pink-500/20 rounded-full filter blur-[120px] opacity-50 dark:opacity-30 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-pink-500/5 dark:bg-times8-purple/30 rounded-full filter blur-[100px] opacity-60 dark:opacity-40 animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
      
      {/* Adaptive noise texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-soft-light"></div>
    </div>
  );
};

export default Background;