import Chart from "chart.js/auto"; // Import the auto registration
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";
import LineChart from "../components/LineChart";

export default function Charts() {
  const [bitcoin, setBitcoin] = useState([]);
  const [eth, setEth] = useState([]);
  const [matic, setMatic] = useState([]);
  const [solana, setSolana] = useState([]);
  const [litecoin, setLitecoin] = useState([]);
  const [polkadot, setPolkadot] = useState([]);
  const [dogecoin, setDogecoin] = useState([]);

  Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/coins/history");
        const data = res.data; // this is the object/array returned from backend

        // Debugging: Print the response data
        console.log("Backend data:", data);

        const bitcoinPrices =
          data.find((coin) => coin.name === "bitcoin")?.prices || [];
        const ethereumPrices =
          data.find((coin) => coin.name === "ethereum")?.prices || [];
        const maticPrices =
          data.find((coin) => coin.name === "matic")?.prices || [];
        const solanaPrices =
          data.find((coin) => coin.name === "solana")?.prices || [];
        const litecoinPrices =
          data.find((coin) => coin.name === "litecoin")?.prices || [];
        const polkadotPrices =
          data.find((coin) => coin.name === "polkadot")?.prices || [];
        const dogecoinPrices =
          data.find((coin) => coin.name === "dogecoin")?.prices || [];

        // Debugging: Check if data for Bitcoin and others is correct
        console.log("Bitcoin Prices:", bitcoinPrices);
        console.log("Ethereum Prices:", ethereumPrices);
        console.log("Matic Prices:", maticPrices);

        console.log(`bitcoin : ${bitcoinPrices}`)
        console.log(`ethereum : ${ethereumPrices}`);

        setBitcoin(bitcoinPrices);
        setEth(ethereumPrices);
        setMatic(maticPrices);
        setSolana(solanaPrices);
        setLitecoin(litecoinPrices);
        setPolkadot(polkadotPrices);
        setDogecoin(dogecoinPrices);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 m-4">
      <LineChart chartData={bitcoin} label="Bitcoin" />
      <LineChart chartData={eth} label="Ethereum" />
      <LineChart chartData={matic} label="Matic" />
      <LineChart chartData={solana} label="Solana" />
      <LineChart chartData={litecoin} label="Litecoin" />
      <LineChart chartData={polkadot} label="Polkadot" />
      <LineChart chartData={dogecoin} label="Dogecoin" />
    </div>
  );
}
