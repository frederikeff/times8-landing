// src/app/api/test-notion/route.ts
import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET() {
  try {
    // Test Notion databases
    const databases = {
      club: process.env.NOTION_CLUB_DATABASE_ID,
      waitlist: process.env.NOTION_WAITLIST_DATABASE_ID,
      consulting: process.env.NOTION_CONSULTING_DATABASE_ID
    };
    
    // Test database access
    const results: Record<string, any> = {};
    
    for (const [key, id] of Object.entries(databases)) {
      if (id) {
        try {
          const response = await notion.databases.retrieve({ database_id: id });
          results[key] = {
            success: true,
            title: response.title
          };
        } catch (error) {
          results[key] = { 
            success: false, 
            error: 'Could not access database',
            details: error instanceof Error ? error.message : 'Unknown error'
          };
        }
      } else {
        results[key] = { success: false, error: 'No database ID provided' };
      }
    }
    
    return NextResponse.json({ databases: results });
  } catch (error) {
    console.error('Test Notion error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: String(error) },
      { status: 500 }
    );
  }
}