"use client";

import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-adaptive">
              Privacy <span className="bg-times8-purple px-2 pb-1 transform -rotate-1 inline-block">Policy</span>
            </h1>
            <p className="text-adaptive-secondary text-lg md:text-xl max-w-2xl mx-auto">
              Learn how times8.ai collects, uses, and protects your personal data while using our services.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Details */}
      <section className="py-12 md:py-16">
        <div className="container max-w-4xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold mb-4 text-adaptive">1. Information We Collect</h2>
            <p className="text-adaptive-secondary">
              We collect your name, email address, personal preferences, and interests through newsletter subscriptions, club membership applications, and AI tool access requests.
            </p>

            <h2 className="text-3xl font-bold mb-4 text-adaptive">2. How We Use Your Information</h2>
            <p className="text-adaptive-secondary">
              Your data is used to send promotional and transactional emails, manage memberships, and process access requests to our services.
            </p>

            <h2 className="text-3xl font-bold mb-4 text-adaptive">3. Data Sharing</h2>
            <p className="text-adaptive-secondary">
              Data is shared exclusively with Resend and Airtable for communication and operational purposes. No additional third-party sharing occurs without your consent.
            </p>

            <h2 className="text-3xl font-bold mb-4 text-adaptive">4. Data Retention & Your Rights</h2>
            <p className="text-adaptive-secondary">
              We retain information as long as our services exist. You may access or request deletion of your data by contacting us at <a href="mailto:hello@times8.ai" className="underline">hello@times8.ai</a>.
            </p>

            <h2 className="text-3xl font-bold mb-4 text-adaptive">5. Updates</h2>
            <p className="text-adaptive-secondary">
              This policy may change over time. Updates will be reflected on this page with a new revision date.
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