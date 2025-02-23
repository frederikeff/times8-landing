// src/app/ai/check-email/page.tsx
"use client";

import React from 'react';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function CheckEmailPage() {
  const openEmailClient = (provider: 'gmail' | 'outlook') => {
    const urls = {
      gmail: 'https://mail.google.com/mail/u/0/#search/from%3Atimes8',
      outlook: 'https://outlook.live.com/mail/0/inbox'
    };
    window.open(urls[provider], '_blank');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md p-8">
        <div className="w-20 h-20 rounded-full bg-times8-purple/20 mx-auto mb-6 flex items-center justify-center">
          <svg className="w-10 h-10 text-times8-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold mb-4 text-adaptive">Thanks for signing up!</h1>
        <p className="text-adaptive-secondary mb-8">
          Check your email to confirm your subscription. 
          Don&apos;t forget to check your spam folder!
        </p>
        
        <div className="space-y-4">
          <AnimatedButton 
            variant="adaptive"
            size="lg"
            animationType="glow"
            className="w-full button-glow"
            onClick={() => openEmailClient('gmail')}
          >
            Open Gmail
          </AnimatedButton>
          
          <AnimatedButton 
            variant="adaptive"
            size="lg"
            animationType="glow"
            className="w-full button-glow"
            onClick={() => openEmailClient('outlook')}
          >
            Open Outlook
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
}