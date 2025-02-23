// src/components/sections/TestimonialCard.tsx
import React from 'react';

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  variant?: 'circle' | 'square' | 'triangle';
}

const getShapeIcon = (variant: 'circle' | 'square' | 'triangle' = 'circle') => {
  switch (variant) {
    case 'circle':
      return (
        <svg className="w-6 h-6 text-times8-purple" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
    case 'square':
      return (
        <svg className="w-6 h-6 text-times8-purple" viewBox="0 0 24 24" fill="currentColor">
          <rect x="4" y="4" width="16" height="16" rx="2" />
        </svg>
      );
    case 'triangle':
      return (
        <svg className="w-6 h-6 text-times8-purple" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3L22 19H2L12 3Z" />
        </svg>
      );
  }
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  quote,
  variant = 'circle'
}) => {
  return (
    <div className="glass p-6 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-purple/20">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-times8-purple/10 border border-times8-purple/20 mr-4 flex items-center justify-center">
          {getShapeIcon(variant)}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-white/60">{role}</p>
        </div>
      </div>
      <p className="text-gray-600 dark:text-white/80 italic">{quote}</p>
    </div>
  );
};

export default TestimonialCard;