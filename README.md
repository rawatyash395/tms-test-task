# Transportation Management System (TMS)

A modern, full-stack Transportation Management System built with GraphQL, React, and TypeScript.

## Features

### Frontend

- Responsive grid and tile view layouts
- Beautiful, modern UI with smooth animations
- Hamburger menu with sub-menu navigation
- 10-column shipment data grid
- Interactive tile view with action menus
- Detailed shipment view with pop-up modal
- Role-based UI (Admin/Employee)

### Backend

- GraphQL API with Apollo Server
- JWT-based authentication with role-based access control
- Pagination and sorting
- Advanced filtering
- Performance optimization with DataLoader
- PostgreSQL database
- TypeScript for type safety

## Tech Stack

### Backend

- Node.js + TypeScript
- Apollo Server (GraphQL)
- PostgreSQL
- JWT Authentication
- bcrypt for password hashing
- DataLoader for batching

### Frontend

- React 18 + TypeScript
- Vite (build tool)
- TanStack Query (data fetching)
- Tailwind CSS (styling)
- Framer Motion (animations)
- React Router (navigation)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL installed locally

### Installation

1. Install all dependencies:

```bash
npm install
```

2. Set up the backend:

```bash
cd backend
cp .env.example .env
# Edit .env with your PostgreSQL credentials
npm run db:setup
```

3. Start the development servers:

```bash
# From root directory
npm run dev
```

This will start:

- Backend: http://localhost:4000 (GraphQL Playground)
- Frontend: http://localhost:5173

## Default Users

- **Admin**: `admin@tms.com` / `admin123`
- **Employee**: `employee@tms.com` / `employee123`

## Project Structure

```
tms-app/
├── backend/          # GraphQL API server
│   ├── src/
│   │   ├── schema/   # GraphQL schema definitions
│   │   ├── resolvers/ # GraphQL resolvers
│   │   ├── models/   # Data models
│   │   ├── auth/     # Authentication logic
│   │   └── db/       # Database connection
│   └── package.json
├── frontend/         # React application
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/    # Page components
│   │   ├── hooks/    # Custom hooks
│   │   └── graphql/  # GraphQL queries/mutations
│   └── package.json
└── package.json      # Root workspace config
```

## API Features

### Queries

- `shipments` - List all shipments with filters, pagination, sorting
- `shipment(id)` - Get single shipment details
- `me` - Get current user info

### Mutations

- `login` - Authenticate user
- `createShipment` - Add new shipment (Admin only)
- `updateShipment` - Update shipment (Admin only)
- `deleteShipment` - Delete shipment (Admin only)
- `flagShipment` - Flag shipment for review

## License

MIT
