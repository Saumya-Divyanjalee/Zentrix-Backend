# Zentrix — Backend

AI-powered productivity and study management REST API, built with Node.js, Express, and TypeScript.

**Repository:** https://github.com/Saumya-Divyanjalee/Zentrix-backend

## Overview

Zentrix is a full-stack productivity platform that helps users manage tasks, notes, and subjects while leveraging Google Gemini AI for content summarization, quiz generation, and personalized study planning. This repository contains the backend REST API.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT
- **AI:** Google Gemini API

## Features

- Secure JWT-based authentication (register, login, profile management)
- Task management with status and priority filtering
- Note-taking organized by subject
- Subject management
- Dashboard analytics (task/note counts, productivity percentage)
- AI-powered tools — summarization, quiz generation, and study plan creation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A MongoDB instance (local or Atlas)
- A Google Gemini API key

### Installation

```bash
# Clone the repository
git clone https://github.com/Saumya-Divyanjalee/Zentrix-backend.git
cd Zentrix-backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Fill in MONGO_URI, JWT_SECRET, and GEMINI_API_KEY

# Start the development server
npm run dev
```

## API Reference

### Authentication

| Method | Endpoint              | Description                              |
|--------|------------------------|-------------------------------------------|
| POST   | `/api/auth/register`   | Create a new account                       |
| POST   | `/api/auth/login`      | Authenticate and receive a JWT             |
| GET    | `/api/auth/profile`    | Get the authenticated user's profile 🔒    |
| PUT    | `/api/auth/profile`    | Update name or password 🔒                 |

### Dashboard

| Method | Endpoint               | Description                                          |
|--------|--------------------------|--------------------------------------------------------|
| GET    | `/api/dashboard/stats`   | Get total tasks, total notes, and productivity % 🔒    |

### Tasks

| Method | Endpoint          | Description                                                |
|--------|--------------------|---------------------------------------------------------------|
| GET    | `/api/tasks`        | Get all tasks (filter with `?status=` and `?priority=`) 🔒    |
| POST   | `/api/tasks`        | Create a task 🔒                                               |
| GET    | `/api/tasks/:id`    | Get a single task 🔒                                           |
| PUT    | `/api/tasks/:id`    | Update a task 🔒                                               |
| DELETE | `/api/tasks/:id`    | Delete a task 🔒                                               |

### Notes

| Method | Endpoint          | Description                                       |
|--------|--------------------|--------------------------------------------------------|
| GET    | `/api/notes`        | Get all notes (filter with `?subject=`) 🔒              |
| POST   | `/api/notes`        | Create a note 🔒                                         |
| GET    | `/api/notes/:id`    | Get a single note 🔒                                     |
| PUT    | `/api/notes/:id`    | Update a note 🔒                                         |
| DELETE | `/api/notes/:id`    | Delete a note 🔒                                         |

### Subjects

| Method | Endpoint             | Description           |
|--------|------------------------|--------------------------|
| GET    | `/api/subjects`        | Get all subjects 🔒       |
| POST   | `/api/subjects`        | Create a subject 🔒       |
| PUT    | `/api/subjects/:id`    | Update a subject 🔒       |
| DELETE | `/api/subjects/:id`    | Delete a subject 🔒       |

### AI (powered by Google Gemini)

| Method | Endpoint                | Body                  | Description                              |
|--------|---------------------------|------------------------|---------------------------------------------|
| POST   | `/api/ai/summarize`       | `{ content }`           | Returns a summary of the given content 🔒    |
| POST   | `/api/ai/quiz`             | `{ content }`           | Generates 5 multiple-choice questions 🔒     |
| POST   | `/api/ai/study-plan`      | `{ topic, days }`       | Generates a structured study plan 🔒         |

> 🔒 = requires a valid JWT in the `Authorization` header

## Architecture Highlights

- Validation logic (`validators/`) is cleanly separated from business logic (`controllers/`)
- Dashboard analytics live in a dedicated controller, decoupled from task CRUD
- Domain-separated TypeScript types (`auth.types`, `task.types`, `note.types`)
- A centralized `ApiResponse` utility keeps JSON responses consistent across all endpoints
- JWT middleware guards every protected route

## Author

**Saumya Divyanjalee**
GitHub: [@Saumya-Divyanjalee](https://github.com/Saumya-Divyanjalee)
