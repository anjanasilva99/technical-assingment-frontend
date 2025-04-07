# Book Management API Documentation

## Base URL
```
http://localhost:8000
```

## Authentication Endpoints

### 1. Register User
```
POST /auth/register
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Validation Rules:**
- username: string, minimum 3 characters
- email: valid email format
- password: string, minimum 8 characters
- firstName: string
- lastName: string

**Response (201):**
```json
{
  "message": "User registered successfully",
  "access_token": "eyJhbGciOiJSUzI1...",
  "refresh_token": "eyJhbGciOiJIUzI1...",
  "expires_in": 300
}
```

### 2. Login
```
POST /auth/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "access_token": "eyJhbGciOiJSUzI1...",
  "refresh_token": "eyJhbGciOiJIUzI1...",
  "expires_in": 300
}
```

### 3. Refresh Token
```
POST /auth/refresh
Content-Type: application/json
```

**Request Body:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1..."
}
```

**Response (200):**
```json
{
  "access_token": "eyJhbGciOiJSUzI1...",
  "refresh_token": "eyJhbGciOiJIUzI1...",
  "expires_in": 300
}
```

### 4. Logout
```
POST /auth/logout
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1..."
}
```

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

### 5. Validate Token
```
POST /auth/validate
Content-Type: application/json
```

**Request Body:**
```json
{
  "token": "eyJhbGciOiJSUzI1..."
}
```

**Response (200):**
```json
{
  "valid": true,
  "payload": {
    // JWT payload data
  }
}
```

## Protected API Endpoints

All book-related endpoints require authentication. Include the access token in the Authorization header:
```
Authorization: Bearer <access_token>
```

### 1. Create a Book
```
POST /books
Content-Type: application/json
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "publicationYear": 1925
}
```

**Response (201):**
```json
{
  "id": "string",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "publicationYear": 1925,
  "createdAt": "2024-04-05T12:00:00Z",
  "updatedAt": "2024-04-05T12:00:00Z"
}
```

### 2. Get All Books
```
GET /books
Authorization: Bearer <access_token>
```

**Response (200):**
```json
[
  {
    "id": "string",
    "title": "string",
    "author": "string",
    "genre": "string",
    "publicationYear": number,
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

### 3. Get Book by ID
```
GET /books/{id}
Authorization: Bearer <access_token>
```

**Parameters:**
- `id` (path): The ID of the book

**Response (200):**
```json
{
  "id": "string",
  "title": "string",
  "author": "string",
  "genre": "string",
  "publicationYear": number,
  "createdAt": "string",
  "updatedAt": "string"
}
```

### 4. Update Book
```
PATCH /books/{id}
Content-Type: application/json
Authorization: Bearer <access_token>
```

**Parameters:**
- `id` (path): The ID of the book

**Request Body:**
```json
{
  "title": "string",
  "author": "string",
  "genre": "string",
  "publicationYear": number
}
```
Note: All fields in the request body are optional

**Response (200):**
```json
{
  "id": "string",
  "title": "string",
  "author": "string",
  "genre": "string",
  "publicationYear": number,
  "createdAt": "string",
  "updatedAt": "string"
}
```

### 5. Delete Book
```
DELETE /books/{id}
Authorization: Bearer <access_token>
```

**Parameters:**
- `id` (path): The ID of the book

**Response (200):**
```json
{
  "id": "string",
  "title": "string",
  "author": "string",
  "genre": "string",
  "publicationYear": number,
  "createdAt": "string",
  "updatedAt": "string"
}
```

## Error Responses

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Book with ID {id} not found"
}
```

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["validation error messages"]
}
```

## Validation Rules
- `title`: Required, string
- `author`: Required, string
- `genre`: Required, string
- `publicationYear`: Required, integer, between 1000 and current year

## Interactive Documentation
A Swagger UI interface is available at:
```
http://localhost:8000/api
``` 