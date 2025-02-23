// src/app/api/consulting/route.ts
import { NextResponse } from 'next/server';
import Airtable from 'airtable';
import { Resend } from 'resend';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID!);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received consulting inquiry:', data);
    
    // Validate required fields
    if (!data.email || !data.name || !data.message) {
      return NextResponse.json(
        { success: false, error: 'Please provide all required fields: name, email, and message' },
        { status: 400 }
      );
    }
    
    // Validate email format
    if (!data.email.includes('@') || !data.email.includes('.')) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    
    // Store in Airtable
    try {
        // Log the record we're trying to create
        const recordToCreate = {
          'Name': data.name,
          'Email': data.email,
          'Inquiry Type': data.inquiryType,
          'Message': data.message,
          'Status': 'New Inquiry',
          'Application Date': new Date().toISOString().split('T')[0]
        };
        console.log('Attempting to create record:', recordToCreate);
  
        const record = await base('Consulting Database').create(recordToCreate);
        console.log('Successfully created record:', record.id);
      } catch (airtableError) {
        console.error('Error storing in Airtable:', airtableError);
        // Log more details about the error
        console.error('Full error details:', JSON.stringify(airtableError, null, 2));
      }
    
    // Send notification email to admin
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Times8 Consulting <onboarding@resend.dev>',
          to: adminEmail,
          subject: `New Times8 ${data.inquiryType || 'Consulting'} Inquiry`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #c026d3;">New Inquiry: ${data.inquiryType || 'Consulting'}</h1>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Message:</strong></p>
              <div style="padding: 15px; background: #f7f7f7; border-left: 4px solid #c026d3; margin: 10px 0;">
                ${(data.message || "").replace(/\n/g, '<br>')}
              </div>
            </div>
          `,
        });
      } catch (error) {
        console.error('Error sending admin notification:', error);
      }
    }
    
    // Send confirmation to user
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'Times8 Consulting <onboarding@resend.dev>',
        to: data.email,
        subject: 'We received your inquiry',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #c026d3;">Thank you for reaching out!</h1>
            <p>We've received your ${data.inquiryType?.toLowerCase() || 'consulting'} inquiry and will get back to you shortly.</p>
            <p>Best regards,<br>The Times8 Team</p>
          </div>
        `,
      });
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Consulting inquiry error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' }, 
      { status: 500 }
    );
  }
}