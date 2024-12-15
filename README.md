# Bytive - Todo Manager

## Features

- **User Authentication**: Users can sign up, log in, and log out securely.
- **Create Todos**: Users can create new tasks with a title, description, and status.
- **View Todos**: View all tasks arranged in a grid with title, description, and status.
- **Edit Todos**: Update the status of an existing task.
- **Delete Todos**: Remove tasks with a single click.
- **Responsive Design**: Frontend is styled with Tailwindcss to work on all devices.

---

## Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **MongoDB**: Setup a MongoDB database and have the URI ready.
- **Git**: Version control to clone the repository.

---

## Steps to Clone and Run the Project Locally

### 1. Clone the Repository

Clone the repository using the following command:

```bash
git clone https://github.com/kazutokidigaya/bytive.git
```

### 2. Setting up the Backend

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Replace the server.js file with the following code:

```bash
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Enable cookies
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", userRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: http://localhost:${PORT}`);
  connectDb();
});
```

Create a .env file in the backend folder and add the following:

```bash
PORT=5000
MONGO_URI=<Your MongoDB URI>
JWT_ACCESS_TOKEN_SECRET=<Your JWT Access Token Secret>
JWT_REFRESH_TOKEN_SECRET=<Your JWT Refresh Token Secret>
FRONTEND_URL=http://localhost:3000
```

Start the backend server:

```bash
npm start
```

### 3. Setting up the Frontend

Open Up a new terminal in root directory and Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend server:

```bash
npm run start
```
