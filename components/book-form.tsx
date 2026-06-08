"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import type { BookFormData } from "@/lib/types"
import { useBookContext } from "@/lib/context"

interface BookFormProps {
  onSubmit: (data: BookFormData) => Promise<void>
  isLoading: boolean
}

const genres = ["Fiction", "Non-Fiction", "Mystery", "Romance", "Science Fiction", "Biography", "History", "Self-Help"]

export function BookForm({ onSubmit, isLoading }: BookFormProps) {
  const { selectedBook, isFormOpen, setIsFormOpen } = useBookContext()
  const [showForm, setShowForm] = useState(false)
  const [currentYear, setCurrentYear] = useState(2024)
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookFormData>({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      publishedYear: 2024,
      status: "Available",
    },
  })

  const selectedGenre = watch("genre")
  const selectedStatus = watch("status")

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  useEffect(() => {
    setShowForm(isFormOpen)
  }, [isFormOpen])

  useEffect(() => {
    if (selectedBook) {
      setValue("title", selectedBook.title)
      setValue("author", selectedBook.author)
      setValue("genre", selectedBook.genre)
      setValue("publishedYear", selectedBook.publishedYear)
      setValue("status", selectedBook.status)
    } else {
      reset()
    }
  }, [selectedBook, setValue, reset])

  const handleFormSubmit = async (data: BookFormData) => {
    await onSubmit(data)
    reset()
    setIsFormOpen(false)
  }

  const handleClose = () => {
    setShowForm(false)
    setTimeout(() => setIsFormOpen(false), 300)
  }

  if (!showForm) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-background rounded-lg shadow-lg max-w-md w-full mx-4 p-6 space-y-4 border border-border">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {selectedBook ? "Edit Book" : "Add New Book"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {selectedBook ? "Update the book details below." : "Fill in the details to add a new book."}
          </p>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">
              Title *
            </label>
            <input
              id="title"
              type="text"
              placeholder="Book title"
              {...register("title", { required: "Title is required" })}
              className={`w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                errors.title ? "border-destructive" : "border-border"
              }`}
            />
            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
          </div>

          {/* Author Field */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-foreground mb-1">
              Author *
            </label>
            <input
              id="author"
              type="text"
              placeholder="Author name"
              {...register("author", { required: "Author is required" })}
              className={`w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                errors.author ? "border-destructive" : "border-border"
              }`}
            />
            {errors.author && <p className="text-sm text-red-500 mt-1">{errors.author.message}</p>}
          </div>

          {/* Genre Field */}
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-foreground mb-1">
              Genre *
            </label>
            <select
              {...register("genre", { required: "Genre is required" })}
              className={`w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                errors.genre ? "border-destructive" : "border-border"
              }`}
            >
              <option value="">Select a genre</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            {errors.genre && <p className="text-sm text-red-500 mt-1">Genre is required</p>}
          </div>

          {/* Year Field */}
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-foreground mb-1">
              Published Year *
            </label>
            <input
              id="year"
              type="number"
              placeholder="2024"
              {...register("publishedYear", {
                required: "Year is required",
                min: { value: 1000, message: "Year must be valid" },
                max: { value: currentYear, message: "Year cannot be in the future" },
              })}
              className={`w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                errors.publishedYear ? "border-destructive" : "border-border"
              }`}
            />
            {errors.publishedYear && <p className="text-sm text-red-500 mt-1">{errors.publishedYear.message}</p>}
          </div>

          {/* Status Field */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-foreground mb-1">
              Status *
            </label>
            <select
              {...register("status")}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="Available">Available</option>
              <option value="Issued">Issued</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium bg-background border border-border text-foreground rounded hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
            >
              {isLoading ? "Saving..." : selectedBook ? "Update Book" : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
