"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { booksApi, type Book, type BookFormData } from "@/lib/api"
import BookForm from "@/components/books/book-form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function EditBookPage() {
  const { id } = useParams<{ id: string }>()
  const { accessToken, isAuthenticated } = useAuth()
  const [book, setBook] = useState<Book | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated || !accessToken || !id) return

    const fetchBook = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await booksApi.getById(id as string, accessToken)
        setBook(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch book")
        console.error("Error fetching book:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBook()
  }, [accessToken, id, isAuthenticated])

  const handleSubmit = async (data: BookFormData) => {
    if (!accessToken || !id) return

    setIsSaving(true)
    try {
      await booksApi.update(id as string, data, accessToken)
    } finally {
      setIsSaving(false)
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

  if (isLoading) {
    return (
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Edit Book</h1>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading book details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Edit Book</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Edit Book</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Book not found</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-6">Edit Book</h1>
      <BookForm
        book={book}
        onSubmit={handleSubmit}
        isLoading={isSaving}
        title="Edit Book"
        description="Update the details of your book"
        submitLabel="Save Changes"
      />
    </div>
  )
}

