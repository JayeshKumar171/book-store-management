"use client"

import { useBookContext } from "@/lib/context"

interface SearchFilterProps {
  genres: string[]
  onAddNew: () => void
}

export function SearchFilter({ genres, onAddNew }: SearchFilterProps) {
  const {
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    selectedStatus,
    setSelectedStatus,
    setCurrentPage,
  } = useBookContext()

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedGenre("")
    setSelectedStatus("")
    setCurrentPage(1)
  }

  const hasActiveFilters = searchQuery || selectedGenre || selectedStatus

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-end">
        <button
          onClick={onAddNew}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Book
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative">
          <svg
            className="absolute left-3 top-3 w-4 h-4 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Genre Filter */}
        <select
          value={selectedGenre}
          onChange={(e) => {
            setSelectedGenre(e.target.value === "allGenres" ? "" : e.target.value)
            setCurrentPage(1)
          }}
          className="px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">Filter by genre</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value === "allStatus" ? "" : e.target.value)
            setCurrentPage(1)
          }}
          className="px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">Filter by status</option>
          <option value="Available">Available</option>
          <option value="Issued">Issued</option>
        </select>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground hover:bg-muted transition-colors flex items-center gap-2 font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear
          </button>
        )}
      </div>
    </div>
  )
}
