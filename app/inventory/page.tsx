"use client"

import { useState, useMemo } from "react"
import { useBooks, addBook, updateBook, deleteBook } from "@/lib/api"
import { useBookContext } from "@/lib/context"
import type { BookFormData } from "@/lib/types"
import { BookTable } from "@/components/book-table"
import { BookForm } from "@/components/book-form"
import { SearchFilter } from "@/components/search-filter"
import { DeleteConfirmation } from "@/components/delete-confirmation"
import { Pagination } from "@/components/pagination"
import { Toaster, toast } from "sonner"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"

export default function InventoryPage() {
  const { books, isLoading, mutate } = useBooks()
  const {
    selectedBook,
    setSelectedBook,
    isFormOpen,
    setIsFormOpen,
    setDeleteConfirmation,
    searchQuery,
    selectedGenre,
    selectedStatus,
  } = useBookContext()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const genres = useMemo(() => {
    if (!books) return []
    const uniqueGenres = new Set(books.map((book) => book.genre))
    return Array.from(uniqueGenres).sort()
  }, [books])

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        searchQuery === "" ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesGenre = selectedGenre === "" || book.genre === selectedGenre
      const matchesStatus = selectedStatus === "" || book.status === selectedStatus

      return matchesSearch && matchesGenre && matchesStatus
    })
  }, [books, searchQuery, selectedGenre, selectedStatus])

  const handleAddNew = () => {
    setSelectedBook(null)
    setIsFormOpen(true)
  }

  const handleEdit = (book: any) => {
    setSelectedBook(book)
    setIsFormOpen(true)
  }

  const handleDelete = (bookId: string) => {
    setDeleteConfirmation({ isOpen: true, bookId })
  }

  const handleFormSubmit = async (data: BookFormData) => {
    setIsSubmitting(true)
    try {
      if (selectedBook) {
        await updateBook(selectedBook.id, data)
        toast.success("Book updated successfully!")
      } else {
        await addBook(data)
        toast.success("Book added successfully!")
      }
      await mutate()
    } catch (error) {
      toast.error("Failed to save book. Please try again.")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleConfirmDelete = async (bookId: string) => {
    setIsDeleting(true)
    try {
      await deleteBook(bookId)
      toast.success("Book deleted successfully!")
      await mutate()
    } catch (error) {
      toast.error("Failed to delete book. Please try again.")
      console.error(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="p-8 space-y-8">
      <Toaster position="top-right" />
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Inventory</h1>
        <p className="text-muted-foreground">Manage your book collection, update details, and track availability.</p>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle>Book List</CardTitle>
          <CardDescription>View, search, and manage your bookstore inventory.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <SearchFilter genres={genres} onAddNew={handleAddNew} />
          <BookTable books={filteredBooks} isLoading={isLoading} onEdit={handleEdit} onDelete={handleDelete} />
          <Pagination totalItems={filteredBooks.length} itemsPerPage={10} />
        </CardContent>
      </Card>

      <BookForm onSubmit={handleFormSubmit} isLoading={isSubmitting} />
      <DeleteConfirmation onConfirm={handleConfirmDelete} isLoading={isDeleting} />
    </div>
  )
}
