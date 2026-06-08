export interface Book {
  id: string
  title: string
  author: string
  genre: string
  publishedYear: number
  status: "Available" | "Issued"
}

export interface BookFormData {
  title: string
  author: string
  genre: string
  publishedYear: number
  status: "Available" | "Issued"
}
