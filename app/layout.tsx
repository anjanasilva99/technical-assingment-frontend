import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/lib/auth-context"
import Navbar from "@/components/layout/navbar"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BookShelf - Book Management App",
  description: "A web application for managing your book collection",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">{children}</main>
              <footer className="py-6 border-t">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <p className="text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} BookShelf. All rights reserved.
                  </p>
                </div>
              </footer>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'