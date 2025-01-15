const express = require("express");
const {
  getStats,
  getDeviation,
  StoreTargetPrice,
} = require("../controllers/coinController");


const { generateToken, validateToken } = require("../middleware/jwt_token");

const router = express.Router();

router.get("/stats", getStats);
router.get("/deviation", getDeviation);
router.post("/storeTarget", StoreTargetPrice);

module.exports = router;
