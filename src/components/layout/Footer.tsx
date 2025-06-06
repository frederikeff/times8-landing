// src/components/layout/Footer.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import AnimatedButton from '@/components/ui/AnimatedButton';

const Footer: React.FC = () => {
  // Add these states for the form
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  // Beehiiv form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navigation links - keep in sync with Navbar
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'NYC Club', href: '/club' },
    { name: 'Relationship AI', href: '/ai' },
    { name: 'Consulting', href: '/consulting' },
    { name: 'About', href: '/about' },
  ];

  // Legal links
  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ];

  return (
    <footer className="relative">
      {/* Subtle top divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-times8-purple/50 to-transparent"></div>
      
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and description */}
          <div className="col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold">
                <span className="text-times8-purple">times8</span>
              </span>
            </Link>
            <p className="text-adaptive-secondary text-sm">
              Join our exclusive NYC Club to build relationships and use our AI tool to find those connections you may miss otherwise!
            </p>
            <p className="text-adaptive-secondary/70 text-sm mt-4">
              ©2025 All rights reserved by NxtOf NRM
            </p>
          </div>
          
          {/* Navigation links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold mb-4 text-adaptive">Explore</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-adaptive-secondary hover:text-times8-purple transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold mb-4 text-adaptive">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-adaptive-secondary hover:text-times8-purple transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social links and newsletter */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold mb-4 text-adaptive">Connect</h3>
            <div className="flex space-x-4 mb-6">
              
              {/* Instagram */}
              <a
                href="https://www.instagram.com/times8_nyc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-adaptive-secondary hover:text-times8-purple transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/times8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-adaptive-secondary hover:text-times8-purple transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
            
            {/* Newsletter signup - updated for Beehiiv */}
            <h3 className="text-sm font-semibold mb-2 text-adaptive">Stay Updated</h3>
            <form className="mt-2" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-sm focus:ring-2 focus:ring-times8-purple focus:border-transparent outline-none text-adaptive placeholder:text-white/50"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
                <AnimatedButton
                  variant="adaptive"
                  size="sm"
                  animationType="glow"
                  type="submit"
                  className="button-glow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </AnimatedButton>
                
                {submitStatus === 'success' && (
                  <p className="text-green-500 text-xs mt-1">Successfully subscribed!</p>
                )}
                
                {submitStatus === 'error' && (
                  <p className="text-red-500 text-xs mt-1">Something went wrong. Please try again.</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;