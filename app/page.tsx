import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] text-center px-4">
      <BookOpen className="h-24 w-24 text-primary mb-6" />
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">Welcome to BookShelf</h1>
      <p className="text-xl text-muted-foreground max-w-2xl mb-8">
        Your personal library management system. Keep track of your books, organize your collection, and never lose a
        book again.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link href="/auth/login">Login</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/auth/register">Register</Link>
        </Button>
      </div>
    </div>
  )
}

