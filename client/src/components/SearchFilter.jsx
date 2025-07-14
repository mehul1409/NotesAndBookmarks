import { useState } from "react"
import { Search, Filter, X } from "lucide-react"

const SearchFilter = ({ onSearch, onFilter, searchTerm, selectedTags, availableTags }) => {
  const [showFilters, setShowFilters] = useState(false)
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "")

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    onSearch(localSearchTerm)
  }

  const handleTagToggle = (tag) => {
    const newTags = selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag]
    onFilter(newTags)
  }

  const clearFilters = () => {
    setLocalSearchTerm("")
    onSearch("")
    onFilter([])
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      {/* Search Bar & Buttons */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2 mb-4"
      >
        <div className="flex-1 relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            className="input-field w-full pl-10"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
          <button type="submit" className="btn-primary w-full sm:w-auto">
            Search
          </button>

          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>

          {(searchTerm || selectedTags.length > 0) && (
            <button
              type="button"
              onClick={clearFilters}
              className="btn-secondary flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </form>

      {/* Filter Section */}
      {showFilters && (
        <div className="border-t pt-4">
          <h3 className="font-medium text-gray-700 mb-2">Filter by Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTags.includes(tag)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchFilter
