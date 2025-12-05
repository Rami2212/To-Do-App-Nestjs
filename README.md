# Fullstack Todo App

A full-stack Todo application with NestJS, Vue, PostgreSQL, and Docker.

## Features

- ✅ Create, view, toggle, and delete todos
- ✅ REST API with TypeORM and PostgreSQL
- ✅ Real-time UI updates
- ✅ Responsive design
- ✅ Fully dockerized with Docker Compose

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | NestJS + TypeScript + Bun |
| Database | PostgreSQL + TypeORM |
| Frontend | Vue + Vite + TypeScript |
| DevOps | Docker + NGINX |


## API Endpoints

- `GET /todos` - Get all todos
- `POST /todos` - Create todo
- `PATCH /todos/:id/toggle` - Toggle status
- `DELETE /todos/:id` - Delete todo