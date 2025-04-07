"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { Book, BookFormData } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface BookFormProps {
  book?: Book
  onSubmit: (data: BookFormData) => Promise<void>
  isLoading: boolean
  title: string
  description: string
  submitLabel: string
}

const currentYear = new Date().getFullYear()

export default function BookForm({ book, onSubmit, isLoading, title, description, submitLabel }: BookFormProps) {
  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    genre: "",
    publicationYear: currentYear,
  })
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        publicationYear: book.publicationYear,
      })
    }
  }, [book])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "publicationYear") {
      const year = Number.parseInt(value)
      if (!isNaN(year)) {
        setFormData((prev) => ({ ...prev, [name]: year }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate form
    if (!formData.title.trim()) {
      setError("Title is required")
      return
    }

    if (!formData.author.trim()) {
      setError("Author is required")
      return
    }

    if (!formData.genre.trim()) {
      setError("Genre is required")
      return
    }

    if (formData.publicationYear < 1000 || formData.publicationYear > currentYear) {
      setError(`Publication year must be between 1000 and ${currentYear}`)
      return
    }

    try {
      await onSubmit(formData)
      router.push("/books")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.")
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Input
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="publicationYear">Publication Year</Label>
            <Input
              id="publicationYear"
              name="publicationYear"
              type="number"
              min="1000"
              max={currentYear}
              value={formData.publicationYear}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => router.push("/books")} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

