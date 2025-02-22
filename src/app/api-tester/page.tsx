// src/app/api-tester/page.tsx
"use client";

import React, { useState } from 'react';

type TestRoute = {
  name: string;
  path: string;
  method: "GET" | "POST";
  requiresBody: boolean;
  defaultBody: any;
};

// Use a test email address for testing - replace with your own
const testEmail = "your-email@example.com";

const routes: TestRoute[] = [
  {
    name: "Test Email",
    path: "/api/test-email",
    method: "POST",
    requiresBody: true,
    defaultBody: {
      email: testEmail
    }
  },
  {
    name: "Waitlist Signup",
    path: "/api/waitlist",
    method: "POST",
    requiresBody: true,
    defaultBody: {
      email: testEmail
    }
  },
  {
    name: "Consulting Inquiry",
    path: "/api/consulting",
    method: "POST",
    requiresBody: true,
    defaultBody: {
      name: "Test User",
      email: testEmail,
      inquiryType: "Test Inquiry",
      message: "This is a test consulting inquiry message."
    }
  },
  {
    name: "Club Application",
    path: "/api/club-application",
    method: "POST",
    requiresBody: true,
    defaultBody: {
      fullName: "Test User",
      email: testEmail,
      linkedinProfile: "https://linkedin.com/in/testuser",
      otherProfiles: "https://twitter.com/testuser",
      goals: "Testing the application process",
      contribution: "My testing skills",
      identities: ["Creator", "Operator"],
      otherIdentity: "",
      industry: "Technology",
      interests: ["Technology", "Artificial Intelligence"]
    }
  },
  {
    name: "Notion Databases Test",
    path: "/api/test-notion",
    method: "GET",
    requiresBody: false,
    defaultBody: {}
  }
];

export default function ApiTesterPage() {
  const [selectedRoute, setSelectedRoute] = useState<TestRoute | null>(null);
  const [requestBody, setRequestBody] = useState("{}");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState(testEmail);
  
  const handleRouteSelect = (route: TestRoute) => {
    setSelectedRoute(route);
    
    // If route has email in the body, update it with current userEmail
    if (route.requiresBody) {
      const body = { ...route.defaultBody };
      if ('email' in body) {
        body.email = userEmail;
      }
      setRequestBody(JSON.stringify(body, null, 2));
    } else {
      setRequestBody(JSON.stringify(route.defaultBody, null, 2));
    }
    
    setResponse(null);
    setError(null);
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setUserEmail(newEmail);
    
    // Update email in request body if present
    if (selectedRoute?.requiresBody) {
      try {
        const body = JSON.parse(requestBody);
        if ('email' in body) {
          body.email = newEmail;
          setRequestBody(JSON.stringify(body, null, 2));
        }
      } catch (e) {
        // Ignore parse errors
      }
    }
  };
  
  const handleSubmit = async () => {
    if (!selectedRoute) return;
    
    setLoading(true);
    setError(null);
    
    try {
      let bodyData = {};
      
      if (selectedRoute.requiresBody) {
        try {
          bodyData = JSON.parse(requestBody);
        } catch (e) {
          setError("Invalid JSON in request body");
          setLoading(false);
          return;
        }
      }
      
      const options: RequestInit = {
        method: selectedRoute.method,
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      if (selectedRoute.method === "POST") {
        options.body = JSON.stringify(bodyData);
      }
      
      const response = await fetch(selectedRoute.path, options);
      let data;
      
      try {
        data = await response.json();
      } catch (err) {
        data = { error: "Could not parse response as JSON" };
      }
      
      setResponse({
        status: response.status,
        statusText: response.statusText,
        data
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">API Route Tester</h1>
      
      <div className="mb-6 p-4 bg-white/10 rounded-lg">
        <label className="block mb-2 font-semibold">Your Test Email Address:</label>
        <div className="flex">
          <input
            type="email"
            value={userEmail}
            onChange={handleEmailChange}
            className="w-full p-2 rounded-l border"
            placeholder="Enter your email for testing"
          />
          <button 
            className="bg-purple-600 text-white px-4 py-2 rounded-r"
            onClick={() => {
              // Update email in all route default bodies
              routes.forEach(route => {
                if (route.requiresBody && 'email' in route.defaultBody) {
                  route.defaultBody.email = userEmail;
                }
              });
              
              // Update current request body if needed
              if (selectedRoute?.requiresBody) {
                try {
                  const body = JSON.parse(requestBody);
                  if ('email' in body) {
                    body.email = userEmail;
                    setRequestBody(JSON.stringify(body, null, 2));
                  }
                } catch (e) {
                  // Ignore parse errors
                }
              }
            }}
          >
            Update All Tests
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          This email will be used for all test requests
        </p>
      </div>
      
      <div className="bg-white/10 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Select an API Route to Test</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {routes.map((route) => (
            <button
              key={route.name}
              className={`p-3 border rounded-md transition-colors ${
                selectedRoute?.name === route.name
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 hover:bg-white/20"
              }`}
              onClick={() => handleRouteSelect(route)}
            >
              <div className="font-semibold">{route.name}</div>
              <div className="text-sm opacity-75">
                {route.method} {route.path}
              </div>
            </button>
          ))}
        </div>
        
        {selectedRoute && (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                Testing: {selectedRoute.method} {selectedRoute.path}
              </h3>
              
              {selectedRoute.requiresBody && (
                <div className="mb-4">
                  <label className="block mb-2">Request Body (JSON):</label>
                  <textarea
                    className="w-full h-60 p-3 bg-white/10 border border-white/20 rounded-md font-mono text-sm"
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                  />
                </div>
              )}
              
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Sending Request..." : "Send Request"}
              </button>
            </div>
            
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            {response && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Response:</h3>
                <div className="p-4 bg-gray-800 text-green-400 rounded-md overflow-auto">
                  <div className="mb-2">
                    Status: {response.status} {response.statusText}
                  </div>
                  <pre className="text-sm whitespace-pre-wrap">
                    {JSON.stringify(response.data, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}