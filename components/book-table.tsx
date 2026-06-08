"use client"

import type { Book } from "@/lib/types"
import { useBookContext } from "@/lib/context"

interface BookTableProps {
  books: Book[]
  isLoading: boolean
  onEdit: (book: Book) => void
  onDelete: (bookId: string) => void
}

export function BookTable({ books, isLoading, onEdit, onDelete }: BookTableProps) {
  const { currentPage } = useBookContext()
  const itemsPerPage = 10
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedBooks = books.slice(startIndex, startIndex + itemsPerPage)

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        ))}
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="p-8 text-center border border-border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">
          No books found. Try adjusting your filters or add a new book.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto border border-border rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/30 border-border">
            <th className="px-4 py-3 text-left font-semibold text-foreground">Title</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">Author</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">Genre</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">Year</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">Status</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedBooks.map((book) => (
            <tr
              key={book.id}
              className="border-b hover:bg-muted/50 transition-colors border-border"
            >
              <td className="px-4 py-3 text-foreground font-medium">{book.title}</td>
              <td className="px-4 py-3 text-muted-foreground">{book.author}</td>
              <td className="px-4 py-3 text-muted-foreground">{book.genre}</td>
              <td className="px-4 py-3 text-muted-foreground">{book.publishedYear}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    book.status === "Available"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                  }`}
                >
                  {book.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(book)}
                    className="px-3 py-1 text-sm font-medium bg-background border border-border text-foreground rounded hover:bg-muted transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(book.id)}
                    className="px-3 py-1 text-sm font-medium bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
