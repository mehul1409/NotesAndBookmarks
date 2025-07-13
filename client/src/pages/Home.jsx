import { Link } from "react-router-dom"
import { BookOpen, Bookmark, Plus, Search } from "lucide-react"

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Personal Notes & Bookmark Manager</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Organize your thoughts and favorite links in one place. Create, search, and manage your notes and bookmarks
          with ease.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="card text-center">
          <div className="flex justify-center mb-4">
            <BookOpen className="w-16 h-16 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Notes</h2>
          <p className="text-gray-600 mb-6">
            Create and organize your personal notes with tags and search functionality.
          </p>
          <Link to="/notes" className="btn-primary inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Manage Notes
          </Link>
        </div>

        <div className="card text-center">
          <div className="flex justify-center mb-4">
            <Bookmark className="w-16 h-16 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Bookmarks</h2>
          <p className="text-gray-600 mb-6">
            Save and categorize your favorite websites with automatic title fetching.
          </p>
          <Link to="/bookmarks" className="btn-primary inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Manage Bookmarks
          </Link>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-semibold mb-6 text-center">Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <Search className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Search & Filter</h3>
            <p className="text-gray-600 text-sm">Quickly find your content with powerful search and tag filtering</p>
          </div>
          <div className="text-center">
            <Plus className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Easy Creation</h3>
            <p className="text-gray-600 text-sm">Create notes and bookmarks with a simple, intuitive interface</p>
          </div>
          <div className="text-center">
            <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Organization</h3>
            <p className="text-gray-600 text-sm">Organize with tags, favorites, and responsive design</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
