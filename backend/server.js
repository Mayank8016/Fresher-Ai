import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/AuthRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();


const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Database
connectDB();

// Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});