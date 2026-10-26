import Link from 'next/link';
import { notFound } from 'next/navigation';
import { asc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { articles, series } from '@/db/schema';

export const instant = false;

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [seriesRecord] = await db
    .select()
    .from(series)
    .where(eq(series.slug, slug))
    .limit(1);

  if (!seriesRecord) {
    notFound();
  }

  const seriesArticles = await db
    .select()
    .from(articles)
    .where(eq(articles.seriesId, seriesRecord.id))
    .orderBy(asc(articles.seriesOrder));

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{seriesRecord.title}</h1>
      {seriesRecord.description && (
        <p className="text-lg text-gray-400 mb-8">{seriesRecord.description}</p>
      )}

      <h2 className="text-xl font-semibold mb-4">Articles</h2>
      {seriesArticles.length === 0 ? (
        <p className="text-gray-500">No articles in this series yet.</p>
      ) : (
        <ol className="space-y-4">
          {seriesArticles.map((article) => (
            <li key={article.id}>
              <Link
                href={`/articles/${article.slug}`}
                className="block rounded-lg border border-gray-700 bg-gray-900 p-6 transition-colors hover:border-blue-500"
              >
                <span className="font-semibold text-lg text-blue-400">
                  {article.title}
                </span>
                {article.excerpt && (
                  <span className="mt-2 block text-sm text-gray-400">
                    {article.excerpt}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}