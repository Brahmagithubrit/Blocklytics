import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';


export default function WishList({ coinname }) {
          const location = useLocation();
          const coin = location.state;
  return (
    <>
    <p>{coin.coinname}</p>
      {/* <MasterCard name={cardSelect.coinname} image={cardSelect.image} /> */}
    </>
  );
}
