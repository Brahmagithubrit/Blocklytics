const axios = require("axios");
const env = require("dotenv");
const { currency, User } = require("../models/model.index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const express = require("express");
const { generateToken } = require("../middleware/jwt_token");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

env.config();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Signup user
const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).send("All fields are required.");
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).send("User with this email already exists.");
    const hashedPassword = await bcrypt.hash(password, 10);
    await new User({ name, email, password: hashedPassword }).save();
    res.status(200).send("User inserted.");
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
};

// Login user and set a cookie
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required" });
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const generatedToken = generateToken({ email });
    res.cookie("cryptoToken", generatedToken, {
      httpOnly: true,
      secure: false,
    });
    res.status(200).json({ message: "Login successful", generatedToken });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

// Check if cookie exists
const isLoggedIn = (req, res) => {
  try {
    const token = req.cookies?.cryptoToken;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: "Authenticated", user });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired cookie" });
  }
};

const getcookie = () => {
  const result = res.cookie?.cryptoToken;
  if (!result) {
    res.send(true);
  } else res.send(false);
};

module.exports = {
  Signup,
  getcookie,
  Login,
  isLoggedIn,
};
