// src/app/api/waitlist/route.ts
import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { Resend } from 'resend';

// Define TypeScript interfaces for Notion properties
interface NotionWaitlistProperties {
  'Email': {
    title: Array<{ text: { content: string } }>;
  };
  'Join Date': {
    date: { start: string };
  };
  'Waitlist Number': {
    number: number | null;
  };
  'Status': {
    select: { name: string };
  };
}

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY);

// For demo purposes - you'd store this in a database
let waitlistCount = 1245;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    // Validate email format 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    
    // Check for existing entry
    const existingResponse = await notion.databases.query({
      database_id: process.env.NOTION_WAITLIST_DATABASE_ID!,
      filter: {
        property: 'Email',
        rich_text: { equals: email } // Use rich_text instead of title
      }
    });
    
    // If email already exists, don't process it again
    if (existingResponse.results.length > 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'Email already in waitlist' 
      });
    }
    
    // Get the latest waitlist count
    try {
      const countResponse = await notion.databases.query({
        database_id: process.env.NOTION_WAITLIST_DATABASE_ID!,
        sorts: [{ property: 'Waitlist Number', direction: 'descending' }],
        page_size: 1
      });
      
      if (countResponse.results.length > 0) {
        // Access properties in a type-safe way
        const properties = countResponse.results[0].properties as Partial<NotionWaitlistProperties>;
        const waitlistNumberProp = properties['Waitlist Number'];
        
        if (waitlistNumberProp && waitlistNumberProp.number !== null) {
          const highestNumber = waitlistNumberProp.number;
          if (highestNumber >= waitlistCount) {
            waitlistCount = highestNumber + 1;
          } else {
            waitlistCount++;
          }
        } else {
          waitlistCount++;
        }
      } else {
        waitlistCount++;
      }
    } catch (countError) {
      console.error('Error retrieving waitlist count:', countError);
      waitlistCount++;
    }
    
    // Store in Notion
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_WAITLIST_DATABASE_ID! },
      properties: {
        Email: { 
          rich_text: [{ text: { content: email } }] // Use rich_text instead of title
        },
        "Join Date": { 
          date: { start: new Date().toISOString() } 
        },
        "Waitlist Number": { 
          number: waitlistCount 
        },
        Status: { 
          select: { name: "Pending Confirmation" } 
        }
      } as Partial<NotionWaitlistProperties>
    });
    
    // Generate a unique token for email verification
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    const confirmUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/confirm-waitlist?token=${token}`;
    
    // Send confirmation email
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Times8 AI <onboarding@resend.dev>',
      to: email,
      subject: 'Confirm your Times8 AI Waitlist Spot',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #c026d3;">Confirm your Times8 AI Waitlist Spot</h1>
          <p>You're almost there! Click the button below to confirm your spot on the Times8 AI waitlist.</p>
          <a href="${confirmUrl}" style="display: inline-block; background-color: #c026d3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px;">Confirm My Spot</a>
          <p style="margin-top: 30px; color: #666;">If you didn't request to join our waitlist, you can ignore this email.</p>
        </div>
      `,
    });
    
    // Also add to Kit (formerly ConvertKit)
    const KIT_API_KEY = process.env.KIT_API_KEY;
    const KIT_FORM_ID = process.env.KIT_FORM_ID;
    
    if (KIT_API_KEY && KIT_FORM_ID) {
      try {
        await fetch(`https://api.kit.com/v3/forms/${KIT_FORM_ID}/subscribe`, { // Using kit.com per your note
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            api_key: KIT_API_KEY,
            email,
            tags: [process.env.KIT_AI_WAITLIST_TAG_ID]
          }),
        });
      } catch (kitError) {
        console.error('Kit API error:', kitError);
        // Continue execution even if Kit fails
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Verification email sent' 
    });
  } catch (error) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' }, 
      { status: 500 }
    );
  }
}

// Confirmation endpoint
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  
  if (!token) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/ai?error=invalid-token`);
  }
  
  try {
    // Decode token
    const [email] = Buffer.from(token, 'base64').toString().split(':');
    
    // Update Notion status
    const response = await notion.databases.query({
      database_id: process.env.NOTION_WAITLIST_DATABASE_ID!,
      filter: {
        property: 'Email',
        rich_text: { equals: email } // Use rich_text instead of title
      }
    });
    
    if (response.results.length > 0) {
      const pageId = response.results[0].id;
      
      // Safely access the waitlist number property
      let waitlistNumber = 0;
      try {
        const properties = response.results[0].properties as Partial<NotionWaitlistProperties>;
        const waitlistNumberProp = properties['Waitlist Number'];
        
        if (waitlistNumberProp && waitlistNumberProp.number !== null) {
          waitlistNumber = waitlistNumberProp.number;
        }
      } catch (error) {
        console.error('Error accessing waitlist number:', error);
      }
      
      await notion.pages.update({
        page_id: pageId,
        properties: {
          Status: { select: { name: "Confirmed" } }
        } as Partial<NotionWaitlistProperties>
      });
      
      // Redirect to confirmation page with waitlist number
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ai/confirmed?number=${waitlistNumber}`
      );
    }
    
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/ai?error=not-found`);
  } catch (error) {
    console.error('Confirmation error:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/ai?error=server-error`);
  }
}