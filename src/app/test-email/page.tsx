// src/app/test-email/page.tsx
"use client";

import React, { useState } from 'react';

export default function TestEmailPage() {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const sendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ success: false, error: 'Failed to send request' });
    } finally {
      setSending(false);
    }
  };
  
  return (
    <div className="container mx-auto p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Test Email Sending</h1>
      
      <form onSubmit={sendTestEmail} className="space-y-4">
        <div>
          <label className="block mb-2">Your Email Address:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter your email"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={sending}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          {sending ? 'Sending...' : 'Send Test Email'}
        </button>
      </form>
      
      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Result:</h2>
          <div className={`p-4 rounded ${result.success ? 'bg-green-100' : 'bg-red-100'}`}>
            {result.success ? (
              <p>Email sent successfully! Check your inbox.</p>
            ) : (
              <p className="text-red-600">Error: {result.error || 'Unknown error'}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}