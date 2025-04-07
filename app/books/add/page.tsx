"use client"

import { useAuth } from "@/lib/auth-context"
import { booksApi, type BookFormData } from "@/lib/api"
import BookForm from "@/components/books/book-form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AddBookPage() {
  const { accessToken, isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: BookFormData) => {
    if (!accessToken) return

    setIsLoading(true)
    try {
      await booksApi.create(data, accessToken)
    } finally {
      setIsLoading(false)
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
      <h1 className="text-3xl font-bold mb-6">Add New Book</h1>
      <BookForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        title="Add New Book"
        description="Fill in the details to add a new book to your collection"
        submitLabel="Add Book"
      />
    </div>
  )
}

