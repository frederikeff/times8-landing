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

    // Add to Airtable with Pending status
    const record = await base('Newsletter Subscribers').create({
      'Email': email,
      'Status': 'Pending Confirmation',
      'Subscribed On': new Date().toISOString().split('T')[0],
      'Source': 'Website'
    });

    // Generate confirmation token
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    const confirmUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/newsletter/confirmed?token=${token}`;

    // Send confirmation email
    await resend.emails.send({
      from: 'Times8 Newsletter <newsletter@mail.times8.ai>',
      to: email,
      subject: 'Confirm your Times8 Newsletter Subscription',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #c026d3;">Confirm your Newsletter Subscription</h1>
          <p>You're almost there! Click the button below to confirm your Times8 newsletter subscription.</p>
          <a href="${confirmUrl}" style="display: inline-block; background-color: #c026d3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px;">Confirm Subscription</a>
          <p style="margin-top: 30px; color: #666;">If you didn't request to subscribe to our newsletter, you can ignore this email.</p>
        </div>
      `
    });

    return NextResponse.json({
      success: true,
      redirect: '/newsletter/check-email'
    });
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 });
  }
}