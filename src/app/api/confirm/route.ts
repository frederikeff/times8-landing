// src/app/api/confirm/route.ts
import { NextResponse } from 'next/server';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID!);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }

  try {
    const [email] = Buffer.from(token, 'base64').toString().split(':');

    // Find the record and get the latest waitlist number
    const [record] = await base('Waitlist Database')
      .select({
        filterByFormula: `{Email} = '${email}'`,
        maxRecords: 1
      })
      .firstPage();

    if (!record) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    // Get the current highest waitlist number
    const [lastRecord] = await base('Waitlist Database')
      .select({
        filterByFormula: '{Status} = "Confirmed"',
        sort: [{ field: 'Waitlist Number', direction: 'desc' }],
        maxRecords: 1
      })
      .firstPage();

    const nextNumber = lastRecord 
      ? (lastRecord.get('Waitlist Number') as number) + 1 
      : 4321;

    // Update the record with confirmed status and new waitlist number
    await base('Waitlist Database').update(record.id, {
      'Status': 'Confirmed',
      'Waitlist Number': nextNumber
    });

    return NextResponse.json({ 
      success: true,
      waitlistNumber: nextNumber 
    });

  } catch (error) {
    console.error('Confirmation error:', error);
    return NextResponse.json({ 
      error: 'Failed to confirm registration' 
    }, { status: 500 });
  }
}