"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AnimatedButton from '@/components/ui/AnimatedButton';

type ConfirmationState = {
  status: 'loading' | 'success' | 'error';
  error?: string;
};

// Separate component for the content that uses searchParams
const ConfirmedContent = () => {
  const searchParams = useSearchParams();
  const [confirmationState, setConfirmationState] = useState<ConfirmationState>({
    status: 'loading'
  });

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setConfirmationState({
        status: 'error',
        error: 'Invalid confirmation link'
      });
      return;
    }

    const confirmSubscription = async () => {
      try {
        const response = await fetch(`/api/newsletter/confirm?token=${token}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to confirm your subscription');
        }

        setConfirmationState({
          status: 'success'
        });
      } catch (error) {
        setConfirmationState({
          status: 'error',
          error: error instanceof Error ? error.message : 'Something went wrong'
        });
      }
    };

    confirmSubscription();
  }, [searchParams]);

  if (confirmationState.status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-8">
          <div className="w-20 h-20 rounded-full bg-red-500/20 mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-adaptive">Oops! Something went wrong</h1>
          <p className="text-adaptive-secondary mb-8">{confirmationState.error}</p>
          <Link href="/">
            <AnimatedButton variant="adaptive" size="md" animationType="scale">
              Back to Home
            </AnimatedButton>
          </Link>
        </div>
      </div>
    );
  }

  if (confirmationState.status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-8">
          <div className="w-20 h-20 rounded-full bg-times8-purple/20 mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-times8-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold mb-2 text-adaptive">You are subscribed!</h1>
          <p className="text-adaptive-secondary mb-6">
            Welcome to the Times8 newsletter community. You will start receiving insights and updates soon!
          </p>
          
          <div className="bg-times8-purple/10 border border-times8-purple/20 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold mb-3 text-adaptive">What to expect:</h2>
            <ul className="text-adaptive-secondary text-left space-y-2">
              <li>• Network building strategies</li>
              <li>• Relationship management tips</li>
              <li>• AI and tech insights</li>
              <li>• Exclusive event invitations</li>
            </ul>
          </div>
          
          <p className="text-adaptive-secondary mb-8">
            Connect with us on social media:
          </p>
          
          <div className="flex justify-center space-x-4 mb-8">
            <a href="https://linkedin.com/company/times8" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/70 hover:text-times8-purple transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            
            <a href="https://instagram.com/times8_nyc" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/70 hover:text-times8-purple transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
          
          <Link href="/">
            <AnimatedButton variant="adaptive" size="md" animationType="scale">
              Back to Home
            </AnimatedButton>
          </Link>
        </div>
      </div>
    );
  }

  // Loading state
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md p-8">
        <div className="w-20 h-20 rounded-full bg-times8-purple/20 mx-auto mb-6 flex items-center justify-center animate-pulse">
          <svg className="w-10 h-10 text-times8-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-adaptive">Confirming your subscription...</h1>
      </div>
    </div>
  );
};

// Main page component with Suspense
export default function NewsletterConfirmedPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md p-8">
            <div className="w-20 h-20 rounded-full bg-times8-purple/20 mx-auto mb-6 flex items-center justify-center animate-pulse">
              <svg className="w-10 h-10 text-times8-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-adaptive">Loading...</h1>
          </div>
        </div>
      }
    >
      <ConfirmedContent />
    </Suspense>
  );
}