const express = require("express");
const {
  getStats,
  getDeviation,
  Signup,
  Login,
} = require("../controllers/coinController");
const { generateToken, validateToken } = require("../middleware/jwt_token");


const router = express.Router();

router.get("/stats",validateToken, getStats);
router.get("/deviation",validateToken, getDeviation);
router.post("/signup",validateToken, Signup);
router.post("/login",validateToken, Login);


module.exports = router;
