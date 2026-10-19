
import express from "express";
import cors from "cors";
import Proxy from "express-http-proxy";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());


app.use(
  "/api/auth",
  Proxy(process.env.AUTH_SERVICE_URL, {
    proxyReqPathResolver: (req) => {
      return `/api/auth${req.url}`;
    },
  })
);


app.listen(PORT, () => {
  console.log(`Gateway service is running on port ${PORT}`);
});
