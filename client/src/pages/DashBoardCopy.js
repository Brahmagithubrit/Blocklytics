import React, { useState, useContext, useEffect, useRef } from "react";
import "../App2.css";
import { Fade, Alert, Snackbar, Button } from "@mui/material";
import MasterCard from "../components/MasterCard";
import { Data } from "./Data/dataset.js";
import UpperInfo from "../components/UpperInfo.js";
import img from "../assets/star.png";
import wishImg from "../assets/wishStar.png";
import { Link } from "react-router-dom";
import { MyWishList } from "../Contexts/MyWishListContext";
import { useRecoilState } from "recoil";
import { cardSelectRecoil, wishRecoil } from "../Recoiler/Recoiler.jsx";
import Footer from "../components/Footer.js";
import Timer from "./Timer.js";
import { io } from "socket.io-client";
import axios  from "axios";

export default function DashBoardCopy() {
  const [cardSelect, setCardSelect] = useRecoilState(cardSelectRecoil);
  const [wish, setWish] = useRecoilState(wishRecoil);
  const { addToWishList } = useContext(MyWishList);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [targetPrice, setTargetPrice] = useState(-1);
  const [trigger, setTrigger] = useState(false);
  const [notification, setNotification] = useState([]);
  const notificationRef = useRef(null);
  const marqueeRef = useRef(null);

  const handleWish = (cardName) => {
    setWish((prev) => ({ ...prev, [cardName]: !prev[cardName] }));
    if (!wish[cardName]) addToWishList(cardName);
    setSnackbarMessage(
      !wish[cardName]
        ? "Added to wishlist successfully!"
        : "Removed from wishlist successfully!"
    );
    setSnackbarOpen(true);
  };

  function handleCardShow(card) {
    console.log("Card clicked");
    setCardSelect(card);
  }
  // const handleCardShow = (card) => { console.log("card clicked");   setCardSelect(card);}

  const handleSnackbarClose = (e, reason) =>
    reason === "clickaway" || setSnackbarOpen(false);

  const handleTargetPrice = (card) => {
    if (targetPrice === -1) {
      setSnackbarMessage("You are not selecting Value");
      setSnackbarOpen(true);
      return;
    }
    setSnackbarMessage(`${card} price value set to $${targetPrice}`);
    setSnackbarOpen(true);
    axios.post(`http://localhost:5000/coins/storeTarget`, {
      targetCoinName: cardSelect.coinname,
      targetPrice,
    });
  };

  const triggerRefresh = () => setTrigger((prev) => !prev);

  useEffect(() => {
    // const socket = io("http://localhost:5000");
    // socket.on("welcome", (data) => {
    //   setNotification((prev) => [
    //     ...prev,
    //     { message: data.message, timeStamp: Date.now() },
    //   ]);
    // });
    // return () => socket.off("welcome");
  }, []);

  return (
    <div className="bg-white dark:bg-black dark:text-white min-h-screen w-full px-4 md:px-10 py-5 flex flex-col items-center">
      {!cardSelect ? (
        <>
          <div className="flex flex-col w-full mb-6">
            {/* <div className="flex justify-between items-center mb-3">
              <div ref={notificationRef} className="flex gap-2 overflow-x-auto">
                {notification.map((note, index) => (
                  <div key={index} className="notification_box">
                    {note.message}
                  </div>
                ))}
              </div>
            </div> */}
            <div style={{ display: "flex", flexDirection: "row" }}>
              <marquee ref={marqueeRef} className="w-full overflow-hidden">
                <div className="flex gap-4">
                  {Data.map((card, idx) => (
                    <UpperInfo name={card.coinname} key={idx} />
                  ))}
                </div>
              </marquee>
              <Timer triggerRefresh={triggerRefresh} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full justify-center">
            {Data.map((card, index) => (
              <Fade
                onClick={() => handleCardShow(card)}
                in={true}
                timeout={1000 + index * 200}
                key={index}
              >
                <div className="flex justify-center">
                  <MasterCard
                    name={card.coinname}
                    image={card.image}
                    triggerRefresh={triggerRefresh}
                  />
                </div>
              </Fade>
            ))}
          </div>{" "}
        </>
      ) : (
        <div className="flex flex-col items-center w-full max-w-md">
          <MasterCard name={cardSelect.coinname} image={cardSelect.image} />

          <div className="flex gap-3 mt-5">
            <button
              onClick={() => setCardSelect(null)}
              className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded"
            >
              Back
            </button>
            <Link
              to="/buy"
              state={cardSelect}
              className="px-3 py-2 bg-blue-500 text-white rounded"
            >
              Buy
            </Link>
            <img
              onClick={() => handleWish(cardSelect.coinname)}
              className="w-6 h-6 cursor-pointer"
              src={wish[cardSelect.coinname] ? wishImg : img}
              alt="star"
              title={
                wish[cardSelect.coinname]
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
            />
          </div>

          <div className="mt-5 w-full flex flex-col gap-2">
            <label className="font-medium">Set target price to buy</label>
            {/* <p> price : {targetPrice}</p> */} 
            <div className="flex gap-2">
              <div className="flex border-2 border-gray-500 rounded w-full items-center px-2">
                <span>$</span>

                <input
                  // value={targetPrice}
                  type="number"
                  placeholder="Set Price"
                  className="w-full border-none outline-none px-2 py-1 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-black dark:placeholder-white"
                  onChange={(e) => {
                    console.log("value changed :" + e.target.value);
                    setTargetPrice(e.target.value);
                  }}
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleTargetPrice(cardSelect.coinname)}
              >
                Set
              </Button>
            </div>
            <span className="text-sm text-gray-500">
              We will notify you when the price reaches this value
            </span>
          </div>
        </div>
      )}

      {/* <Footer /> */}

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
