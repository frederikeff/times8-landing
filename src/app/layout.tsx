// src/app/layout.tsx
import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Background from '@/components/layout/Background';
import './globals.css';

// Initialize fonts
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'times8 - Your NYC Club + AI Relationship Companion',
  description: 'Join our exclusive NYC Club to build relationships and use our AI tool to find those connections you may miss otherwise!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col bg-black text-white`}>
        {/* Smooth background with glowing effects */}
        <Background />
        
        {/* Glass navbar */}
        <Navbar />
        
        {/* Main content */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Glass footer */}
        <Footer />
      </body>
    </html>
  );
}
