import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const dbUrl = process.env.DATABASE_URL;

    if (!dbUrl) {
      return NextResponse.json(
        { error: 'DATABASE_URL is completely missing in Vercel.' },
        { status: 500 }
      );
    }

    if (dbUrl.startsWith('"') || dbUrl.startsWith("'")) {
      return NextResponse.json(
        { error: 'DATABASE_URL has quotes around it.' },
        { status: 500 }
      );
    }

    const sql = neon(dbUrl);
    const result = await sql`SELECT 1 as test`;

    return NextResponse.json({
      success: true,
      message: 'Successfully connected to Neon!',
      result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
