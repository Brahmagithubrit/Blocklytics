import * as React from "react";
import "../App.css";
import { Fade } from "@mui/material";
import MasterCard from "../components/MasterCard";
import BasicSparkLine from "../components/SparkLine";

export default function DashBoardCopy() {
  const data = [
    { coinname: "bitcoin", image: "/static/assets/bitcoin_img.jpg" },
    { coinname: "ethereum", image: "/static/assets/matic.jpg" },
    { coinname: "matic", image: "/static/assets/matic2.jpg" },
    { coinname: "polkadot", image: "/static/assets/polkadot.jpg" },
    { coinname: "solana", image: "/static/assets/solana.jpg" },
    { coinname: "litecoin", image: "/static/assets/lite.jpg" },
    { coinname: "dogecoin", image: "/static/assets/dig.jpg" },
  ];

  return (
    <div className="main_content">
      {data.map((card, index) => (
        <Fade in={true} timeout={1000 + index * 500} key={index}>
          <div>
            <MasterCard name={card.coinname} image={card.image} />
          </div>
        </Fade>
      ))}      <BasicSparkLine />

    </div>
  );
}
