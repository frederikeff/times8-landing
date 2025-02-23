"use client";

import React from 'react';
import Link from 'next/link';
import AnimatedButton from '@/components/ui/AnimatedButton';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeatureCard from '@/components/sections/FeatureCard';
import TestimonialCard from '@/components/sections/TestimonialCard';
import FaqQuestion from '@/components/sections/FaqQuestion';

// Data for feature cards
const featureCards = [
  {
    title: "Apply for Our NYC Club & Get Exclusive Benefits",
    description: "Join our innovative NYC Club and experience curated dinners, diverse mixers, and personalized network recommendations.",
    buttonText: "Join the Club",
    buttonLink: "/club",
    imageSrc: "/club-image.jpg",
    imageAlt: "NYC Club"
  },
  {
    title: "Reach Your Goals with our Relationship Manager",
    description: "Get access and find hidden connections. Improve your network and strengthen your relationships with our AI enhanced product.",
    buttonText: "Join Waitlist",
    buttonLink: "/ai",
    imageSrc: "/ai-tool.jpg",
    imageAlt: "AI Assistant",
    featured: true
  },
  {
    title: "Not In NYC? Sign Up for 1:1 Relationship Consulting",
    description: "You are not able to profit from our club offerings? Still need extra personalized support? Then this is for you.",
    buttonText: "Contact Us",
    buttonLink: "/consulting",
    imageSrc: "/consulting.jpg",
    imageAlt: "Consulting"
  }
];

// Data for testimonials
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "UX Designer",
    quote: "The times8 club events completely transformed my professional network. I've made meaningful connections that led to collaborations I never thought possible."
  },
  {
    name: "David Chen",
    role: "Startup Founder",
    quote: "The AI relationship manager helped me discover connections I didn't know I had. I found my co-founder through a third-degree connection the AI uncovered."
  },
  {
    name: "Amara Patel",
    role: "Marketing Director",
    quote: "Even though I'm not in NYC, the consulting service provided invaluable guidance on building my professional network strategically."
  }
];

// Data for FAQ questions
const faqQuestions = [
  {
    question: "How do I join the NYC Club?",
    answer: "You can apply for membership through our application form. After submission, our team will review your application and contact you within 48 hours to discuss the next steps."
  },
  {
    question: "What makes the times8 AI different?",
    answer: "Our AI is specifically designed to analyze relationship patterns and identify valuable connections you might miss. It integrates with your existing networks and provides actionable insights rather than just suggestions."
  },
  {
    question: "I'm not in NYC. Can I still benefit from times8?",
    answer: "Absolutely! While our physical events are NYC-based, our 1:1 consulting services and AI relationship manager are available to clients worldwide. We offer virtual sessions and personalized support regardless of your location."
  }
];

export default function Home() {
  return (
    <>
      {/* Hero Section with Cards Moved Up */}
      <section className="pt-20 pb-8 md:pt-28 md:pb-12">
        <div className="container">
          {/* Feature button */}
          <div className="flex justify-center mb-6">
            <button className="bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white text-sm px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-white/20 transition duration-300 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Super Charge Your Relationships
            </button>
          </div>
          
          {/* Hero heading */}
          <div className="text-center mb-24 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
              Your NYC Club + AI<br />
              Relationship <span className="bg-times8-purple px-2 pb-1 transform -rotate-1 inline-block text-white">Companion!</span>
            </h1>
            <p className="text-gray-700 dark:text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
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
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {featureCards.map((card, index) => (
              <FeatureCard key={index} {...card} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            What Our Members Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-times8-purple/50 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-times8-purple/50 to-transparent"></div>
        
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Transform Your Relationships?
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-700 dark:text-white/80">
            Join times8 today and discover the power of strategic networking and AI-enhanced relationship building.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/club">
              <AnimatedButton 
                variant="white" 
                size="lg"
                animationType="glow"
                className="text-gray-900 dark:text-black hover:shadow-glow-purple-lg"
              >
                Join the Club
              </AnimatedButton>
            </Link>
            <Link href="/ai">
              <AnimatedButton 
                variant="outline" 
                size="lg"
                animationType="scale"
                className="border-gray-300 dark:border-white/30 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/50 hover:shadow-glow-purple"
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqQuestions.map((faq, index) => (
              <FaqQuestion key={index} {...faq} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Stay Connected
            </h2>
            <p className="text-lg mb-8 text-gray-700 dark:text-white/80">
              Subscribe to our newsletter for the latest events, product and AI features, and relationship building tips.
            </p>
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </>
  );
}
