// src/app/api/test-airtable/route.ts
import { NextResponse } from 'next/server';
import Airtable from 'airtable';

export async function GET() {
  try {
    console.log('Creating Airtable base connection...');
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
      .base(process.env.AIRTABLE_BASE_ID!);

    // Try to read from the Waitlist table
    console.log('Attempting to access Waitlist table...');
    const records = await base('Waitlist Database')  // Using exact table name from your screenshot
      .select({ 
        maxRecords: 1,
        fields: ['Email', 'Waitlist Number', 'Join Date', 'Status'] // Exact field names from screenshot
      })
      .firstPage();

    return NextResponse.json({
      success: true,
      foundRecords: records.length,
      firstRecord: records[0] ? {
        email: records[0].get('Email'),
        waitlistNumber: records[0].get('Waitlist Number'),
        joinDate: records[0].get('Join Date'),
        status: records[0].get('Status')
      } : null
    });
  } catch (error) {
    console.error('Detailed Airtable test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      errorDetails: {
        apiKey: process.env.AIRTABLE_API_KEY?.slice(0, 5) + '...',
        baseId: process.env.AIRTABLE_BASE_ID,
        fullError: error
      }
    }, { status: 500 });
  }
}