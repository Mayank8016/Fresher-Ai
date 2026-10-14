import Otp from "../../models/Otp.js";
import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../../util/sendEmail.js";



// 1. Send OTP
export const sendSignupOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // Check whether user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Delete old OTP for this email
    await Otp.deleteMany({ email });

    // Save new OTP
    await Otp.create({
      email,
      otp,
      expiresAt: new Date(
        Date.now() + 10 * 60 * 1000
      ),
    });

    // For now just console.log
    // Later you will send this using Brevo
    await sendEmail({ to: email, subject: "Your OTP Code", text: `Your OTP code is: ${otp}` });

    return res.status(200).json({
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}; 

// verify OTP 
export const verifySignupOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // 1. Check input
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    // 2. Find OTP
    const otpRecord = await Otp.findOne({
      email,
      otp,
    });

    // 3. OTP not found
    if (!otpRecord) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    // 4. OTP is correct
    // Delete OTP immediately
    await Otp.deleteOne({
      _id: otpRecord._id,
    });

    // 5. Create temporary verification token
    const verificationToken = jwt.sign(
      {
        email: email,
        emailVerified: true,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      }
    );

    // 6. Send token to frontend
    return res.status(200).json({
      message: "Email verified successfully",
      verificationToken,
    });

  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};


// signup user
export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      verificationToken,
    } = req.body;

    // 1. Check all fields
    if (!name || !email || !password || !verificationToken) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2. Verify the token received after OTP verification
    const decoded = jwt.verify(
      verificationToken,
      process.env.JWT_SECRET
    );

    // 3. Make sure token belongs to same email
    if (
      decoded.email !== email ||
      decoded.emailVerified !== true
    ) {
      return res.status(401).json({
        message: "Email verification failed",
      });
    }

    // 4. Check if user already exists
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // 5. Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // 6. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 7. Send response
    return res.status(201).json({
      message: "Account created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    // JWT expired
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Email verification expired. Please verify again.",
      });
    }

    // Invalid JWT
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid verification token",
      });
    }

    return res.status(500).json({
      message: "Server error",
    });
  }
};