"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { booksApi, type Book } from "@/lib/api"
import BookCard from "@/components/books/book-card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Plus } from "lucide-react"
import Link from "next/link"

export default function BooksPage() {
  const { accessToken, isAuthenticated } = useAuth()
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated || !accessToken) return

    const fetchBooks = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await booksApi.getAll(accessToken)
        setBooks(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch books")
        console.error("Error fetching books:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBooks()
  }, [accessToken, isAuthenticated])

  const handleDeleteBook = async (id: string) => {
    if (!accessToken) return

    try {
      await booksApi.delete(id, accessToken)
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete book")
      console.error("Error deleting book:", err)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="container">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You must be logged in to view this page. Please{" "}
            <Link href="/auth/login" className="font-medium underline">
              login
            </Link>{" "}
            or{" "}
            <Link href="/auth/register" className="font-medium underline">
              register
            </Link>
            .
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Books</h1>
        <Button asChild>
          <Link href="/books/add">
            <Plus className="h-4 w-4 mr-2" />
            Add Book
          </Link>
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading books...</p>
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">No books found</h2>
          <p className="text-muted-foreground mb-4">You haven&apos;t added any books to your collection yet.</p>
          <Button asChild>
            <Link href="/books/add">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Book
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onDelete={handleDeleteBook} />
          ))}
        </div>
      )}
    </div>
  )
}

