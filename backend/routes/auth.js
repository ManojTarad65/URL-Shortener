
// import express from "express";
// import User from "../models/User.js"; // 👈 add this
// import bcrypt from "bcryptjs"; // 👈 for password hashing

// const router = express.Router();

// // REGISTER
// router.post("/register", async (req, res) => {
//   try {
//     const { firstname, lastname, email, password } = req.body;

//     if (!firstname || !lastname || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Save new user
//     const newUser = new User({
//       firstname,
//       lastname,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     return res.status(201).json({ message: "User registered successfully 🚀" });
//   } catch (err) {
//     console.error("Register error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });


// export default router



import express from "express";
import crypto from "crypto";
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

// ✅ Register user + send OTP
router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if already registered
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Save user but not verified
    const newUser = new User({ firstname, lastname, email, password });
    await newUser.save();

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    await new Otp({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    }).save();

    // Send OTP email
    await sendEmail(email, "Verify your account", `Your OTP is: ${otp}`);

    return res.json({ message: "OTP sent to your email. Please verify." });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ✅ Verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const validOtp = await Otp.findOne({ email, otp });

    if (!validOtp) return res.status(400).json({ message: "Invalid OTP" });
    if (validOtp.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Mark user as verified
    await User.findOneAndUpdate({ email }, { isVerified: true });

    // Delete old OTPs
    await Otp.deleteMany({ email });

    return res.json({ message: "User verified successfully 🚀" });
  } catch (err) {
    console.error("OTP verify error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
