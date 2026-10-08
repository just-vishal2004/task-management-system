# Task Management System

A full-stack task management application built with Next.js, TypeScript, Node.js, and Express.

## Features

- Create, view, edit, and delete tasks
- Status and priority management
- Due dates
- Search by title or description
- Filter by status and priority
- Task summary dashboard
- Client-side and server-side validation
- Loading, empty, and error states
- Responsive interface
- REST API with centralized error handling
- In-memory task storage

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Node.js
- Express.js

## Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

API: http://localhost:4000

### Frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

App: http://localhost:3000

## Environment Variables

Backend (`backend/.env`):

```env
PORT=4000
FRONTEND_URL=http://localhost:3000
```

Frontend (`frontend/.env.local`):

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

Example environment files are included.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a task |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| GET | `/api/health` | Health check |

## Data Storage

Tasks are stored in memory using a JavaScript array. No database or Firebase is used. Data resets when the backend restarts.

## Project Structure

```text
task-management-system/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       ├── services/
│       └── validators/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── types/
└── README.md
```
