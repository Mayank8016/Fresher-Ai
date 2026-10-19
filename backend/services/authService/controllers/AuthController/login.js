import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check all fields
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // 4. Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
     res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Local HTTP development only
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    //  5. Send response
    return res.status(200).json({
      message: "Login successful"
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export default loginHandler;
