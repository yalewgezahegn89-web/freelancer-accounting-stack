import Link from 'next/link';
import { db } from '@/db';
import { series } from '@/db/schema';

export const instant = false;

export default async function Home() {
  const allSeries = await db.select().from(series);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Freelancer Accounting Guides</h1>
      <p className="text-gray-600 mb-8">
        Practical guides to help you set up and run your freelance finances.
      </p>

      {allSeries.length === 0 ? (
        <p className="text-gray-500">No series published yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {allSeries.map((s) => (
            <Link
              key={s.id}
              href={`/series/${s.slug}`}
              className="block rounded-lg border border-gray-200 p-6 transition-colors hover:border-blue-400 hover:bg-blue-50"
            >
              <h2 className="text-xl font-semibold mb-2">{s.title}</h2>
              {s.description && (
                <p className="text-gray-600">{s.description}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
