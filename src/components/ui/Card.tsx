"use client";

// src/components/ui/Card.tsx
import React from 'react';
import Image from 'next/image';
import Button from './Button';

export type CardVariant = 'default' | 'featured' | 'dark';

export interface CardProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  imageSrc?: string;
  imageAlt?: string;
  variant?: CardVariant;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  imageSrc,
  imageAlt,
  variant = 'default',
  className = '',
  ...props
}) => {
  // Base card classes
  const baseClasses = 'rounded-lg overflow-hidden transition-all duration-300';
  
  // Card variants
  const variantClasses = {
    default: 'bg-white dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border',
    featured: 'bg-white dark:bg-dark-bg-secondary border-2 border-times8-purple shadow-lg',
    dark: 'bg-dark-bg-tertiary border border-dark-border text-white',
  };
  
  // Image position variants - change these as needed
  const imagePosition = variant === 'featured' ? 'top' : 'bottom';
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {/* Conditional rendering based on image position */}
      {imagePosition === 'top' && imageSrc && (
        <div className="relative w-full h-48 sm:h-56 md:h-64">
          <Image
            src={imageSrc}
            alt={imageAlt || title || "Card image"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        {title && (
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            {title}
          </h3>
        )}
        
        {description && (
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            {description}
          </p>
        )}
        
        {buttonText && (
          <div className="mt-4">
            <Button 
              variant={variant === 'featured' ? 'primary' : 'secondary'}
              size="md"
              onClick={() => buttonLink && window.open(buttonLink, '_blank')}
            >
              {buttonText}
            </Button>
          </div>
        )}
      </div>
      
      {/* Image at bottom if specified */}
      {imagePosition === 'bottom' && imageSrc && (
        <div className="relative w-full h-48 sm:h-56 md:h-64">
          <Image
            src={imageSrc}
            alt={imageAlt || title || "Card image"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default Card;