import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Buy() {
  const location = useLocation();
  const coin = location.state;

  return (
    <div className="Buy">
      <div className="image">
        <img height="250px" width="230px" src={coin.image}></img>
      </div>
      <div className="desc">
        {" "}
        <p>{coin.coinname}</p>
        <p>Price : $ 1 million </p>
        <p>xyz fhd dhd dk kdhd dkd </p>     
        <button>Buy</button>
        {/* hardcoded for now */}
      </div>
    </div>
  );
}
