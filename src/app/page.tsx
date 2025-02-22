// src/app/page.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedButton from '@/components/ui/AnimatedButton';
import NewsletterSignup from '@/components/NewsletterSignup';

export default function Home() {
  return (
    <>
      {/* Hero Section with Cards Moved Up */}
      <section className="pt-20 pb-8 md:pt-28 md:pb-12">
        {/* Main content */}
        <div className="container">
          {/* Feature button */}
          <div className="flex justify-center mb-6">
            <button className="bg-white/10 text-white text-sm px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/20 transition duration-300 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Super Charge Your Relationships
            </button>
          </div>
          
          {/* Hero heading */}
          <div className="text-center mb-24 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your NYC Club + AI<br />
              Relationship <span className="bg-times8-purple px-2 pb-1 transform -rotate-1 inline-block">Companion!</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Join our exclusive NYC Club to build relationships and use our AI
              tool to find those connections you may miss otherwise!
            </p>
            <Link href="/club">
              <AnimatedButton 
                variant="white" 
                size="lg" 
                animationType="glow"
                className="shadow-glow-purple hover:shadow-glow-purple-lg"
              >
                Join the Club
              </AnimatedButton>
            </Link>
          </div>
          
          {/* Feature Cards moved up - no heading */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Card 1 */}
            <div className="bg-transparent p-6 rounded-lg hover:shadow-glow-purple transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">Apply for Our NYC Club & Get Exclusive Benefits</h3>
              <p className="text-white/80 mb-6">
                Join our innovative NYC Club and experience curated dinners, diverse mixers, and personalized network recommendations.
              </p>
              <Link href="/club">
                <AnimatedButton 
                  variant="adaptive" 
                  animationType="scale"
                  className="text-black hover:shadow-glow-purple"
                >
                  Join the Club
                </AnimatedButton>
              </Link>
              <div className="mt-6 relative h-40 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-times8-purple/30"></div>
                <Image
                  src="/club-image.jpg"
                  alt="NYC Club"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-transparent p-6 rounded-lg hover:shadow-glow-purple transition-all duration-300 ring-1 ring-times8-purple">
              <h3 className="text-xl font-bold mb-4">Reach Your Goals with our Relationship Manager</h3>
              <p className="text-white/80 mb-6">
                Get access and find hidden connections. Improve your network and strengthen your relationships with our AI enhanced product.
              </p>
              <Link href="/ai">
                <AnimatedButton 
                  variant="white" 
                  animationType="glow"
                  className="text-black hover:shadow-glow-purple"
                >
                  Join Waitlist
                </AnimatedButton>
              </Link>
              
              <div className="mt-6 relative h-40 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-times8-purple/30"></div>
                <Image
                  src="/ai-tool.jpg"
                  alt="AI Assistant"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="bg-transparent p-6 rounded-lg hover:shadow-glow-purple transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">Not In NYC? Sign Up for 1:1 Relationship Consulting</h3>
              <p className="text-white/80 mb-6">
                You are not able to profit from our club offerings? Still need extra personalized support? Then this is for you.
              </p>
              <Link href="/consulting">
                <AnimatedButton 
                  variant="white" 
                  animationType="scale"
                  className="text-black hover:shadow-glow-purple"
                >
                  Contact Us
                </AnimatedButton>
              </Link>
              
              <div className="mt-6 relative h-40 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-times8-purple/30"></div>
                <Image
                  src="/consulting.jpg"
                  alt="Consulting"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What Our Members Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="glass p-6 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-purple/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-times8-purple/30 mr-4"></div>
                <div>
                  <h3 className="font-bold">Sarah Johnson</h3>
                  <p className="text-sm text-white/60">UX Designer</p>
                </div>
              </div>
              <p className="text-white/80 italic">
                "The times8 club events completely transformed my professional network. I've made meaningful connections that led to collaborations I never thought possible."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="glass p-6 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-purple/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-times8-purple/30 mr-4"></div>
                <div>
                  <h3 className="font-bold">David Chen</h3>
                  <p className="text-sm text-white/60">Startup Founder</p>
                </div>
              </div>
              <p className="text-white/80 italic">
                "The AI relationship manager helped me discover connections I didn't know I had. I found my co-founder through a third-degree connection the AI uncovered."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="glass p-6 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-purple/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-times8-purple/30 mr-4"></div>
                <div>
                  <h3 className="font-bold">Amara Patel</h3>
                  <p className="text-sm text-white/60">Marketing Director</p>
                </div>
              </div>
              <p className="text-white/80 italic">
                "Even though I'm not in NYC, the consulting service provided invaluable guidance on building my professional network strategically."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Add subtle highlight for this section */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-times8-purple/50 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-times8-purple/50 to-transparent"></div>
        
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Relationships?</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/80">
            Join times8 today and discover the power of strategic networking and AI-enhanced relationship building.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/club">
              <AnimatedButton 
                variant="white" 
                size="lg"
                animationType="glow"
                className="text-black hover:shadow-glow-purple-lg"
              >
                Join the Club
              </AnimatedButton>
            </Link>
            <Link href="/ai">
              <AnimatedButton 
                variant="outline" 
                size="lg"
                animationType="scale"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:shadow-glow-purple"
              >
                Explore the AI
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Question 1 */}
            <div className="glass p-6 rounded-lg transition-all duration-300 hover:shadow-glow-purple/20">
              <h3 className="text-xl font-bold mb-3">How do I join the NYC Club?</h3>
              <p className="text-white/80">
                You can apply for membership through our application form. After submission, our team will review your application and contact you within 48 hours to discuss the next steps.
              </p>
            </div>
            
            {/* Question 2 */}
            <div className="glass p-6 rounded-lg transition-all duration-300 hover:shadow-glow-purple/20">
              <h3 className="text-xl font-bold mb-3">What makes the times8 AI different?</h3>
              <p className="text-white/80">
                Our AI is specifically designed to analyze relationship patterns and identify valuable connections you might miss. It integrates with your existing networks and provides actionable insights rather than just suggestions.
              </p>
            </div>
            
            {/* Question 3 */}
            <div className="glass p-6 rounded-lg transition-all duration-300 hover:shadow-glow-purple/20">
              <h3 className="text-xl font-bold mb-3">I'm not in NYC. Can I still benefit from times8?</h3>
              <p className="text-white/80">
                Absolutely! While our physical events are NYC-based, our 1:1 consulting services and AI relationship manager are available to clients worldwide. We offer virtual sessions and personalized support regardless of your location.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Connected</h2>
            <p className="text-lg mb-8 text-white/80">
              Subscribe to our newsletter for the latest events, AI features, and relationship-building tips.
            </p>
            
              <NewsletterSignup />
            
          </div>
        </div>
      </section>
    </>
  );
}
