const axios = require("axios");
const env = require("dotenv");
const currency = require("../models/model.index");
const mongoose = require("mongoose");
env.config();

const fetchCoins = async () => {
  console.log("Fetching coin data...");

  try {
    if (mongoose.connection.readyState !== 1) {
      console.error("MongoDB is not connected.");
      return;
    }

    const response = await axios.get(process.env.site_url, {
      params: {
        vs_currency: "usd",
        ids: "bitcoin,ethereum,matic-network,solana,litecoin,polkadot,dogecoin",
      },
      headers: {
        accept: "application/json",
      },
    });

    console.log("Coin data fetched successfully.");
    console.log("Raw response data:", response.data);

    const data = {
      bitcoin: response.data.find((coin) => coin.id === "bitcoin"),
      ethereum: response.data.find((coin) => coin.id === "ethereum"),
      matic: response.data.find((coin) => coin.id === "matic-network"),
      solana: response.data.find((coin) => coin.id === "solana"),
      litecoin: response.data.find((coin) => coin.id === "litecoin"),
      polkadot: response.data.find((coin) => coin.id === "polkadot"),
      dogecoin: response.data.find((coin) => coin.id === "dogecoin"),
    };

    console.log("Coin data formatted.");
    console.log("Formatted data:", data);

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

    console.log("Formatted data ready for MongoDB.");
    console.log("Formatted data for saving:", formattedData);

    const currencyData = new currency(formattedData);
    console.log("Prepared data for MongoDB:", currencyData);

    await currencyData.save();

    console.log("Data saved to MongoDB successfully.");
  } catch (error) {
    console.error("Error fetching or saving coin data:", error.message);
  }
};

const getStats = async (req, res) => {
  console.log("Fetching stats for coin:", req.query.coin);

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
    console.log("Invalid coin type:", coinType);
    return res.status(400).send("Invalid coin type.");
  }

  try {
    const latestData = await currency.findOne().sort({ created_at: -1 }).exec();

    if (!latestData) {
      console.log("No data found in the database.");
      return res.status(404).send("No data found.");
    }

    console.log("Retrieved latest data:", latestData[coinType]);
    res.json(latestData[coinType]);
  } catch (error) {
    console.error("Error fetching stats:", error.message);
    res.status(500).send("Error fetching stats.");
  }
};

const getDeviation = async (req, res) => {
  console.log("Calculating deviation for coin:", req.query.coin);

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
    console.log("Invalid coin type:", coinType);
    return res.status(400).send("Invalid coin type.");
  }

  try {
    const data = await currency
      .find({}, { [coinType]: 1, _id: 0 })
      .limit(100)
      .exec();

    if (!data.length) {
      console.log("No records found for the coin.");
      return res.status(404).send("No data found.");
    }

    const values = data.map((entry) => entry[coinType].current_price);
    const mean = values.reduce((acc, val) => acc + val, 0) / values.length;

    console.log("Calculated mean price:", mean);

    const stdDev = Math.sqrt(
      values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
        values.length
    );

    console.log("Calculated standard deviation:", stdDev);

    res.json({ mean, standardDeviation: stdDev });
  } catch (error) {
    console.error("Error calculating deviation:", error.message);
    res.status(500).send("Error calculating deviation.");
  }
};

module.exports = {
  fetchCoins,
  getStats,
  getDeviation,
};
