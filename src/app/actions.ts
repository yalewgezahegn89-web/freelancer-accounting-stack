'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { articles } from '@/db/schema'

export async function createArticle(formData: FormData) {
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('content') as string
  const excerpt = formData.get('excerpt') as string
  const authorName = formData.get('authorName') as string

  await db.insert(articles).values({
    title,
    slug,
    content,
    excerpt,
    authorName,
    seriesId: 1,
    seriesOrder: 3,
  })

  revalidatePath('/')
  redirect('/admin')
}
