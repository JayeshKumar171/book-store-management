import { type NextRequest, NextResponse } from "next/server"
import type { Book } from "@/lib/types"

const booksStore: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    publishedYear: 1925,
    status: "Available",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    publishedYear: 1960,
    status: "Issued",
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    publishedYear: 1949,
    status: "Available",
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    publishedYear: 1813,
    status: "Available",
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    publishedYear: 1951,
    status: "Issued",
  },
  {
    id: "6",
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian",
    publishedYear: 1932,
    status: "Available",
  },
  {
    id: "7",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    publishedYear: 1937,
    status: "Available",
  },
  {
    id: "8",
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    publishedYear: 1965,
    status: "Issued",
  },
  {
    id: "9",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    publishedYear: 1954,
    status: "Available",
  },
  {
    id: "10",
    title: "Foundation",
    author: "Isaac Asimov",
    genre: "Science Fiction",
    publishedYear: 1951,
    status: "Available",
  },
]

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()

  const index = booksStore.findIndex((b) => b.id === id)
  if (index === -1) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 })
  }

  booksStore[index] = { ...booksStore[index], ...body }
  return NextResponse.json(booksStore[index])
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const index = booksStore.findIndex((b) => b.id === id)
  if (index === -1) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 })
  }

  booksStore.splice(index, 1)
  return NextResponse.json({ success: true })
}
