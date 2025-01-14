const express = require("express");
const bodyParser = require("body-parser");
const coinRoutes = require("./routes/coins");
const authRoutes = require("./routes/auth")
const connectToDB = require("./config/db");
const { fetchCoins } = require("./controllers/coinController");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectToDB();
    console.log("Connected to MongoDB successfully.");

    await fetchCoins();

    app.use(bodyParser.json());
    app.use(
      cors({
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
        credentials: true,
      })
    );

    app.get("/", (req, res) => {
      res.send("Hi browser, how are you !!!");
    });

    app.use("/coins", coinRoutes);
    app.use("/auth", authRoutes);

    app.listen(port, () => console.log(`App listening on port ${port}`));

    setInterval(async () => {
      try {
        // await fetchCoins();
      } catch (error) {
        console.error("Error during periodic coin data fetch:", error.message);
      }
    }, 7200000);
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
