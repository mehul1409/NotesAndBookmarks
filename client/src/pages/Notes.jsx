import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import api from "../services/api"
import NoteCard from "../components/NoteCard"
import NoteModal from "../components/NoteModal"
import SearchFilter from "../components/SearchFilter"

const Notes = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState([])
  const [availableTags, setAvailableTags] = useState([])

  useEffect(() => {
    fetchNotes()
  }, [searchTerm, selectedTags])

  const fetchNotes = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchTerm) params.append("q", searchTerm)
      if (selectedTags.length > 0) params.append("tags", selectedTags.join(","))

      const response = await api.get(`/notes?${params}`)
      setNotes(response.data)

      // Extract unique tags
      const tags = new Set()
      response.data.forEach((note) => {
        note.tags?.forEach((tag) => tags.add(tag))
      })
      setAvailableTags(Array.from(tags))
    } catch (error) {
      console.error("Error fetching notes:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveNote = async (noteData) => {
    try {
      if (editingNote) {
        await api.put(`/notes/${editingNote._id}`, noteData)
      } else {
        await api.post("/notes", noteData)
      }

      setIsModalOpen(false)
      setEditingNote(null)
      fetchNotes()
    } catch (error) {
      console.error("Error saving note:", error)
      alert("Error saving note. Please try again.")
    }
  }

  const handleEditNote = (note) => {
    setEditingNote(note)
    setIsModalOpen(true)
  }

  const handleDeleteNote = async (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await api.delete(`/notes/${noteId}`)
        fetchNotes()
      } catch (error) {
        console.error("Error deleting note:", error)
        alert("Error deleting note. Please try again.")
      }
    }
  }

  const handleToggleFavorite = async (noteId, isFavorite) => {
    try {
      const note = notes.find((n) => n._id === noteId)
      await api.put(`/notes/${noteId}`, { ...note, isFavorite })
      fetchNotes()
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
        <div className="text-lg text-gray-600">Loading notes...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Note
        </button>
      </div>

      <SearchFilter
        onSearch={handleSearch}
        onFilter={handleFilter}
        searchTerm={searchTerm}
        selectedTags={selectedTags}
        availableTags={availableTags}
      />

      {notes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">
            {searchTerm || selectedTags.length > 0 ? "No notes found matching your criteria" : "No notes yet"}
          </div>
          {!searchTerm && selectedTags.length === 0 && (
            <button onClick={() => setIsModalOpen(true)} className="btn-primary">
              Create your first note
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingNote(null)
        }}
        onSave={handleSaveNote}
        note={editingNote}
      />
    </div>
  )
}

export default Notes
