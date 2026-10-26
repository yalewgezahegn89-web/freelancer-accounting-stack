import { createArticle } from '../actions'

export default function AdminPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Article</h1>
      <form action={createArticle} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="font-medium">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="border rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="slug" className="font-medium">Slug</label>
          <input
            id="slug"
            name="slug"
            type="text"
            required
            className="border rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="excerpt" className="font-medium">Excerpt</label>
          <input
            id="excerpt"
            name="excerpt"
            type="text"
            required
            className="border rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="authorName" className="font-medium">Author Name</label>
          <input
            id="authorName"
            name="authorName"
            type="text"
            required
            className="border rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="content" className="font-medium">Content</label>
          <textarea
            id="content"
            name="content"
            required
            rows={10}
            className="border rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Publish Article
        </button>
      </form>
    </div>
  )
}
