// src/app/api/test-email/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Send a test email with simple HTML
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Times8 AI <onboarding@resend.dev>',
      to: email,
      subject: 'Test Email from Times8 AI',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #c026d3;">Test Email from Times8 AI</h1>
          <p>This is a test email to verify that your email sending is working correctly.</p>
          <p>If you're seeing this, it means the email system is configured properly!</p>
          <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-left: 4px solid #c026d3;">
            <p style="margin: 0; color: #666;">This email was sent at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent',
      result 
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}