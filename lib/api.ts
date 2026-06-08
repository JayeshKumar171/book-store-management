import useSWR from "swr"
import type { Book, BookFormData } from "./types"

const API_BASE = "/api"

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch")
  return res.json()
}

export function useBooks() {
  const { data, error, isLoading, mutate } = useSWR<Book[]>(`${API_BASE}/books`, fetcher, { revalidateOnFocus: false })

  return {
    books: data || [],
    isLoading,
    error,
    mutate,
  }
}

export async function addBook(book: BookFormData): Promise<Book> {
  const res = await fetch(`${API_BASE}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  })
  if (!res.ok) throw new Error("Failed to add book")
  return res.json()
}

export async function updateBook(id: string, book: BookFormData): Promise<Book> {
  const res = await fetch(`${API_BASE}/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  })
  if (!res.ok) throw new Error("Failed to update book")
  return res.json()
}

export async function deleteBook(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/books/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete book")
}
