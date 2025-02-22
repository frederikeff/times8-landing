// src/app/ai/page.tsx
"use client";

import React, { useState } from 'react';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function AIPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/waitlist', {
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

  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-adaptive">
              AI Relationship <span className="bg-times8-purple px-2 pb-1 transform -rotate-1 inline-block">Manager</span>
            </h1>
            <p className="text-adaptive-secondary text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Sign up for our waitlist to get early access to our relationship management tool.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-times8-purple text-adaptive w-full"
                required
              />
              <AnimatedButton
                variant="adaptive"
                size="md"
                animationType="glow"
                className="button-glow sm:w-auto"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </AnimatedButton>
            </form>
            
            {submitStatus === 'success' && (
              <p className="text-green-500 mt-4">
                Thanks for joining! We'll notify you when early access is available.
              </p>
            )}
            
            {submitStatus === 'error' && (
              <p className="text-red-500 mt-4">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Benefit 1 */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-2/5">
                <div className="bg-times8-purple/10 border border-times8-purple/20 rounded-lg aspect-video flex items-center justify-center">
                  <svg className="w-20 h-20 text-times8-purple/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                </div>
              </div>
              <div className="md:w-3/5">
                <h2 className="text-2xl font-bold mb-3 text-adaptive">Effortless Data Entry</h2>
                <p className="text-adaptive-secondary">
                  No more manual button-by-button data entry. You write, speak, or integrate your data insights, and our AI takes care of sorting, filtering, and connecting your data points for you.
                </p>
              </div>
            </div>
            
            {/* Benefit 2 */}
            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
              <div className="md:w-2/5">
                <div className="bg-times8-purple/10 border border-times8-purple/20 rounded-lg aspect-video flex items-center justify-center">
                  <svg className="w-20 h-20 text-times8-purple/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                  </svg>
                </div>
              </div>
              <div className="md:w-3/5">
                <h2 className="text-2xl font-bold mb-3 text-adaptive">Smart Network Mapping</h2>
                <p className="text-adaptive-secondary">
                  No idea how your network interconnects? We show you the smartest paths to the people that move the needle for you. Our network/relationship graphs make visible all the paths that are otherwise hidden in stiff tables and inflexible data points.
                </p>
              </div>
            </div>
            
            {/* Benefit 3 */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-2/5">
                <div className="bg-times8-purple/10 border border-times8-purple/20 rounded-lg aspect-video flex items-center justify-center">
                  <svg className="w-20 h-20 text-times8-purple/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                  </svg>
                </div>
              </div>
              <div className="md:w-3/5">
                <h2 className="text-2xl font-bold mb-3 text-adaptive">Streamlined Data Integration</h2>
                <p className="text-adaptive-secondary">
                  We streamline your data - no more data ends without connections, we bring them all under one roof. With seamless real-time integrations and data updates, you can focus on building relationships and making connections that matter.
                </p>
              </div>
            </div>
            
            {/* Benefit 4 */}
            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
              <div className="md:w-2/5">
                <div className="bg-times8-purple/10 border border-times8-purple/20 rounded-lg aspect-video flex items-center justify-center">
                  <svg className="w-20 h-20 text-times8-purple/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                </div>
              </div>
              <div className="md:w-3/5">
                <h2 className="text-2xl font-bold mb-3 text-adaptive">One Tool, Multiple Solutions</h2>
                <p className="text-adaptive-secondary">
                  120+ tools scattered across your relationship data, with plugins and overcomplicated features? We simplify that for you. One tool to manage your relationships with various AI agents that do what you need to nurture and grow your network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white/5 dark:bg-black/20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-adaptive">How It Works</h2>
            
            <div className="flex flex-col md:flex-row gap-8 justify-between">
              <div className="flex-1 text-center">
                <div className="w-16 h-16 rounded-full bg-times8-purple/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-times8-purple">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-adaptive">Onboard Your Data</h3>
                <p className="text-sm text-adaptive-secondary">Connect your existing tools and import your key relationship data.</p>
              </div>
              
              <div className="flex-1 text-center">
                <div className="w-16 h-16 rounded-full bg-times8-purple/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-times8-purple">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-adaptive">Start Asking Questions</h3>
                <p className="text-sm text-adaptive-secondary">Get insights and visualization of your network with a simple conversation.</p>
              </div>
              
              <div className="flex-1 text-center">
                <div className="w-16 h-16 rounded-full bg-times8-purple/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-times8-purple">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-adaptive">Connect Helper Agents</h3>
                <p className="text-sm text-adaptive-secondary">Add AI agents specialized for your specific relationship needs.</p>
              </div>
            </div>
            
            <div className="text-center mt-16">
              <AnimatedButton
                variant="adaptive"
                size="lg"
                animationType="glow"
                className="button-glow"
                onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Join the Waitlist
              </AnimatedButton>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section id="waitlist-form" className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-adaptive">Ready to Transform Your Relationships?</h2>
            <p className="text-adaptive-secondary mb-8">
              Be among the first to experience our AI Relationship Manager. Early access members will receive special benefits and priority support.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-times8-purple text-adaptive"
                required
              />
              <AnimatedButton
                variant="adaptive"
                size="lg"
                animationType="glow"
                className="button-glow w-full"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </AnimatedButton>
              
              {submitStatus === 'success' && (
                <p className="text-green-500 mt-4">
                  Thanks for joining! We'll notify you when early access is available.
                </p>
              )}
              
              {submitStatus === 'error' && (
                <p className="text-red-500 mt-4">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}