// src/app/api/newsletter/confirm/route.ts
import { NextResponse } from 'next/server';
import Airtable from 'airtable';
import { Resend } from 'resend';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID!);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }

  try {
    const [email] = Buffer.from(token, 'base64').toString().split(':');

    // Find the subscriber
    const records = await base('Newsletter Subscribers')
      .select({
        filterByFormula: `{Email} = '${email}'`,
        maxRecords: 1
      })
      .firstPage();

    if (!records.length) {
      return NextResponse.json({ error: 'Subscriber not found' }, { status: 404 });
    }

    // Update status from 'Pending Confirmation' to 'Active'
    await base('Newsletter Subscribers').update(records[0].id, {
      'Status': 'Active'  // Using the correct status from your Airtable
    });

    // Send welcome email
    await resend.emails.send({
      from: 'Times8 Newsletter <newsletter@mail.times8.ai>',
      to: email,
      subject: 'Welcome to the Times8 Newsletter',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #c026d3;">Welcome to Times8!</h1>
          <p>Thank you for confirming your subscription.</p>
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
    console.error('Newsletter confirmation error:', error);
    return NextResponse.json({ 
      error: 'Failed to confirm subscription' 
    }, { status: 500 });
  }
}