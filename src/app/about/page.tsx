// src/app/about/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-adaptive">
              About <span className="bg-times8-purple px-2 pb-1 transform -rotate-1 inline-block">times8</span>
            </h1>
            <p className="text-adaptive-secondary text-lg md:text-xl max-w-2xl mx-auto">
              We are building a new approach to relationship management, combining AI-powered tools with meaningful real-world connections.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-adaptive">Our Story</h2>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-adaptive-secondary mb-4">
                Times8 was born from a simple but powerful frustration: relationship management tools just are not built for the modern world.
              </p>
              
              <p className="text-adaptive-secondary mb-4">
                Our CEO, Frederike Falke, experienced this firsthand throughout her career. Working with enterprise clients at LinkedIn and other major companies, she consistently found herself battling outdated, clunky, overwhelming, and old-school CRM systems while trying to maintain her network and relationships.
              </p>
              
              <p className="text-adaptive-secondary mb-4">
                From Salesforce and Microsoft Dynamics to HubSpot, these tools were designed for different times and different needs. As she transitioned to entrepreneurship and community building, she realized this was not just a corporate problem—it affected solopreneurs, small businesses, community leaders, and individuals trying to manage their professional relationships.
              </p>
              
              <p className="text-adaptive-secondary mb-4">
                The central question became clear: <span className="italic">How do we manage all our connections in one place, trust the data, and eliminate all that manual work? How do we connect relationship data seamlessly?</span>
              </p>
              
              <p className="text-adaptive-secondary mb-4">
                Looking for answers, she tested hundreds of tools—from Pipedrive to Attio, Apollo to Dex, Monica to Clay. While some were better than others, none provided a complete solution that truly satisfied her needs.
              </p>
              
              <p className="text-adaptive-secondary mb-6">
                And so, Times8 AI was born. But we quickly realized that relationship building has two equally important sides: the digital world where AI helps manage networks and connections, and the personal world where meaningful connections are actually built. This insight led to the creation of Times8 Club, designed specifically to help New Yorkers better connect and build meaningful relationships in the city, achieving their goals with the right connections by their side.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-12 md:py-16 bg-white/5 dark:bg-black/20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-adaptive">Our Vision</h2>
            
            <div className="bg-times8-purple/10 border border-times8-purple/20 p-8 rounded-lg">
              <p className="text-xl md:text-2xl font-medium text-adaptive italic">
                "To create a world where AI handles all administrative work, empowering humans to focus on what truly matters: strategic thinking, creativity, and meaningful relationships."
              </p>
            </div>
            
            <div className="mt-10 prose prose-lg dark:prose-invert max-w-none">
              <p className="text-adaptive-secondary mb-4">
                We believe that the future of relationship management lies at the intersection of powerful AI and authentic human connection. Our mission is to build tools and communities that enhance both.
              </p>
              
              <p className="text-adaptive-secondary mb-4">
                With Times8 AI, we are creating a system that not only organizes your contacts but understands the nuanced web of relationships and provides actionable insights to strengthen your network.
              </p>
              
              <p className="text-adaptive-secondary">
                Through Times8 Club NYC, we are fostering a community where innovation thrives through meaningful personal connections, proving that in our digital age, in-person relationships remain irreplaceable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-adaptive">Our Team</h2>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-adaptive-secondary mb-6">
                Times8 brings together a diverse team of engineers, serial entrepreneurs, and enterprise professionals from around the world, united by our shared mission to make relationship management smoother and more modern.
              </p>
              
              <div className="bg-white/5 dark:bg-white/5 rounded-lg p-6 md:p-8 mb-8">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3">
                    <div className="relative w-48 h-48 md:w-full md:h-auto aspect-square rounded-lg overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-times8-purple/20 to-times8-purple/40 flex items-center justify-center">
                        <span className="text-white font-medium">CEO Portrait</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold mb-2 text-adaptive">Frederike Falke</h3>
                    <p className="text-times8-purple mb-3">Co-Founder & CEO</p>
                    <p className="text-adaptive-secondary mb-4">
                      Former Enterprise Client Success Leader at LinkedIn with a track record of &lt;5% enterprise churn rate and 109% quota attainment in enterprise sales. Published author on Customer Success with diverse background in consulting, innovation, product, and entrepreneurship.
                    </p>
                    <p className="text-adaptive-secondary">
                      With her experience building and leading multiple enterprise teams, Frederike brings a wealth of knowledge in AI-driven automation, data-powered relationship building, and human-AI collaboration to times8.
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-adaptive-secondary mb-4">
                Our engineering team comprises of experts in AI, machine learning, and natural language processing, while our product specialists bring years of experience from leading technology companies around the world.
              </p>
              
              <p className="text-adaptive-secondary">
                United by our frustration with existing tools and our vision for what relationship management could be, we are building Times8 to be the solution we have always wanted for ourselves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 md:py-24 bg-times8-purple/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-adaptive">Join Us on This Journey</h2>
            <p className="text-adaptive-secondary text-lg mb-8">
              Whether you are looking to streamline your relationship management with AI or connect with like-minded innovators in NYC, we love to have you be part of the times8 community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/club">
                <AnimatedButton 
                  variant="adaptive" 
                  size="lg"
                  animationType="glow"
                  className="button-glow"
                >
                  Join Times8 Club
                </AnimatedButton>
              </Link>
              <Link href="/ai">
                <AnimatedButton 
                  variant="outline" 
                  size="lg"
                  animationType="scale"
                  className="border-times8-purple text-times8-purple hover:bg-times8-purple/10"
                >
                  Explore Times8 AI
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-adaptive">Get in Touch</h2>
            <p className="text-adaptive-secondary text-lg mb-8">
              Have questions about Times8? Interested in partnering with us? We love to hear from you.
            </p>
            
            <Link href="/consulting">
              <AnimatedButton 
                variant="adaptive" 
                size="lg"
                animationType="glow"
                className="button-glow"
              >
                Contact Us
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}