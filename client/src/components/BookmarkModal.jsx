"use client"

import { useState, useEffect } from "react"
import { X, Save } from "lucide-react"

const BookmarkModal = ({ isOpen, onClose, onSave, bookmark }) => {
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    description: "",
    tags: "",
    isFavorite: false,
  })

  useEffect(() => {
    if (bookmark) {
      setFormData({
        url: bookmark.url || "",
        title: bookmark.title || "",
        description: bookmark.description || "",
        tags: bookmark.tags ? bookmark.tags.join(", ") : "",
        isFavorite: bookmark.isFavorite || false,
      })
    } else {
      setFormData({
        url: "",
        title: "",
        description: "",
        tags: "",
        isFavorite: false,
      })
    }
  }, [bookmark, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    const tags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)

    onSave({
      ...formData,
      tags,
    })
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">{bookmark ? "Edit Bookmark" : "Create New Bookmark"}</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              URL *
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="https://example.com"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              placeholder="Title will be auto-fetched if not provided"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="input-field resize-none"
              placeholder="Optional description"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter tags separated by commas"
            />
            <p className="text-xs text-gray-500 mt-1">Separate multiple tags with commas</p>
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isFavorite"
                checked={formData.isFavorite}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Mark as favorite</span>
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex items-center gap-2">
              <Save className="w-4 h-4" />
              {bookmark ? "Update" : "Create"} Bookmark
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookmarkModal
