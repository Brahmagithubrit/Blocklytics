import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import DrawerComp from "./components/Drawer";
import History from "./pages/History";
import DashBoardCopy from "./pages/DashBoardCopy.js";
import Sign_up from "./pages/Sign_up";
import Login from "./pages/Login";
import PricePrediction from "./pages/PricePrediction";
import WalletTracker from "./pages/WalletTracker";
import TransactionPage from "./pages/Transaction";
import NewsUpdate from "./pages/NewsUpdate";


export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Debugging log to monitor drawer state
  useEffect(() => {
    console.log("App component - drawerOpen state:", drawerOpen);
  }, [drawerOpen]);

  const toggleDrawer = (open) => {
    console.log("toggleDrawer function called with open:", open);
    setDrawerOpen(open);
  };

  return (
    <Router>
      <div>
        <Header toggleDrawer={toggleDrawer} />
        <DrawerComp drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
        <div
          style={{
            marginLeft: drawerOpen ? "250px" : "0px",
            transition: "margin-left 0.3s",
          }}
        >
          {/* Main content area */}
          <Routes>
            <Route path="/" element={<DashBoardCopy />} />

            <Route path="/history" element={<History />} />
            <Route path="/sign_up" element={<Sign_up />} />
            <Route path="/login" element={<Login />} />
            <Route path="/wallettracker" element={<WalletTracker />} />
            <Route path="/priceprediction" element={<PricePrediction />} />
            <Route path="/transaction" element={<TransactionPage />} />
            <Route path="/newsupdate" element={<NewsUpdate />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
