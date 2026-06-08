"use client"

import { useBookContext } from "@/lib/context"

interface DeleteConfirmationProps {
  onConfirm: (bookId: string) => Promise<void>
  isLoading: boolean
}

export function DeleteConfirmation({ onConfirm, isLoading }: DeleteConfirmationProps) {
  const { deleteConfirmation, setDeleteConfirmation } = useBookContext()

  if (!deleteConfirmation?.isOpen || !deleteConfirmation?.bookId) {
    return null
  }

  const handleConfirm = async () => {
    await onConfirm(deleteConfirmation.bookId!)
    setDeleteConfirmation({ isOpen: false, bookId: null })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setDeleteConfirmation({ isOpen: false, bookId: null })}
      />

      {/* Dialog */}
      <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-sm w-full mx-4 p-6 space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Delete Book</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Are you sure you want to delete this book? This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <button
            onClick={() => setDeleteConfirmation({ isOpen: false, bookId: null })}
            className="px-4 py-2 text-sm font-medium bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-red-400 transition-colors"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}
