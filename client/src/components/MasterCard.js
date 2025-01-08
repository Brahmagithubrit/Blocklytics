import * as React from "react";
import { useState, useEffect } from "react";
import "../App2.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import axios from "axios";

export default function MasterCard({ name, image }) {
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
    <Card sx={{ maxWidth: 345, boxShadow: 5 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={`${name} image`}
        />
        <CardContent>
          <Typography
            className="mb-[16px] font-mono text-2xl font-bold p-[2px]"
            gutterBottom
            variant="h5"
            component="div"
          >
            {coinname || (error ? "Error loading" : "Loading...")}
          </Typography>
          <Typography
            className="mb-[16px] font-mono text-2xl font-bold p-[2px]"
            variant="body2"
            sx={{ color: "text.secondary" }}
          >
            {error ? (
              "Failed to load data"
            ) : (
              <>
                Value: $ {value || "Loading..."} <br />
                Price: $ {price || "Loading..."} <br />
                24-Hour Change: {twentyfourhourChange || "Loading..."}%
              </>
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
