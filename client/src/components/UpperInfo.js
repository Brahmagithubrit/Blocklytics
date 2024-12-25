import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import axios from "axios";
import "../App.css";

import * as reactValue from "react";

export default function UpperInfo({ name }) {
  const [coinname, setCoinname] = useState("");
  const [value, setValue] = useState("");
  const [price, setPrice] = useState(0);
  const [twentyfourhourChange, setTwentyfourhourChange] = useState("");
  const [error, setError] = useState(false);

  async function getStat() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/coins/stats?coin=${name}`
      );
      setCoinname(name[0].toUpperCase() + name.substring(1, name.length));
      setValue(response.data.current_price);
      setPrice(response.data.market_cap);
      setTwentyfourhourChange(response.data.price_change_percentage_24h);
    } catch (err) {
      setError(true);
      console.error("Error fetching coin stats", err);
    }
  }

  useEffect(() => {
    getStat();
  }, [name]);
  return (
    <>
      <div className="list">
        {" "}
        <p>
          {" "}
          {name} :${value || "Loading..."} <br />
        </p>
      </div>
    </>
  );
}
