// src/app/api/club-application/route.ts
import { NextResponse } from 'next/server';
import Airtable from 'airtable';
import { Resend } from 'resend';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID!);
const resend = new Resend(process.env.RESEND_API_KEY);

interface ApplicationData {
  fullName: string;           // Changed from name
  email: string;
  linkedinProfile: string;    // Changed from url
  otherProfiles: string;
  goals: string;
  contribution: string;
  identities: string[];
  otherIdentity: string;
  industry: string;
  interests: string[];
}

export async function POST(request: Request) {
  try {
    // Log the incoming request body
    const data = await request.json();
    console.log('Received data:', data);

    // Validate required fields
    if (!data.fullName || typeof data.fullName !== 'string' || !data.fullName.trim()) {
      return NextResponse.json({
        success: false,
        errors: ['Full name is required']
      }, { status: 400 });
    }

    if (!data.email || typeof data.email !== 'string' || !data.email.includes('@')) {
      return NextResponse.json({
        success: false,
        errors: ['Valid email is required']
      }, { status: 400 });
    }

    // Validate URL if provided
    if (data.linkedinProfile && typeof data.linkedinProfile === 'string') {
      try {
        new URL(data.linkedinProfile);
      } catch (e) {
        return NextResponse.json({
          success: false,
          errors: ['Invalid LinkedIn URL format']
        }, { status: 400 });
      }
    }

    // Validate arrays
    if (!Array.isArray(data.identities) || data.identities.length === 0) {
      return NextResponse.json({
        success: false,
        errors: ['At least one identity must be selected']
      }, { status: 400 });
    }

    if (!Array.isArray(data.interests) || data.interests.length === 0) {
      return NextResponse.json({
        success: false,
        errors: ['At least one interest must be selected']
      }, { status: 400 });
    }

    // Create record in Airtable
    const record = await base('Club Database').create({
      'Name': data.fullName.trim(),
      'Email': data.email.trim(),
      'Linkedin': data.linkedinProfile || '',
      'Other Profiles': data.otherProfiles || '',
      'Goals': data.goals || '',
      'Contribution': data.contribution || '',
      'Identities': data.identities,
      'Other Identities': data.otherIdentity || '',
      'Industry': data.industry || '',
      'Interests': data.interests,
      'Status': 'New Application',
      'Application Date': new Date().toISOString().split('T')[0]
    });

    // Send confirmation email
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Times8 Club <onboarding@resend.dev>',
      to: data.email,
      subject: 'Your Times8 Club Application',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #c026d3;">Thank you for your application, ${data.fullName}!</h1>
          <p>We've received your application to join Times8 Club and we'll review it shortly.</p>
          <p>We aim to respond to all applications within 48 hours.</p>
        </div>
      `
    });

    // Send notification to admin
    if (process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'Times8 Club <onboarding@resend.dev>',
        to: process.env.ADMIN_EMAIL,
        subject: 'New Times8 Club Application',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #c026d3;">New Club Application</h1>
            <p><strong>Name:</strong> ${data.fullName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Industry:</strong> ${data.industry}</p>
            <p><strong>Goals:</strong> ${data.goals || 'Not provided'}</p>
            <p><strong>Contribution:</strong> ${data.contribution || 'Not provided'}</p>
            <p><strong>Identities:</strong> ${data.identities.join(', ')}</p>
            <p><strong>Interests:</strong> ${data.interests.join(', ')}</p>
            ${data.linkedinProfile ? `<p><strong>LinkedIn:</strong> <a href="${data.linkedinProfile}">${data.linkedinProfile}</a></p>` : ''}
            ${data.otherProfiles ? `<p><strong>Other Profiles:</strong> ${data.otherProfiles}</p>` : ''}
          </div>
        `
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      recordId: record.id
    });

  } catch (error) {
    console.error('Club application error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}