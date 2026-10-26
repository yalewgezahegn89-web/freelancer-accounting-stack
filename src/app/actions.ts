'use server';

import { db } from '@/db';
import { articles } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createArticle(formData: FormData) {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const excerpt = formData.get('excerpt') as string;
  const authorName = formData.get('authorName') as string;
  const content = formData.get('content') as string;

  // Insert into the database
  await db.insert(articles).values({
    title,
    slug,
    excerpt,
    authorName,
    content,
    seriesId: 1,
    seriesOrder: 4, // Hardcoded to append to the end for now
  });

  // Clear the cache so the new article shows up instantly
  revalidatePath('/');
  revalidatePath('/series/freelancer-accounting-stack');
  
  // Send them back to the admin page with a success message
  redirect('/admin?pass=secret123');
}