// src/app/api/test-kit/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(`https://api.convertkit.com/v3/forms?api_key=${process.env.KIT_API_KEY}`);
    const data = await response.json();
    
    return NextResponse.json({ 
      success: true, 
      formCount: data.forms?.length || 0,
      hasApiKey: !!process.env.KIT_API_KEY,
      hasFormId: !!process.env.KIT_FORM_ID,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Kit test failed', error: String(error) }, 
      { status: 500 }
    );
  }
}