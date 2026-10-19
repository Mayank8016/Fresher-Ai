import express from "express";
import { userDetails } from "../controllers/UserController/userController.js";

const userRoutes = express.Router();

// isAuth middleware server.js mein already laga hua hai
userRoutes.get("/", userDetails);

export default userRoutes;