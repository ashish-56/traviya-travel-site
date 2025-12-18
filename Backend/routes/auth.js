const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

// Helper functions
const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ msg: "Please fill all fields" });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashed });
    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();

    // Send refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // ✅ REQUIRED on HTTPS (Render + Vercel)
      sameSite: "none", // ✅ REQUIRED for cross-site cookies
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Please fill all fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Save refresh token in DB
    const refreshToken = generateRefreshToken(user);
    const accessToken = generateAccessToken(user);
    user.refreshToken = refreshToken;
    await user.save();

    // Send refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // ✅ REQUIRED on HTTPS (Render + Vercel)
      sameSite: "none", // ✅ REQUIRED for cross-site cookies
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// REFRESH
router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ msg: "No refresh token" });

  try {
    // Verify token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    // Check DB
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ msg: "Invalid refresh token" });
    }

    // Issue new access token
    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error(err);
    res.status(403).json({ msg: "Invalid refresh token" });
  }
});

module.exports = router;
