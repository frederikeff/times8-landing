// src/components/NewsletterSignup.tsx
"use client";

import React, { useState } from 'react';
import AnimatedButton from './ui/AnimatedButton';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    try {
      setStatus('loading');
      
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus('success');
        setMessage('Thanks for subscribing!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="px-4 py-3 bg-white/10 border border-white/20 backdrop-blur-sm rounded-md focus:outline-none focus:ring-2 focus:ring-times8-purple focus:border-transparent w-full sm:w-auto text-adaptive placeholder:text-white/50"
          required
          disabled={status === 'loading'}
        />
        <AnimatedButton 
          variant="adaptive"
          size="lg"
          animationType="shine"
          type="submit"
          className="button-glow"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </AnimatedButton>
      </form>
      
      {status === 'success' && (
        <p className="text-sm text-green-400 mt-4 text-center">{message}</p>
      )}
      
      {status === 'error' && (
        <p className="text-sm text-red-400 mt-4 text-center">{message}</p>
      )}
      
      <p className="text-sm text-white/50 mt-4 text-center">
        We respect your privacy and will never share your information.
      </p>
    </div>
  );
};

export default NewsletterSignup;