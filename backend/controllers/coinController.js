const axios = require("axios");
const env = require("dotenv");
const { currency, User } = require("../models/model.index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookie = require("cookie-parser");
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
app.use(cookie());

const fetchCoins = async () => {
  try {
    if (mongoose.connection.readyState !== 1) return;

    const response = await axios.get(process.env.site_url, {
      params: {
        vs_currency: "usd",
        ids: "bitcoin,ethereum,matic-network,solana,litecoin,polkadot,dogecoin",
      },
      headers: { accept: "application/json" },
    });

    const data = {
      bitcoin: response.data.find((coin) => coin.id === "bitcoin"),
      ethereum: response.data.find((coin) => coin.id === "ethereum"),
      matic: response.data.find((coin) => coin.id === "matic-network"),
      solana: response.data.find((coin) => coin.id === "solana"),
      litecoin: response.data.find((coin) => coin.id === "litecoin"),
      polkadot: response.data.find((coin) => coin.id === "polkadot"),
      dogecoin: response.data.find((coin) => coin.id === "dogecoin"),
    };

    const formattedData = {
      bitcoin: {
        current_price: data.bitcoin.current_price,
        market_cap: data.bitcoin.market_cap,
        price_change_percentage_24h: data.bitcoin.price_change_percentage_24h,
      },
      ethereum: {
        current_price: data.ethereum.current_price,
        market_cap: data.ethereum.market_cap,
        price_change_percentage_24h: data.ethereum.price_change_percentage_24h,
      },
      matic: {
        current_price: data.matic.current_price,
        market_cap: data.matic.market_cap,
        price_change_percentage_24h: data.matic.price_change_percentage_24h,
      },
      solana: {
        current_price: data.solana.current_price,
        market_cap: data.solana.market_cap,
        price_change_percentage_24h: data.solana.price_change_percentage_24h,
      },
      litecoin: {
        current_price: data.litecoin.current_price,
        market_cap: data.litecoin.market_cap,
        price_change_percentage_24h: data.litecoin.price_change_percentage_24h,
      },
      polkadot: {
        current_price: data.polkadot.current_price,
        market_cap: data.polkadot.market_cap,
        price_change_percentage_24h: data.polkadot.price_change_percentage_24h,
      },
      dogecoin: {
        current_price: data.dogecoin.current_price,
        market_cap: data.dogecoin.market_cap,
        price_change_percentage_24h: data.dogecoin.price_change_percentage_24h,
      },
    };

    const currencyData = new currency(formattedData);
    await currencyData.save();
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Get the latest stats for a specific coin
const getStats = async (req, res) => {
  const coinType = req.query.coin;
  if (
    ![
      "bitcoin",
      "ethereum",
      "matic",
      "solana",
      "litecoin",
      "polkadot",
      "dogecoin",
    ].includes(coinType)
  ) {
    return res.status(400).send("Invalid coin type.");
  }
  try {
    const latestData = await currency.findOne().sort({ created_at: -1 }).exec();
    if (!latestData) return res.status(404).send("No data found.");
    res.json(latestData[coinType]);
  } catch (error) {
    res.status(500).send("Error fetching stats.");
  }
};

// Get the deviation (mean and standard deviation) for a specific coin
const getDeviation = async (req, res) => {
  const coinType = req.query.coin;
  if (
    ![
      "bitcoin",
      "ethereum",
      "matic",
      "solana",
      "litecoin",
      "polkadot",
      "dogecoin",
    ].includes(coinType)
  ) {
    return res.status(400).send("Invalid coin type.");
  }
  try {
    const data = await currency
      .find({}, { [coinType]: 1, _id: 0 })
      .limit(100)
      .exec();
    if (!data.length) return res.status(404).send("No data found.");
    const values = data.map((entry) => entry[coinType].current_price);
    const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
    const stdDev = Math.sqrt(
      values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
        values.length
    );
    res.json({ mean, standardDeviation: stdDev });
  } catch (error) {
    res.status(500).send("Error calculating deviation.");
  }
};



module.exports = {
  fetchCoins,
  getStats,
  getDeviation,
 
};
