import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import axios from "axios";

export default function MasterCard({ name, image, triggerRefresh }) {
  const [coinname, setCoinname] = useState("");
  const [value, setValue] = useState("");
  const [price, setPrice] = useState(0);
  const [twentyfourhourChange, setTwentyfourhourChange] = useState("");
  const [error, setError] = useState(false);

  async function getStat() {
    try {
      const response = await axios.get(
        `http://localhost:5000/coins/stats?coin=${name}`
      );
      setCoinname(name[0].toUpperCase() + name.slice(1));
      setValue(response.data.current_price);
      setPrice(response.data.market_cap);
      setTwentyfourhourChange(response.data.price_change_percentage_24h);
      setError(false);
    } catch (err) {
      setError(true);
      console.error("Error fetching coin stats", err);
    }
  }

  useEffect(() => {
    getStat();
  }, [name, triggerRefresh]);

  return (
    <Card
      className="bg-white dark:bg-black dark:text-white flex flex-col items-center justify-start"
      sx={{
        width: 340  ,
        height: 400, 
        boxShadow: "none",
        border : "none",
        m: 0,
        p: 0,
      }}
    >
      <CardActionArea className="flex flex-col items-center p-2 h-full">
        <CardMedia
          component="img"
          image={image}
          alt={`${name} image`}
          sx={{
            width: "100%",
            height: 140, 
            objectFit: "contain",
            mb: 1,
          }}
        />
        <CardContent
          className="flex flex-col items-center justify-between"
          sx={{ flexGrow: 1 }}
        >
          <Typography
            variant="h5"
            component="div"
            className="font-mono text-2xl font-bold text-center"
            sx={{ minHeight: 40 }} // reserve space to align all cards
          >
            {coinname || (error ? "Error loading" : "Loading...")}
          </Typography>
          <Typography
            variant="body2"
            className="font-mono text-lg text-center"
            sx={{ minHeight: 80 }} // reserve space for text content
          >
            {error ? (
              "Failed to load data"
            ) : (
              <>
                Value: ${value || "Loading..."} <br />
                Market Cap: ${price || "Loading..."} <br />
                24-Hour Change: {twentyfourhourChange || "Loading..."}%
              </>
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
