# Book Management Frontend

This is the frontend application for the Book Management system. The application allows users to register, login, and manage their book collections.

## Getting Started

### Prerequisites
- Node.js (latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory
3. Install dependencies:
```bash
npm install
# or
yarn install
```

### Running the Application

Development mode:
```bash
npm run dev
# or
yarn dev
```

Production build:
```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Features

- User authentication (register, login, logout)
- Book management (create, read, update, delete)
- Responsive design

## API Integration

This frontend application connects to a Book Management API with the following endpoints:

- Authentication (register, login, token refresh, logout)
- Book management (CRUD operations)

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## Technologies Used

- Next.js
- React
- Radix UI components
- React Hook Form
