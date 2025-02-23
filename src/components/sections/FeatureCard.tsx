// src/components/sections/FeatureCard.tsx
import React from 'react';
import Link from 'next/link';
import AnimatedButton from '@/components/ui/AnimatedButton';



const getIcon = (title: string) => {
    if (title.includes("Club")) {
      return (
        <svg className="w-24 h-24 text-times8-purple/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    } else if (title.includes("AI")) {
      return (
        <svg className="w-24 h-24 text-times8-purple/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>

      );
    } else if (title.includes("Consulting")) {
      return (
        <svg className="w-24 h-24 text-times8-purple/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
            d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h3a1 1 0 001-1V4z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
            d="M7 13h10M7 17h4m-4-8h10" />
        </svg>
      );
    }
    // Add a default return to ensure we always show something
    return (
        <svg className="w-24 h-24 text-times8-purple/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
          d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>  
    );
  }
  
  interface FeatureCardProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    featured?: boolean;
  }
  
  const FeatureCard: React.FC<FeatureCardProps> = ({
    title,
    description,
    buttonText,
    buttonLink,
    featured = false,
  }) => {
    return (
      <div className={`bg-white/50 dark:bg-transparent p-6 rounded-lg hover:shadow-glow-purple 
          transition-all duration-300 dark:hover:bg-white/5 h-full flex flex-col
          ${featured ? 'ring-1 ring-times8-purple' : 'border border-gray-200/50 dark:border-white/10'}`}>
        {/* Header content */}
        <div className="flex-shrink-0">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
  
        {/* Description - fills available space */}
        <div className="flex-grow mb-6">
          <p className="text-gray-600 dark:text-white/80">
            {description}
          </p>
        </div>
  
        {/* Button and icon - fixed at bottom */}
        <div className="flex-shrink-0">
          <Link href={buttonLink}>
            <AnimatedButton 
              variant={featured ? "white" : "adaptive"}
              animationType={featured ? "glow" : "scale"}
              className="text-black hover:shadow-glow-purple w-full mb-6"
            >
              {buttonText}
            </AnimatedButton>
          </Link>
  
          <div className="aspect-video rounded-lg overflow-hidden bg-times8-purple/10 border border-times8-purple/20 flex items-center justify-center">
            {getIcon(title)}
          </div>
        </div>
      </div>
    );
  };
  
  export default FeatureCard;