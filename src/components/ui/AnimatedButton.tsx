"use client";

// src/components/ui/AnimatedButton.tsx
import React from 'react';
import Button, { ButtonProps } from './Button';

interface AnimatedButtonProps extends ButtonProps {
  animationType?: 'scale' | 'bounce' | 'pulse' | 'shine' | 'glow';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  animationType = 'scale',
  className = '',
  ...props 
}) => {
  // Animation class based on animation type
  const animationClasses = {
    scale: 'transition-transform duration-300 hover:scale-105 active:scale-95',
    bounce: 'hover:animate-bounce',
    pulse: 'hover:animate-pulse',
    shine: 'relative overflow-hidden hover:before:absolute hover:before:content-[""] hover:before:top-0 hover:before:right-0 hover:before:w-12 hover:before:h-full hover:before:bg-white hover:before:bg-opacity-30 hover:before:transform hover:before:-skew-x-30 hover:before:animate-shine',
    glow: 'transition-all duration-300 hover:shadow-glow-purple hover:-translate-y-0.5 active:translate-y-0 active:scale-95',
  };

  return (
    <Button
      className={`${animationClasses[animationType]} ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AnimatedButton;