"use client";

// src/components/layout/MobileMenu.tsx
import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavLink } from './Navbar';
import Button from '../ui/Button';
import Logo from '../ui/Logo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  onClose, 
  links,
  darkMode,
  toggleDarkMode
}) => {
  const pathname = usePathname();
  
  // Control body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // If menu is closed, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Slide-out panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-xs glass-dark shadow-xl 
                  transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="flex items-center justify-between px-4 pt-5 pb-2">
            <div className="flex items-center">
            <Logo />
            </div>
            <button
              type="button"
              className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
              onClick={onClose}
            >
              <span className="sr-only">Close menu</span>
              <svg 
                className="h-6 w-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Dark mode toggle in mobile menu */}
          <div className="px-4 pt-2 pb-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Appearance</span>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <div className="flex items-center">
                  {darkMode ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">Light mode</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                      <span className="text-sm">Dark mode</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
          
          {/* Menu items */}
          <div className="px-4 py-6 space-y-6 flex-1">
            <nav className="grid gap-y-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`-m-3 p-3 flex items-center rounded-md text-base font-medium transition duration-150 ease-in-out
                            ${pathname === link.href 
                              ? 'bg-times8-purple/10 text-times8-purple' 
                              : 'text-white hover:bg-white/5'
                            }`}
                  onClick={onClose}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="px-4 py-6 border-t border-white/10">
            <Link href="/ai">
                <Button variant="white" fullWidth className="hover:shadow-glow-purple text-black">
                Join Beta
                </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;