const express = require("express");
const bodyParser = require("body-parser");
const coinRoutes = require("./routes/coins");
const connectToDB = require("./config/db");
const { fetchCoins } = require("./controllers/coinController");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await connectToDB();
    console.log("Connected to MongoDB successfully.");

    console.log("Fetching initial coin data...");
    await fetchCoins(); // Ensure initial data fetch is completed before starting the server

    app.use(bodyParser.json());
    app.use(cors());


    app.get("/", (req, res) => {
      res.send("Hi browser, how are you !!!");
    });

    app.use("/coins", coinRoutes);

    app.listen(port, () => console.log(`App listening on port ${port}`));

    console.log("Scheduling periodic coin data fetch...");
    setInterval(async () => {
      try {
        console.log("Periodic coin data fetch started...");
        await fetchCoins();
        console.log("Periodic coin data fetch completed.");
      } catch (error) {
        console.error("Error during periodic coin data fetch:", error.message);
      }
    }, 7200000); // Every 2 hours
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1); // Exit with error
  }
};

startServer();
