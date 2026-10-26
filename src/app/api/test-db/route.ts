import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    const dbUrl = process.env.DATABASE_URL;
    
    if (!dbUrl) {
      return NextResponse.json({ success: false, error: 'DATABASE_URL is completely missing in Vercel.' }, { status: 500 });
    }

    if (dbUrl.startsWith('"') || dbUrl.startsWith("'")) {
      return NextResponse.json({ success: false, error: 'DATABASE_URL has quotes around it. Remove them in Vercel settings.' }, { status: 500 });
    }

    const sql = neon(dbUrl);
    const result = await sql`SELECT 1 as test`;
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully connected to Neon!',
      result
    });

  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message,
    }, { status: 500 });
  }
}