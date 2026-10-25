import Link from 'next/link';
import { and, asc, eq, gt } from 'drizzle-orm';
import { db } from '@/db';
import { articles } from '@/db/schema';

export default async function SeriesNav({
  seriesId,
  currentOrder,
}: {
  seriesId: number | null;
  currentOrder: number | null;
}) {
  if (seriesId === null || currentOrder === null) {
    return null;
  }

  const [nextArticle] = await db
    .select()
    .from(articles)
    .where(
      and(
        eq(articles.seriesId, seriesId),
        gt(articles.seriesOrder, currentOrder)
      )
    )
    .orderBy(asc(articles.seriesOrder))
    .limit(1);

  if (nextArticle) {
    return (
      <div className="mt-10 rounded-lg border border-blue-200 bg-blue-50 p-5">
        <Link
          href={`/articles/${nextArticle.slug}`}
          className="font-medium text-blue-700 hover:underline"
        >
          Next: {nextArticle.title}
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-lg border border-green-200 bg-green-50 p-5">
      <p className="font-medium text-green-700">Series completed</p>
    </div>
  );
}
