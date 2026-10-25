import { notFound } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { articles } from '@/db/schema';
import SeriesNav from '@/components/SeriesNav';
import AdUnit from '@/components/AdUnit';

export const instant = false;

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [article] = await db
    .select()
    .from(articles)
    .where(eq(articles.slug, slug))
    .limit(1);

  if (!article) {
    notFound();
  }

  const paragraphs = article.content.split(/\n{2,}/);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <p className="text-sm text-gray-600 mb-6">By {article.authorName}</p>

      <div className="rounded-lg border border-gray-200 bg-gray-100 p-4 mb-8 text-sm text-gray-700">
        <strong>Affiliate Disclosure:</strong> This article contains affiliate
        links. If you purchase through them, we may earn a commission at no
        extra cost to you.
      </div>

      <AdUnit slot="in-content-top" minHeight={280} />

      <div className="space-y-4 leading-7">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <AdUnit slot="in-content-bottom" minHeight={280} />

      <SeriesNav
        seriesId={article.seriesId}
        currentOrder={article.seriesOrder}
      />
    </main>
  );
}
