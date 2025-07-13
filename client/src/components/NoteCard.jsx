"use client"
import { Edit, Trash2, Heart, Calendar } from "lucide-react"

const NoteCard = ({ note, onEdit, onDelete, onToggleFavorite }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{note.title}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onToggleFavorite(note._id, !note.isFavorite)}
            className={`p-1 rounded-full transition-colors ${
              note.isFavorite ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-red-500"
            }`}
          >
            <Heart className={`w-4 h-4 ${note.isFavorite ? "fill-current" : ""}`} />
          </button>
          <button onClick={() => onEdit(note)} className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(note._id)} className="p-1 text-gray-400 hover:text-red-600 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">{note.content}</p>

      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {note.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center text-xs text-gray-500">
        <Calendar className="w-3 h-3 mr-1" />
        <span>Created: {formatDate(note.createdAt)}</span>
        {note.updatedAt !== note.createdAt && <span className="ml-3">Updated: {formatDate(note.updatedAt)}</span>}
      </div>
    </div>
  )
}

export default NoteCard
