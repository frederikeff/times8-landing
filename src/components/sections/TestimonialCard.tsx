// src/components/sections/TestimonialCard.tsx
import React from 'react';

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  quote,
}) => {
  return (
    <div className="glass p-6 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-purple/20">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-times8-purple/30 mr-4"></div>
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