import { createArticle } from '../actions';

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await the searchParams properly for Next.js 15/16
  const resolvedParams = await searchParams;
  const pass = resolvedParams.pass;

  if (pass !== 'secret123') {
    return (
      <main className="max-w-xl mx-auto p-6 mt-10">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Unauthorized</h1>
        <p>You must provide the correct password to view this page.</p>
        <p className="mt-4 text-gray-600">Try adding <code>?pass=secret123</code> to the URL.</p>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-6">Create Article</h1>
      
      <form action={createArticle} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Title</label>
          <input type="text" name="title" required className="w-full border p-2 rounded bg-white text-black" />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700">Slug</label>
          <input type="text" name="slug" required className="w-full border p-2 rounded bg-white text-black" />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700">Excerpt</label>
          <input type="text" name="excerpt" required className="w-full border p-2 rounded bg-white text-black" />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700">Author Name</label>
          <input type="text" name="authorName" required className="w-full border p-2 rounded bg-white text-black" />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700">Content</label>
          <textarea name="content" required rows={12} className="w-full border p-2 rounded bg-white text-black"></textarea>
        </div>

        <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700">
          Publish Article
        </button>
      </form>
    </main>
  );
}