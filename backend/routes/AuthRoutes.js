import { Router } from "express";
import { registerUser, sendSignupOtp, verifySignupOtp } from "../controllers/AuthController/signUp.js";
import  loginHandler  from "../controllers/AuthController/login.js";
import logoutHandler from "../controllers/AuthController/logout.js";


const authRoutes = Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/send-signup-otp", sendSignupOtp);
authRoutes.post("/verify-otp", verifySignupOtp);
authRoutes.post("/login", loginHandler);
authRoutes.post("/logout", logoutHandler);

export default authRoutes;