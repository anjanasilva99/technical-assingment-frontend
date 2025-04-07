// Base API client for making requests to the backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// Types
export interface User {
  username: string
  email: string
  firstName: string
  lastName: string
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  message?: string
}

export interface Book {
  id: string
  title: string
  author: string
  genre: string
  publicationYear: number
  createdAt: string
  updatedAt: string
}

export interface BookFormData {
  title: string
  author: string
  genre: string
  publicationYear: number
}

// Auth API
export const authApi = {
  register: async (userData: {
    username: string
    email: string
    password: string
    firstName: string
    lastName: string
  }): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Registration failed")
    }

    return response.json()
  },

  login: async (credentials: {
    username: string
    password: string
  }): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Login failed")
    }

    return response.json()
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Token refresh failed")
    }

    return response.json()
  },

  logout: async (accessToken: string, refreshToken: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Logout failed")
    }

    return response.json()
  },

  validateToken: async (token: string): Promise<{ valid: boolean; payload: any }> => {
    const response = await fetch(`${API_BASE_URL}/auth/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Token validation failed")
    }

    return response.json()
  },
}

// Books API
export const booksApi = {
  getAll: async (token: string): Promise<Book[]> => {
    const response = await fetch(`${API_BASE_URL}/books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Failed to fetch books")
    }

    return response.json()
  },

  getById: async (id: string, token: string): Promise<Book> => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || `Failed to fetch book with ID ${id}`)
    }

    return response.json()
  },

  create: async (bookData: BookFormData, token: string): Promise<Book> => {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Failed to create book")
    }

    return response.json()
  },

  update: async (id: string, bookData: Partial<BookFormData>, token: string): Promise<Book> => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || `Failed to update book with ID ${id}`)
    }

    return response.json()
  },

  delete: async (id: string, token: string): Promise<Book> => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || `Failed to delete book with ID ${id}`)
    }

    return response.json()
  },
}

