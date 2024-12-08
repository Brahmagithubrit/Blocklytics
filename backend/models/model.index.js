const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema({
  bitcoin: {
    current_price: { type: Number, required: true },
    market_cap: { type: Number, required: true },
    price_change_percentage_24h: { type: Number, required: true },
  },
  ethereum: {
    current_price: { type: Number, required: true },
    market_cap: { type: Number, required: true },
    price_change_percentage_24h: { type: Number, required: true },
  },
  matic: {
    current_price: { type: Number, required: true },
    market_cap: { type: Number, required: true },
    price_change_percentage_24h: { type: Number, required: true },
  },
  solana: {
    current_price: { type: Number, required: true },
    market_cap: { type: Number, required: true },
    price_change_percentage_24h: { type: Number, required: true },
  },
  litecoin: {
    current_price: { type: Number, required: true },
    market_cap: { type: Number, required: true },
    price_change_percentage_24h: { type: Number, required: true },
  },
  polkadot: {
    current_price: { type: Number, required: true },
    market_cap: { type: Number, required: true },
    price_change_percentage_24h: { type: Number, required: true },
  },
  dogecoin: {
    current_price: { type: Number, required: true },
    market_cap: { type: Number, required: true },
    price_change_percentage_24h: { type: Number, required: true },
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// creating user model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const currency = mongoose.model("currency", currencySchema);

const User = mongoose.model("User", userSchema);

module.exports = { currency, User };
