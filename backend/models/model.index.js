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

const currency = mongoose.model("currency", currencySchema);

module.exports = currency;
