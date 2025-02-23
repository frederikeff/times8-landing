"use client";

import React from 'react';
import Link from 'next/link';

export default function CookiePolicy() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-adaptive">
              Cookie <span className="bg-times8-purple px-2 pb-1 transform -rotate-1 inline-block">Policy</span>
            </h1>
            <p className="text-adaptive-secondary text-lg md:text-xl max-w-2xl mx-auto">
              Understand how and why times8.ai uses cookies to enhance your browsing experience.
            </p>
          </div>
        </div>
      </section>

      {/* Cookie Details */}
      <section className="py-12 md:py-16">
        <div className="container max-w-4xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold mb-4 text-adaptive">1. What Are Cookies?</h2>
            <p className="text-adaptive-secondary">
              Cookies are small data files stored on your device to improve website functionality and track usage analytics.
            </p>

            <h2 className="text-3xl font-bold mb-4 text-adaptive">2. How We Use Cookies</h2>
            <p className="text-adaptive-secondary">
              We use essential cookies to ensure website functionality. Future analytics tools (e.g., Google Analytics) may require user consent via a cookie banner.
            </p>

            <h2 className="text-3xl font-bold mb-4 text-adaptive">3. Managing Cookies</h2>
            <p className="text-adaptive-secondary">
              You can manage or disable cookies through browser settings. Note that disabling essential cookies may affect website performance.
            </p>

            <h2 className="text-3xl font-bold mb-4 text-adaptive">4. Policy Updates</h2>
            <p className="text-adaptive-secondary">
              We will update this policy as new cookie technologies or tools are introduced.
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
