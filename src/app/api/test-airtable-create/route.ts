// src/app/api/test-airtable-create/route.ts
import { NextResponse } from 'next/server';
import Airtable from 'airtable';

export async function POST(request: Request) {
  try {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
      .base(process.env.AIRTABLE_BASE_ID!);

    // Try to create a test record
    const record = await base('Waitlist Database').create({  // Using exact table name
      "Email": "test@example.com",
      "Waitlist Number": 1,
      "Join Date": new Date().toISOString(),
      "Status": "Pending"  // Make sure this matches your Status options
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully created test record',
      recordId: record.id,
      record: {
        email: record.get('Email'),
        waitlistNumber: record.get('Waitlist Number'),
        joinDate: record.get('Join Date'),
        status: record.get('Status')
      }
    });
  } catch (error) {
    console.error('Airtable create test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      errorType: error instanceof Error ? error.constructor.name : typeof error,
      fullError: error
    }, { status: 500 });
  }
}