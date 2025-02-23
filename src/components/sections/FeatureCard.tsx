// src/components/sections/FeatureCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedButton from '@/components/ui/AnimatedButton';

interface FeatureCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  imageAlt: string;
  featured?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  imageSrc,
  imageAlt,
  featured = false,
}) => {
  return (
    <div className={`bg-white/50 dark:bg-transparent p-6 rounded-lg hover:shadow-glow-purple 
      transition-all duration-300 dark:hover:bg-white/5 
      ${featured ? 'ring-1 ring-times8-purple' : 'border border-gray-200/50 dark:border-white/10'}`}>
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-white/80 mb-6">
        {description}
      </p>
      <Link href={buttonLink}>
        <AnimatedButton 
          variant={featured ? "white" : "adaptive"}
          animationType={featured ? "glow" : "scale"}
          className="text-black hover:shadow-glow-purple"
        >
          {buttonText}
        </AnimatedButton>
      </Link>
      
      <div className="mt-6 relative h-40 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-times8-purple/30"></div>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default FeatureCard;