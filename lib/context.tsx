"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { Book } from "./types"

interface BookContextType {
  selectedBook: Book | null
  setSelectedBook: (book: Book | null) => void
  isFormOpen: boolean
  setIsFormOpen: (open: boolean) => void
  deleteConfirmation: { isOpen: boolean; bookId: string | null } | null
  setDeleteConfirmation: (confirmation: { isOpen: boolean; bookId: string | null } | null) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedGenre: string
  setSelectedGenre: (genre: string) => void
  selectedStatus: string
  setSelectedStatus: (status: string) => void
  currentPage: number
  setCurrentPage: (page: number) => void
}

const BookContext = createContext<BookContextType | undefined>(undefined)

export function BookProvider({ children }: { children: React.ReactNode }) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; bookId: string | null } | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <BookContext.Provider
      value={{
        selectedBook,
        setSelectedBook,
        isFormOpen,
        setIsFormOpen,
        deleteConfirmation,
        setDeleteConfirmation,
        searchQuery,
        setSearchQuery,
        selectedGenre,
        setSelectedGenre,
        selectedStatus,
        setSelectedStatus,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </BookContext.Provider>
  )
}

export function useBookContext() {
  const context = useContext(BookContext)
  if (!context) {
    throw new Error("useBookContext must be used within BookProvider")
  }
  return context
}
