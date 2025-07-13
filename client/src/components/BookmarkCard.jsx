"use client"
import { Edit, Trash2, Heart, Calendar, ExternalLink } from "lucide-react"

const BookmarkCard = ({ bookmark, onEdit, onDelete, onToggleFavorite }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getDomain = (url) => {
    try {
      return new URL(url).hostname
    } catch {
      return url
    }
  }

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-1">{bookmark.title}</h3>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
          >
            <ExternalLink className="w-3 h-3" />
            {getDomain(bookmark.url)}
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onToggleFavorite(bookmark._id, !bookmark.isFavorite)}
            className={`p-1 rounded-full transition-colors ${
              bookmark.isFavorite ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-red-500"
            }`}
          >
            <Heart className={`w-4 h-4 ${bookmark.isFavorite ? "fill-current" : ""}`} />
          </button>
          <button onClick={() => onEdit(bookmark)} className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(bookmark._id)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {bookmark.description && <p className="text-gray-600 mb-4 line-clamp-2">{bookmark.description}</p>}

      {bookmark.tags && bookmark.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {bookmark.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center text-xs text-gray-500">
        <Calendar className="w-3 h-3 mr-1" />
        <span>Created: {formatDate(bookmark.createdAt)}</span>
        {bookmark.updatedAt !== bookmark.createdAt && (
          <span className="ml-3">Updated: {formatDate(bookmark.updatedAt)}</span>
        )}
      </div>
    </div>
  )
}

export default BookmarkCard
