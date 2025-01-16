# Vial Query Management Application Take Home

## Live Deployment

https://vial-take-home-wc.netlify.app/

Deployed using backend on AWS EC2 and frontend on Netlify.

### Demo

[![Short Demo](https://img.youtube.com/vi/ipCZac3Ggrs/0.jpg)](https://www.youtube.com/watch?v=ipCZac3Ggrs)

## Getting Started

### Backend Setup

- copy the .env.example file into a .env file
- `docker-compose build`
- `docker-compose up`
- `npm run migrate`
- `npm run seed`
- if you view your database, you should be able to see a populated form data table
- running the following in your terminal will perform a GET request to fetch the form data

```bash
curl --location 'http://127.0.0.1:8080/form-data' --header 'Content-Type: application/json'
```

### Frontend Setup

- `cd take-home-frontend`
- `npm install`
- `npm run dev`
- after these steps your development server will start on your localhost (e.g http://localhost:5173)

## Introduction

This is a simple **Query Management Application** where users can create queries. Each query will have a title, description, date, and a status (OPEN, RESOLVED). The application consists of a simple frontend (UI), a backend API, and a database to persist the query data.

The backend is built with Prisma ORM, Fastify, Node, and PostgreSQL. The frontend is built with React with Typescript, TailwindCSS, ShadCN, and React Query. The updates to the data in the table view are reflected in real-time by using React Query.

## Tech stack

- [Node](https://nodejs.org/en/)
- [Typescript](www.google.com)
- [Fastify](https://www.fastify.io/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker and Compose](https://www.docker.com/)
- [ShadCN](https://ui.shadcn.com/)
- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/v5/docs)

## API Routes Documentation

This document outlines the available endpoints for managing queries in the `queryRoutes` and `formDataRoutes` module. These endpoints handle CRUD operations using Fastify and Prisma.

### Endpoints

#### FormData Endpoints

---

#### 1. GET `/form-data`

Retrieve all form data with associated queries.

- **Method**: `GET`
- **Description**: Fetches all form data entries along with their related queries.
- **Response**:
  - **200 OK**:
    ```json
    {
      "total": 5,
      "formData": [
        {
          "id": "123",
          "name": "Form A",
          "createdAt": "2025-01-15T04:29:48.689Z",
          "updatedAt": "2025-01-15T04:29:48.689Z",
          "query": [
            {
              "id": "456",
              "title": "Query 1",
              "description": "Description of query",
              "status": "OPEN"
            }
          ]
        }
      ]
    }
    ```
- **Error Handling**:
  - **Error**:
    - Code: `400 Bad Request`
    - Message: `"failed to fetch form data"`
  - All errors are logged with the component name `formDataRoutes` for easier debugging.

#### Query Endpoints

---

#### 1. GET `/query`

Retrieve all queries.

- **Response:**
  - `200 OK`: Returns the total number of queries and their details.
    ```json
    {
      "total": 3,
      "query": [
        {
          "id": "123",
          "title": "Sample Query",
          "description": "Description of the query",
          "status": "OPEN",
          "formDataId": "abc"
        }
      ]
    }
    ```
  - **Error Handling:** If retrieval fails, returns a `500 Internal Server Error` with the message `"failed to fetch query"`.

---

#### 2. POST `/query`

Create a new query.

- **Request Body:**
  ```json
  {
    "title": "New Query Title",
    "description": "Details about the query",
    "formDataId": "form123"
  }
  ```

---

#### 3. PUT `/query/{queryId}`

Update the status of an existing query.

- **Request Body:**
  ```json
  {
    "status": "RESOLVED"
  }
  ```

---

#### 4. DELETE `/query/{queryId}`

Delete an existing query.

## Future Considerations

- Data can be paginated on both frontend and backend to limit request sizes and prevent the clients from pulling the entire FormData database each time.
- Authentication system for control over data.
- Search engine, sorting, and filtering for data.
