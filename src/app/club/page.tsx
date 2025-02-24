// src/app/club/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function ClubPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    linkedinProfile: '',
    otherProfiles: '',
    goals: '',
    contribution: '',
    identities: [] as string[],
    otherIdentity: '',
    industry: '',
    interests: [] as string[],
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, value]
        : prev.interests.filter(interest => interest !== value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send application data to your API
      const response = await fetch('/api/club-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          linkedinProfile: '',
          otherProfiles: '',
          goals: '',
          contribution: '',
          identities: [] as string[],
          otherIdentity: '',
          industry: '',
          interests: [],
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
              Join the <span className="bg-times8-purple px-2 pb-1 transform -rotate-1 inline-block">times8 Club</span>
            </h1>
            <p className="text-adaptive-secondary text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Connect with builders, innovators and creators in Tech & AI in NYC and build meaningful relationships through curated events and personalized networking.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Benefits with subtle glow */}
            {[
              {
                title: "Personalized Connection Opportunities",
                description: "Get matched with members who align with your professional goals and personal interests, creating meaningful connections that last."
              },
              {
                title: "Curated NYC Events",
                description: "Access to exclusive gatherings, dinners, and mixers designed to facilitate authentic relationship building in unique settings."
              },
              {
                title: "Weekly Relationship Insights",
                description: "Receive our weekly newsletter with relationship-building techniques, event recommendations, and community spotlights."
              },
              {
                title: "Future VIP Access",
                description: "Early members get priority access to our upcoming premium tier, which includes personalized relationship advice and exclusive workshops."
              }
            ].map((benefit, index) => (
              <div 
                key={index} 
                className="bg-times8-purple/5 border border-times8-purple/20 p-6 rounded-lg transition-all duration-300 hover:shadow-glow-purple/20"
              >
                <h3 className="text-xl font-bold mb-4 text-adaptive">{benefit.title}</h3>
                <p className="text-adaptive-secondary mb-4">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application-form" className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-adaptive">Apply to Join times8 Club</h2>
            
            {submitStatus === 'success' ? (
              <div className="text-center p-8 bg-times8-purple/10 rounded-lg border border-times8-purple/30">
                <h3 className="text-2xl font-bold mb-4 text-adaptive">Application Received!</h3>
                <p className="text-adaptive-secondary mb-6">
                  Thank you for your application. We will review it and get back to you within 48 hours.
                </p>
                <p className="text-adaptive-secondary mb-6">
                  In the meantime, check out our <Link href="/relationship-guide" className="text-times8-purple underline">Relationship Guide for NYC</Link>.
                </p>
                <AnimatedButton 
                  variant="adaptive" 
                  size="md" 
                  animationType="glow"
                  className="button-glow"
                  onClick={() => window.open('/', '_self')}
                >
                  Back to Home
                </AnimatedButton>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="fullName" className="block text-adaptive-secondary mb-2">Full Name*</label>
                  <input 
                    type="text" 
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-times8-purple text-adaptive"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-adaptive-secondary mb-2">Email Address*</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-times8-purple text-adaptive"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="linkedinProfile" className="block text-adaptive-secondary mb-2">LinkedIn Profile</label>
                  <input 
                    type="url" 
                    id="linkedinProfile"
                    name="linkedinProfile"
                    value={formData.linkedinProfile}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-times8-purple text-adaptive"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                
                <div>
                  <label htmlFor="otherProfiles" className="block text-adaptive-secondary mb-2">Other Social Profiles/Websites</label>
                  <input 
                    type="text" 
                    id="otherProfiles"
                    name="otherProfiles"
                    value={formData.otherProfiles}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-times8-purple text-adaptive"
                    placeholder="Twitter, Instagram, Personal Website, etc."
                  />
                </div>
                
                <div>
                  <label htmlFor="goals" className="block text-adaptive-secondary mb-2">What are you hoping to achieve through times8 Club?*</label>
                  <textarea 
                    id="goals"
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-times8-purple text-adaptive"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="contribution" className="block text-adaptive-secondary mb-2">What do you bring to the club?*</label>
                  <textarea 
                    id="contribution"
                    name="contribution"
                    value={formData.contribution}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-times8-purple text-adaptive"
                    required
                  ></textarea>
                </div>
                
                <div>
                    <label className="block text-adaptive-secondary mb-2">As what do you identify?*</label>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                        'Innovator', 'Creator', 'Operator', 'Founder', 
                        'Leader', 'Investor', 'Other'
                        ].map((identity) => (
                        <div key={identity} className="flex items-center">
                            <input 
                            type="checkbox" 
                            id={`identity-${identity.toLowerCase()}`}
                            name="identities"
                            value={identity}
                            checked={formData.identities?.includes(identity) || false}
                            onChange={(e) => {
                                const { value, checked } = e.target;
                                setFormData(prev => ({
                                ...prev,
                                identities: checked 
                                    ? [...(prev.identities || []), value]
                                    : (prev.identities || []).filter(id => id !== value)
                                }));
                            }}
                            className="mr-2 text-times8-purple focus:ring-times8-purple"
                            />
                            <label htmlFor={`identity-${identity.toLowerCase()}`} className="text-adaptive-secondary">{identity}</label>
                        </div>
                        ))}
                    </div>
                    
                    {formData.identities?.includes('Other') && (
                        <div className="mt-4">
                        <label htmlFor="otherIdentity" className="block text-adaptive-secondary mb-2">Please specify:</label>
                        <input 
                            type="text" 
                            id="otherIdentity"
                            name="otherIdentity"
                            value={formData.otherIdentity || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-times8-purple text-adaptive"
                            required={formData.identities?.includes('Other')}
                        />
                        </div>
                    )}
                </div>
                
                <div>
                  <label htmlFor="industry" className="block text-adaptive-secondary mb-2">What is your industry?*</label>
                  <input 
                    type="text" 
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-times8-purple text-adaptive"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-adaptive-secondary mb-2">Which communities/topics/circles are you most interested in?*</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Technology', 'Finance', 'Arts', 'Healthcare', 'Education', 'Marketing', 'Design', 'Entrepreneurship', 'Real Estate', 'Food & Beverage', 'Fashion', 'Entertainment', 'Artifical Intelligence', 'Sustainability', 'Sports', 'Travel'].map((interest) => (
                      <div key={interest} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={interest.toLowerCase().replace(/\s+/g, '-')}
                          name="interests"
                          value={interest}
                          checked={formData.interests.includes(interest)}
                          onChange={handleCheckboxChange}
                          className="mr-2 text-times8-purple focus:ring-times8-purple"
                        />
                        <label htmlFor={interest.toLowerCase().replace(/\s+/g, '-')} className="text-adaptive-secondary">{interest}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <AnimatedButton 
                    variant="adaptive" 
                    size="lg" 
                    animationType="glow"
                    className="button-glow w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </AnimatedButton>
                </div>
                
                {submitStatus === 'error' && (
                  <p className="text-red-500 text-center mt-2">
                    There was an error submitting your application. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}