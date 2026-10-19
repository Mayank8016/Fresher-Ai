import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/AuthRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import isAuth from "./middlewares/isAuth.js";

dotenv.config();

const app = express();


const port = process.env.PORT || 8001;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", isAuth, userRoutes);

// Database
connectDB();

// Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});