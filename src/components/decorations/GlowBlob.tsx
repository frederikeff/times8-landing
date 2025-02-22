// src/components/decorations/GlowBlob.tsx
import React from 'react';

type BlobPosition = 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right';
type BlobSize = 'sm' | 'md' | 'lg' | 'xl';
type BlobColor = 'purple' | 'white' | 'blue';

interface GlowBlobProps {
  position?: BlobPosition;
  size?: BlobSize;
  color?: BlobColor;
  className?: string;
  animate?: boolean;
  opacity?: number;
}

const GlowBlob: React.FC<GlowBlobProps> = ({
  position = 'top-right',
  size = 'lg',
  color = 'purple',
  className = '',
  animate = true,
  opacity = 20,
}) => {
  // Position classes
  const positionClasses = {
    'top-right': '-top-16 -right-16',
    'bottom-left': '-bottom-16 -left-16',
    'top-left': '-top-16 -left-16',
    'bottom-right': '-bottom-16 -right-16',
  };

  // Size classes
  const sizeClasses = {
    sm: 'w-32 h-32 md:w-48 md:h-48',
    md: 'w-48 h-48 md:w-64 md:h-64',
    lg: 'w-64 h-64 md:w-96 md:h-96',
    xl: 'w-96 h-96 md:w-[32rem] md:h-[32rem]',
  };

  // Color classes
  const colorClasses = {
    purple: 'fill-times8-purple',
    white: 'fill-white',
    blue: 'fill-blue-500',
  };

  // Rotation based on position
  const rotationClasses = {
    'top-right': 'rotate-45',
    'bottom-left': '-rotate-45',
    'top-left': '-rotate-135',
    'bottom-right': 'rotate-135',
  };

  // Animation
  const animationClass = animate ? 'animate-pulse-slow' : '';

  return (
    <div
      className={`absolute ${positionClasses[position]} ${sizeClasses[size]} opacity-${opacity} dark:opacity-${opacity/2} pointer-events-none z-0 ${className}`}
    >
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full ${colorClasses[color]} transform ${rotationClasses[position]} ${animationClass} filter blur-md`}
      >
        <path d="M52.6,-59.4C64.9,-47.1,69.7,-28.9,71,-11.2C72.3,6.5,70.2,23.7,60.9,35.5C51.5,47.3,35,53.8,17.9,59.9C0.9,66,-16.8,71.8,-30.4,67C-44,62.2,-53.5,46.8,-62.3,30.1C-71.1,13.3,-79.1,-4.7,-75,-19.7C-70.9,-34.6,-54.6,-46.4,-39,-54.3C-23.3,-62.2,-8.2,-66.3,7.3,-74.3C22.8,-82.2,40.3,-71.7,52.6,-59.4Z" transform="translate(100 100)" />
      </svg>
    </div>
  );
};

// Export a second blob type with a different shape
export const CircleBlob: React.FC<GlowBlobProps> = (props) => {
  return (
    <GlowBlob {...props}>
      <path d="M42.7,-73.2C56.7,-67.7,70.3,-58.2,74.9,-45.4C79.6,-32.6,75.3,-16.3,71.1,-2.4C66.9,11.5,62.8,23.1,56.6,34C50.3,44.9,42,55.1,31.2,60.8C20.4,66.4,7.1,67.5,-5.9,66.9C-18.9,66.3,-37.8,64,-50,54.9C-62.2,45.8,-67.6,29.8,-72.2,13.1C-76.7,-3.6,-80.3,-21,-76.1,-37C-71.9,-53,-59.8,-67.5,-45.2,-72.8C-30.5,-78.1,-15.3,-74.1,-0.3,-73.5C14.7,-73,29.4,-75.8,42.7,-73.2Z" transform="translate(100 100)" />
    </GlowBlob>
  );
};

// Decorations container that composes multiple blobs
export const Decorations: React.FC = () => {
  return (
    <>
      <GlowBlob 
        position="top-right" 
        size="lg" 
        color="purple" 
        opacity={10}
        animate={true}
      />
      <GlowBlob 
        position="bottom-left" 
        size="md" 
        color="blue" 
        opacity={5}
        animate={true}
      />
      <CircleBlob 
        position="top-left" 
        size="sm" 
        color="white" 
        opacity={5}
        animate={false}
      />
    </>
  );
};

export default GlowBlob;