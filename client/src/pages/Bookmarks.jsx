import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import api from "../services/api"
import BookmarkCard from "../components/BookmarkCard"
import BookmarkModal from "../components/BookmarkModal"
import SearchFilter from "../components/SearchFilter"

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBookmark, setEditingBookmark] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState([])
  const [availableTags, setAvailableTags] = useState([])

  useEffect(() => {
    fetchBookmarks()
  }, [searchTerm, selectedTags])

  const fetchBookmarks = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchTerm) params.append("q", searchTerm)
      if (selectedTags.length > 0) params.append("tags", selectedTags.join(","))

      const response = await api.get(`/bookmarks?${params}`)
      setBookmarks(response.data)

      // Extract unique tags
      const tags = new Set()
      response.data.forEach((bookmark) => {
        bookmark.tags?.forEach((tag) => tags.add(tag))
      })
      setAvailableTags(Array.from(tags))
    } catch (error) {
      console.error("Error fetching bookmarks:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveBookmark = async (bookmarkData) => {
    try {
      if (editingBookmark) {
        await api.put(`/bookmarks/${editingBookmark._id}`, bookmarkData)
      } else {
        await api.post("/bookmarks", bookmarkData)
      }

      setIsModalOpen(false)
      setEditingBookmark(null)
      fetchBookmarks()
    } catch (error) {
      console.error("Error saving bookmark:", error)
      alert("Error saving bookmark. Please try again.")
    }
  }

  const handleEditBookmark = (bookmark) => {
    setEditingBookmark(bookmark)
    setIsModalOpen(true)
  }

  const handleDeleteBookmark = async (bookmarkId) => {
    if (window.confirm("Are you sure you want to delete this bookmark?")) {
      try {
        await api.delete(`/bookmarks/${bookmarkId}`)
        fetchBookmarks()
      } catch (error) {
        console.error("Error deleting bookmark:", error)
        alert("Error deleting bookmark. Please try again.")
      }
    }
  }

  const handleToggleFavorite = async (bookmarkId, isFavorite) => {
    try {
      const bookmark = bookmarks.find((b) => b._id === bookmarkId)
      await api.put(`/bookmarks/${bookmarkId}`, { ...bookmark, isFavorite })
      fetchBookmarks()
    } catch (error) {
      console.error("Error updating favorite:", error)
    }
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleFilter = (tags) => {
    setSelectedTags(tags)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading bookmarks...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Bookmarks</h1>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Bookmark
        </button>
      </div>

      <SearchFilter
        onSearch={handleSearch}
        onFilter={handleFilter}
        searchTerm={searchTerm}
        selectedTags={selectedTags}
        availableTags={availableTags}
      />

      {bookmarks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">
            {searchTerm || selectedTags.length > 0 ? "No bookmarks found matching your criteria" : "No bookmarks yet"}
          </div>
          {!searchTerm && selectedTags.length === 0 && (
            <button onClick={() => setIsModalOpen(true)} className="btn-primary">
              Create your first bookmark
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark._id}
              bookmark={bookmark}
              onEdit={handleEditBookmark}
              onDelete={handleDeleteBookmark}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}

      <BookmarkModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingBookmark(null)
        }}
        onSave={handleSaveBookmark}
        bookmark={editingBookmark}
      />
    </div>
  )
}

export default Bookmarks
