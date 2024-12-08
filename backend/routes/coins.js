const express = require("express");
const {
  getStats,
  getDeviation,
  Signup,
  Login,
} = require("../controllers/coinController");

const router = express.Router();

router.get("/stats", getStats);
router.get("/deviation", getDeviation);
router.post("/signup", Signup);
router.post("/login", Login);

module.exports = router;
