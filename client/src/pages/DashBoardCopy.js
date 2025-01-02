import React, { useState, useContext } from "react";
import "../App.css";
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
    <div className="dashBoard">
      {!cardSelect && (
        <div className="parentContent">
          <div className="marqueeParent">
            <marquee>
              <div className="uppermarquee">
                {Data.map((card, index) => (
                  <UpperInfo name={card.coinname} key={index} />
                ))}
              </div>
            </marquee>
          </div>
          <div className="main_content">
            {Data.map((card, index) => (
              <Fade in={true} timeout={1000 + index * 500} key={index}>
                <div
                  className="cardContainer"
                  onClick={() => handleCardShow(card)}
                >
                  <MasterCard name={card.coinname} image={card.image} />
                </div>
              </Fade>
            ))}
          </div>
          <Footer />
        </div>
      )}

      {cardSelect && (
        <div className="cardSelect">
          <MasterCard name={cardSelect.coinname} image={cardSelect.image} />
          <div className="Row">
            <button onClick={() => setCardSelect(null)} className="btnStyle">
              Back
            </button>
            <Link className="btnStyle" to="/buy" state={cardSelect}>
              Buy
            </Link>
            <div title="Add to WishList" className="wishBoxContainer">
              <img
                title={
                  wish[cardSelect.coinname]
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                onClick={() => handleWish(cardSelect.coinname)}
                className="wishBox"
                src={wish[cardSelect.coinname] ? wishImg : img}
                alt="star"
              />
            </div>
          </div>
          <Snackbar
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
