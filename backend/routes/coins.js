const express = require("express");
const {
  getStats,
  getDeviation,
  StoreTargetPrice,
  getBitcoinHistory
} = require("../controllers/coinController");


const { generateToken, validateToken } = require("../middleware/jwt_token");

const router = express.Router();

router.get("/stats", getStats);
router.get("/deviation", getDeviation);
router.get("/history", getBitcoinHistory);

router.post("/storeTarget", StoreTargetPrice);

module.exports = router;
