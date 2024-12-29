import * as React from "react";
import { useState } from "react";
import "../App.css";
import { Fade } from "@mui/material";
import MasterCard from "../components/MasterCard";
import BasicSparkLine from "../components/SparkLine";
import { Data } from "./Data/dataset.js";
import UpperInfo from "../components/UpperInfo.js";
import img from "../assets/star.png";
import wishImg from "../assets/wishStar.png";
import { Link } from "react-router-dom";

export default function DashBoardCopy() {
  const [cardSelect, setCardSelect] = useState(null);
  const [wish, setWish] = useState(false);

  const handleWish = (cardName) => {
    setWish((prev) => ({
      ...prev,
      [cardName]: !prev[cardName], // Toggle the state for the specific card
    }));
  };

  const handleCardShow = (card) => {
    setCardSelect(card);
  };

  // const AddToWishList = () => {};

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
            </Link>{" "}
            <div className="wishBoxContainer">
              {!wish && (
                <img
                  onClick={() => handleWish(cardSelect.coinname)}
                  className="wishBox"
                  src={img}
                  alt="star"
                />
              )}
              {wish && (
                <img
                  onClick={() => handleWish(cardSelect.coinname)}
                  className="wishBox"
                  src={wishImg}
                  alt="star"
                />
              )}
            </div>
          </div>
          {/* <button onClick={() => {AddToWishList()}}>Add To WishList</button> */}
        </div>
      )}
    </div>
  );
}
