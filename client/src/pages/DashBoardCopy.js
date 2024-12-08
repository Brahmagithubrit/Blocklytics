import * as React from "react";
import "../App.css";
import { Fade } from "@mui/material";
import MasterCard from "../components/MasterCard";
import BasicSparkLine from "../components/SparkLine";
import { Data } from "./Data/dataset.js";
export default function DashBoardCopy() {
  return (
    <div className="parentContent">
      <div className="main_content">
        {Data.map((card, index) => (
          <Fade in={true} timeout={1000 + index * 500} key={index}>
            <div>
              <MasterCard name={card.coinname} image={card.image} />
            </div>
          </Fade>
        ))}{" "}
        <BasicSparkLine />
      </div>
    </div>
  );
}
