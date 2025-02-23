// src/app/api/newsletter/route.ts
import { NextResponse } from 'next/server';
import Airtable from 'airtable';
import { Resend } from 'resend';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID!);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Check if subscriber exists
    const existingRecords = await base('Newsletter Subscribers')
      .select({
        filterByFormula: `{Email} = '${email}'`,
        maxRecords: 1
      })
      .firstPage();

    if (existingRecords.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Already subscribed'
      });
    }

    // Add to Airtable
    const record = await base('Newsletter Subscribers').create({
      'Email': email,
      'Status': 'Active',
      'Subscribed On': new Date().toISOString().split('T')[0],
      'Source': 'Website'
    });

    // Send welcome email
    await resend.emails.send({
      from: 'Times8 Newsletter <newsletter@mail.times8.ai>',
      to: email,
      subject: 'Welcome to the Times8 Newsletter',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #c026d3;">Welcome to Times8!</h1>
          <p>Thank you for subscribing to our newsletter.</p>
          <p>You will receive insights & tips about:</p>
          <ul>
            <li>How to build valuable relationships and networks</li>
            <li>How to better manage your relationships with tech and AI</li>
            <li>Exclusive events and opportunities to network and connect</li>
          </ul>
          <p>Best regards,<br>Your Times8 Team</p>
        </div>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 });
  }
}