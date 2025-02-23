// src/components/sections/FaqQuestion.tsx
import React from 'react';

interface FaqQuestionProps {
  question: string;
  answer: string;
}

const FaqQuestion: React.FC<FaqQuestionProps> = ({
  question,
  answer,
}) => {
  return (
    <div className="glass p-6 rounded-lg transition-all duration-300 hover:shadow-glow-purple/20">
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{question}</h3>
      <p className="text-gray-600 dark:text-white/80">{answer}</p>
    </div>
  );
};

export default FaqQuestion;