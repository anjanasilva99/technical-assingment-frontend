"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { BookOpen, Menu, X } from "lucide-react"

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleLogout = async () => {
    await logout()
    closeMenu()
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center" onClick={closeMenu}>
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">BookShelf</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/books"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/books") ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Books
                </Link>
                <Link
                  href="/books/add"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/books/add") ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Add Book
                </Link>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/auth/login") ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/auth/register")
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                <Link
                  href="/books"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive("/books") ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={closeMenu}
                >
                  Books
                </Link>
                <Link
                  href="/books/add"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive("/books/add") ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={closeMenu}
                >
                  Add Book
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive("/auth/login") ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive("/auth/register")
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

