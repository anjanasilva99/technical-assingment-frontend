"use client"

import Link from "next/link"
import type { Book } from "@/lib/api"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"

interface BookCardProps {
  book: Book
  onDelete: (id: string) => void
}

export default function BookCard({ book, onDelete }: BookCardProps) {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this book?")) {
      onDelete(book.id)
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-2">{book.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Author:</span> {book.author}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Genre:</span> {book.genre}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Year:</span> {book.publicationYear}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/books/${book.id}`}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Link>
        </Button>
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

