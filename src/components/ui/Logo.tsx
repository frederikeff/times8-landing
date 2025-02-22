// src/components/ui/Logo.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  const [darkMode, setDarkMode] = useState(true);
  
  // Check for dark mode on mount and when it changes
  useEffect(() => {
    // Function to check dark mode
    const checkDarkMode = () => {
      setDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    // Initial check
    checkDarkMode();
    
    // Create observer to watch for class changes on html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === 'class' &&
          mutation.target === document.documentElement
        ) {
          checkDarkMode();
        }
      });
    });
    
    // Start observing
    observer.observe(document.documentElement, { attributes: true });
    
    // Clean up
    return () => observer.disconnect();
  }, []);

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <div className="relative h-8 w-32 md:h-10 md:w-40">
        <Image
          src={darkMode ? "/logo-white.png" : "/logo-black.png"}
          alt="times8 Logo"
          fill
          priority
          sizes="(max-width: 768px) 128px, 160px"
          className="object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;