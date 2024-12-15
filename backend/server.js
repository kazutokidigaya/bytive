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
connectDb();
app.use(
  cors({
    origin: `https://todo-bytive.netlify.app/`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Enable cookies
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRoutes);
app.use("/api/tasks", taskRoutes);

app.use((req, res, next) => {
  if (
    process.env.NODE_ENV === "production" &&
    req.headers["x-forwarded-proto"] !== "https"
  ) {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend is up and running!" });
});

// Start the server
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  const HOST = "0.0.0.0"; // Bind to all interfaces for Render
  const server = app.listen(PORT, HOST, () =>
    console.log(`Server is running on port ${PORT}`)
  );

  // Set custom timeouts to avoid Render connection resets
  server.keepAliveTimeout = 120000; // 2 minutes
  server.headersTimeout = 120000; // 2 minutes
}

export { app };
