import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyWishListProvider } from "./Contexts/MyWishListContext";
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
import WishListContainer from "./pages/WishListContainer.js";
import Buy from "./pages/Buy.js";

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <MyWishListProvider>
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
            <Routes>
              <Route path="/" element={<DashBoardCopy />} />
              <Route path="/history" element={<History />} />
              <Route path="/signup" element={<Sign_up />} />
              <Route path="/login" element={<Login />} />
              <Route path="/wallettracker" element={<WalletTracker />} />
              <Route path="/priceprediction" element={<PricePrediction />} />
              <Route path="/transaction" element={<TransactionPage />} />
              <Route path="/newsupdate" element={<NewsUpdate />} />
              <Route path="/wishlist" element={<WishListContainer />} />
              <Route path="/buy" element={<Buy />} />
            </Routes>
          </div>
        </div>
      </Router>
    </MyWishListProvider>
  );
}
