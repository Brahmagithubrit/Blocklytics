const express = require("express");

const { Signup, Login, isLoggedIn } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/isLoggedIn", isLoggedIn);

module.exports = router;
