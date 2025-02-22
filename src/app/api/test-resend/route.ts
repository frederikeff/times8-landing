// src/app/api/test-resend/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const result = await resend.emails.send({
      from: 'Test <test@yourdomain.com>',
      to: process.env.ADMIN_EMAIL!,
      subject: 'Test Email from Times8',
      html: '<p>This is a test email to confirm Resend is working correctly.</p>',
    });
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Resend test failed', error: String(error) }, 
      { status: 500 }
    );
  }
}