const express = require("express");
const bodyParser = require("body-parser");
const coinRoutes = require("./routes/coins");
const authRoutes = require("./routes/auth");
const connectToDB = require("./config/db");
const { fetchCoins } = require("./controllers/coinController");
const cors = require("cors");
require("dotenv").config();

// for socket
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const port = process.env.PORT || 5000;

const server = http.createServer(app); // why this instead of app.listen
//because express server cannot create actal server it create instance of actual server which cannot suport in socket io
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: "*" ,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const startServer = async () => {
  try {
    await connectToDB();
    console.log("Connected to MongoDB successfully.");

    await fetchCoins();

    app.use(bodyParser.json());
    app.use(
      cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
      })
    );

    app.get("/", (req, res) => {
      res.send("Hi browser, how are you !!!");
    });

    app.use("/coins", coinRoutes);
    app.use("/auth", authRoutes);

    server.listen(port, () =>
      console.log(`App + socket io running  on port ${port}`)
    );

    // here websocket logic for notification
    io.on("connection", (socket) => {
      console.log("socket connected :", socket.id);
      socket.emit("welcome", { message: "Welcome To crypto notify!" });

      socket.emit("notification", { message: "New coin prices available !" });

      socket.on("disconnect", () => {
        console.log("socket disconnected ", socket.id);
      });
    });

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
