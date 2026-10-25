import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const series = pgTable('series', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const articles = pgTable('articles', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  authorName: text('author_name').notNull(),
  seriesId: integer('series_id').references(() => series.id),
  seriesOrder: integer('series_order'),
  publishedAt: timestamp('published_at').defaultNow(),
  reviewedAt: timestamp('reviewed_at').defaultNow(),
});

export const pageViews = pgTable('page_views', {
  id: serial('id').primaryKey(),
  path: text('path').notNull(),
  sessionId: text('session_id'),
  referrer: text('referrer'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});