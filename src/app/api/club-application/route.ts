// src/app/api/club-application/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Client } from '@notionhq/client';

// Define TypeScript interfaces for Notion properties
interface NotionClubProperties {
  'Name': {
    title: Array<{ text: { content: string } }>;
  };
  'Email': {
    email: string;
  };
  'LinkedIn': {
    url: string | null;
  };
  'Other Profiles': {
    rich_text: Array<{ text: { content: string } }>;
  };
  'Goals': {
    rich_text: Array<{ text: { content: string } }>;
  };
  'Contribution': {
    rich_text: Array<{ text: { content: string } }>;
  };
  'Identities': {
    multi_select: Array<{ name: string }>;
  };
  'Other Identity': {
    rich_text: Array<{ text: { content: string } }>;
  };
  'Industry': {
    select: { name: string };
  };
  'Interests': {
    multi_select: Array<{ name: string }>;
  };
  'Status': {
    select: { name: string };
  };
  'Application Date': {
    date: { start: string };
  };
}

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Notion
const notion = new Client({
  auth: process.env.NOTION_API_KEY
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate email format 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    
    // Safely handle arrays by ensuring they exist and are arrays
    const identities = Array.isArray(data.identities) ? data.identities : [];
    const interests = Array.isArray(data.interests) ? data.interests : [];
    
    // Create safe multi-select objects
    const identitiesMultiSelect = identities.map((identityVal: string) => ({
      name: String(identityVal)
    }));
    
    const interestsMultiSelect = interests.map((interestVal: string) => ({
      name: String(interestVal)
    }));
    
    // Store in Notion
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_CLUB_DATABASE_ID! },
      properties: {
        Name: {
          title: [{ text: { content: data.fullName || "Anonymous" } }]
        },
        Email: {
          email: data.email
        },
        LinkedIn: {
          url: data.linkedinProfile || null
        },
        "Other Profiles": {
          rich_text: [{ text: { content: data.otherProfiles || "" } }]
        },
        Goals: {
          rich_text: [{ text: { content: data.goals || "" } }]
        },
        Contribution: {
          rich_text: [{ text: { content: data.contribution || "" } }]
        },
        Identities: {
          multi_select: identitiesMultiSelect
        },
        "Other Identity": {
          rich_text: [{ text: { content: data.otherIdentity || "" } }]
        },
        Industry: {
          select: { name: data.industry || "Other" }
        },
        Interests: {
          multi_select: interestsMultiSelect
        },
        Status: {
          select: { name: "New Application" }
        },
        "Application Date": {
          date: { start: new Date().toISOString() }
        }
      } as Partial<NotionClubProperties>
    });
    
    // Send confirmation email
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Times8 Club <onboarding@resend.dev>',
      to: data.email,
      subject: 'Your Times8 Club Application',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #c026d3;">Thank you for your application, ${data.fullName || "there"}!</h1>
          <p>We will review your application and come back to you within 48 hours.</p>
          <p>In the meantime, please have a look at our <a href="https://times8.ai/relationship-guide" style="color: #c026d3;">Relationship Guide for NYC</a>.</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px;">Times8 Club NYC</p>
        </div>
      `,
    });
    
    // Notify admin
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Times8 Club <onboarding@resend.dev>',
          to: adminEmail,
          subject: 'New Times8 Club Application',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #c026d3;">New Club Application</h1>
              <p><strong>Name:</strong> ${data.fullName || "Not provided"}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>LinkedIn:</strong> ${data.linkedinProfile || 'Not provided'}</p>
              <p><strong>Other Profiles:</strong> ${data.otherProfiles || 'Not provided'}</p>
              <p><strong>Goals:</strong> ${data.goals || 'Not provided'}</p>
              <p><strong>Contribution:</strong> ${data.contribution || 'Not provided'}</p>
              <p><strong>Identities:</strong> ${identities.join(', ') || 'Not specified'}</p>
              <p><strong>Other Identity:</strong> ${data.otherIdentity || 'Not provided'}</p>
              <p><strong>Industry:</strong> ${data.industry || 'Not provided'}</p>
              <p><strong>Interests:</strong> ${interests.join(', ') || 'Not specified'}</p>
            </div>
          `,
        });
      } catch (error) {
        console.error('Error sending admin notification:', error);
        // Continue even if admin email fails
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' }, 
      { status: 500 }
    );
  }
}