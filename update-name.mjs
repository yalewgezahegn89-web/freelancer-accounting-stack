import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function updateNames() {
  try {
    await sql`UPDATE articles SET author_name = 'YALEW ABERA'`;
    console.log('Successfully updated all articles to YALEW ABERA!');
  } catch (error) {
    console.error('Failed to update:', error);
  }
  process.exit(0);
}

updateNames();