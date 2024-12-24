const express = require("express");
const { getStats, getDeviation } = require("../controllers/coinController");

const {
  Signup,
  Login,
  isLoggedIn,
} = require("../controllers/authController");
const { generateToken, validateToken } = require("../middleware/jwt_token");

const router = express.Router();

router.get("/stats", getStats);
router.get("/deviation", getDeviation);
router.post("/signup", Signup);
router.post("/login", Login);
router.get("/isLoggedIn", isLoggedIn);

module.exports = router;
