"use client";

// src/components/ui/Button.tsx
import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'white' | 'adaptive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  // Base classes all buttons share
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Variant-specific classes
  const variantClasses = {
    primary: 'bg-times8-purple hover:bg-times8-purple-dark text-white focus:ring-times8-purple hover:shadow-glow-purple',
    secondary: 'bg-white/10 dark:bg-dark-bg-tertiary hover:bg-white/20 dark:hover:bg-dark-border text-white dark:text-white border border-white/30 dark:border-dark-border focus:ring-times8-purple hover:shadow-glow-purple',
    outline: 'bg-transparent hover:bg-times8-purple/10 text-times8-purple border border-times8-purple focus:ring-times8-purple hover:shadow-glow-purple',
    ghost: 'bg-transparent hover:bg-white/10 dark:hover:bg-dark-bg-tertiary text-white dark:text-gray-300 focus:ring-times8-purple hover:shadow-glow-purple',
    white: 'bg-white hover:bg-white text-black border border-white/10 focus:ring-times8-purple hover:shadow-glow-purple',
    adaptive: 'bg-black hover:bg-black/90 text-white dark:bg-white dark:hover:bg-white/90 dark:text-black border border-transparent focus:ring-times8-purple hover:shadow-glow-purple',
  };
  
  // Size-specific classes
  const sizeClasses = {
    sm: 'text-sm px-3 py-2',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };
  
  // Full width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;