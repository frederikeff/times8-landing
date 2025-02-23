"use client";

import React from 'react';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-adaptive">
              Terms of <span className="bg-times8-purple px-2 pb-1 transform -rotate-1 inline-block">Service</span>
            </h1>
            <p className="text-adaptive-secondary text-lg md:text-xl max-w-2xl mx-auto">
              By using times8.ai, you agree to the terms outlined below. Please read them carefully.
            </p>
          </div>
        </div>
      </section>

      {/* Terms Details */}
      <section className="py-12 md:py-16">
        <div className="container max-w-4xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold mb-4 text-adaptive">1. Use of Services</h2>
            <p className="text-adaptive-secondary">
              Our services must be used lawfully. Unauthorized duplication or use of our content is prohibited.
            </p>

            <h2 className="text-3xl font-bold mb-4 text-adaptive">2. Membership & AI Tool Access</h2>
            <p className="text-adaptive-secondary">
              Access to memberships and the AI tool is subject to approval. We may deny or revoke access at any time.
            </p>

            <h2 className="text-3xl font-bold mb-4 text-adaptive">3. Cancellation Policy</h2>
            <p className="text-adaptive-secondary">
              You can request membership removal or withdraw from waitlists via <a href="mailto:hello@times8.ai" className="underline">hello@times8.ai</a>. Consulting inquiries currently require no cancellation process.
            </p>

            <h2 className="text-3xl font-bold mb-4 text-adaptive">4. Intellectual Property</h2>
            <p className="text-adaptive-secondary">
              All site content, including designs and software, is owned by times8.ai. Unauthorized copying or redistribution is strictly prohibited.
            </p>

            <h2 className="text-3xl font-bold mb-4 text-adaptive">5. Limitation of Liability</h2>
            <p className="text-adaptive-secondary">
              We are not liable for any damages from using our services. You assume responsibility for how you use the information and tools provided.
            </p>
          </div>

          <div className="text-center mt-10">
            <Link href="/" className="underline text-adaptive">Back to Home</Link>
          </div>
        </div>
      </section>
    </>
  );
}
