// src/app/consulting/page.tsx
"use client";

import React, { useState } from 'react';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function ConsultingPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        inquiryType: '',
        message: ''
      });
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
          const response = await fetch('/api/consulting', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
          
          if (response.ok) {
            setSubmitStatus('success');
            setFormData({
              name: '',
              email: '',
              inquiryType: '',
              message: ''
            });
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
              Relationship <span className="bg-times8-purple px-2 pb-1 transform -rotate-1 inline-block">Consulting</span>
            </h1>
            <p className="text-adaptive-secondary text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Get personalized guidance to build and nurture meaningful professional relationships, no matter where you're located.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-adaptive">How We Can Help</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-times8-purple/20 p-1 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-times8-purple" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-adaptive-secondary">Strategic network building for your specific industry and goals</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-times8-purple/20 p-1 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-times8-purple" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-adaptive-secondary">Relationship mapping to identify key connections you should pursue</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-times8-purple/20 p-1 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-times8-purple" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-adaptive-secondary">Personal brand development to attract valuable connections</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-times8-purple/20 p-1 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-times8-purple" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-adaptive-secondary">Communication coaching for networking and relationship building</p>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-2 text-adaptive">Book a Call</h3>
                  <p className="text-adaptive-secondary mb-4">
                    Schedule a free 15-minute discovery call to discuss your needs and how we can help.
                  </p>
                  <AnimatedButton 
                    variant="adaptive" 
                    size="md" 
                    animationType="glow"
                    className="button-glow"
                    onClick={() => window.open('https://calendar.app.google/XXKorKoNco8dRobe9', '_blank')}
                  >
                    Schedule Call
                  </AnimatedButton>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-adaptive">Tell Us About Your Needs</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-times8-purple text-adaptive"
                      required
                    />
                  </div>
                  
                  <div>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="w-full px-4 py-3 bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-times8-purple text-adaptive"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-adaptive-secondary mb-2">What do you want to achieve?*</label>
                    <select 
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-times8-purple text-adaptive appearance-none"
                        required
                    >
                        <option value="" disabled>Select an inquiry type</option>
                        <option value="Club Membership" className="bg-zinc-900">Club Membership</option>
                        <option value="AI Product Inquiry" className="bg-zinc-900">AI Product Inquiry</option>
                        <option value="Consulting Inquiry" className="bg-zinc-900">Consulting Inquiry</option>
                        <option value="Partnership Inquiry" className="bg-zinc-900">Partnership Inquiry</option>
                        <option value="Speaking Inquiry" className="bg-zinc-900">Speaking Inquiry</option>
                        <option value="Other" className="bg-zinc-900">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your specific needs or challenges"
                      rows={5}
                      className="w-full px-4 py-3 bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-times8-purple text-adaptive"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="pt-2">
                    <AnimatedButton 
                      variant="adaptive" 
                      size="md" 
                      animationType="glow"
                      className="button-glow w-full"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </AnimatedButton>
                    
                    {submitStatus === 'success' && (
                      <p className="mt-4 text-green-500 text-center">Message sent successfully!</p>
                    )}
                    
                    {submitStatus === 'error' && (
                      <p className="mt-4 text-red-500 text-center">There was an error sending your message. Please try again.</p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}