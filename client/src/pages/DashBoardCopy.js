import React, { useState, useContext } from "react";
import "../App2.css";
import { Fade, Alert, Snackbar } from "@mui/material";
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
import Button from "@mui/material/Button";

export default function DashBoardCopy() {
  const [cardSelect, setCardSelect] = useRecoilState(cardSelectRecoil);
  const [wish, setWish] = useRecoilState(wishRecoil);
  const { addToWishList } = useContext(MyWishList);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleWish = (cardName) => {
    setWish((prev) => ({
      ...prev,
      [cardName]: !prev[cardName],
    }));
    if (!wish[cardName]) {
      addToWishList(cardName);
      setSnackbarMessage("Added to wishlist successfully!");
    } else {
      setSnackbarMessage("Removed from wishlist successfully!");
    }
    setSnackbarOpen(true);
  };

  const handleCardShow = (card) => {
    setCardSelect(card);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  return (
    <div className="h-full w-full flex justify-center items-center text-center">
      {!cardSelect && (
        <div className="flex flex-col">
          <div className="pl-[20px] pr-[20px] h-[50px]">
            <marquee>
              <div className="w-full h-[50px] flex gap-[15px] text-center mt-3">
                {Data.map((card, index) => (
                  <UpperInfo name={card.coinname} key={index} />
                ))}
              </div>
            </marquee>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Data.map((card, index) => (
              <Fade in={true} timeout={1000 + index * 500} key={index}>
                <div
                  className="flex flex-col items-center justify-center w-36 h-88 m-[10px] bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all"
                  onClick={() => handleCardShow(card)}
                >
                  <MasterCard name={card.coinname} image={card.image} />
                </div>
              </Fade>
            ))}
          </div>

          <div className="flex flex-col font-serif font-light text-gray-500 text-shadow-sm tracking-wide">
            <h3>CryptoAnalytics</h3> CryptoAnalytics provides a fundamental
            analysis of the crypto market. In addition to tracking price, volume
            and market capitalisation, CoinGecko tracks community growth,
            open-source code development, major events and on-chain metrics.
          </div>
          <Footer />
        </div>
      )}

      {cardSelect && (
        <div className="h-[400px] w-[280px] flex justify-center items-center text-center flex-col">
          <MasterCard name={cardSelect.coinname} image={cardSelect.image} />
          <div className="flex flex-row justify-center items-center mt-10 gap-2">
            <button
              onClick={() => setCardSelect(null)}
              className="w-[50px] h-[40px] no-underline mx-3 text-2xl border-none text-black mt-2"
            >
              Back
            </button>
            <Link
              className="w-[50px] h-[50px] no-underline mx-3 text-2xl flex items-center  mt-2 justify-center border-none text-black"
              to="/buy"
              state={cardSelegict}
            >
              Buy
            </Link>
            <div
              title="Add to WishList"
              className="flex items-center justify-center"
            >
              <img
                title={
                  wish[cardSelect.coinname]
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                onClick={() => handleWish(cardSelect.coinname)}
                className="w-[25px] h-[25px] cursor-pointer"
                src={wish[cardSelect.coinname] ? wishImg : img}
                alt="star"
              />
            </div>
          </div>

          <Snackbar
            style={{ marginBottom: "30px" }}
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
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
      )}
    </div>
  );
}
