
# Student Management System

A full-stack student management application built using the MERN stack.

## Technologies Used

- MongoDB Atlas - Database
- Express.js - Backend framework
- React.js - Frontend library
- Node.js - JavaScript runtime
- Mongoose - MongoDB object modeling
- Axios - API communication
- Vite - Frontend development tool

## Features

- Add new students
- View all students
- Update student details
- Delete students
- Search students by name and email
- Store student information in MongoDB Atlas

## Project Structure

```text
mern-practice/
├── client/
│   └── src/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   └── routes/
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/students | Get all students |
| POST | /api/students | Add a student |
| PUT | /api/students/:id | Update a student |
| DELETE | /api/students/:id | Delete a student |

## Current Status

- React frontend created using Vite.
- Express backend created and tested.
- MongoDB Atlas connected successfully.
- Student CRUD operations working.
- Search functionality working.
- Frontend production build successful.
- ESLint check passed.

## How to Run the Project

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the server folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Never upload your actual `.env` file or database password to GitHub.
