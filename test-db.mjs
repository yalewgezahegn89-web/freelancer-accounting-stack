import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

try {
  const result = await sql`SELECT 1 AS ok`;
  console.log('DB OK:', result);
} catch (e) {
  console.error('DB FAIL:', e.message);
}