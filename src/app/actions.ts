'use server';

import { db } from '@/db';
import { articles } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createArticle(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const authorName = formData.get('authorName') as string;
    const content = formData.get('content') as string;

    await db.insert(articles).values({
      title,
      slug,
      excerpt,
      authorName,
      content,
      seriesId: 1,
      seriesOrder: Math.floor(Math.random() * 100) + 10, // Appends randomly to end for now
    });

    revalidatePath('/');
    revalidatePath('/series/freelancer-accounting-stack');
    
  } catch (error) {
    console.error("Failed to create article:", error);
    // If it fails, we just let it throw so you can see the error
    throw error;
  }

  // Redirect must be OUTSIDE the try/catch block in Next.js
  redirect('/admin?pass=secret123');
}