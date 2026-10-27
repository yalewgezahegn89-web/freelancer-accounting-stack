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

  // Format the reviewed date
  const reviewedDate = article.reviewedAt 
    ? new Date(article.reviewedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) 
    : 'Recently';

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-3">{article.title}</h1>
      
      {/* Updated Byline & Last Reviewed */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mb-8 border-b border-gray-800 pb-4">
        <span>By {article.authorName}</span>
        <span>•</span>
        <span>Last reviewed: {reviewedDate}</span>
      </div>

      <div className="rounded-lg border border-gray-700 bg-gray-900 p-4 mb-8 text-sm text-gray-300">
        <strong className="text-white">Affiliate Disclosure:</strong> This article contains affiliate
        links. If you purchase through them, we may earn a commission at no
        extra cost to you.
      </div>

      <AdUnit slot="in-content-top" minHeight={280} />

      <div className="space-y-6 leading-8 text-gray-300 text-lg">
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