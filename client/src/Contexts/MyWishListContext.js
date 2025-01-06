import React, { createContext, useState } from "react";

export const MyWishList = createContext();

export function MyWishListProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const addToWishList = (item) => {
    setWishlist((prev) => {
      if (!prev.includes(item)) {
        return [...prev, item];
      }
      return prev;
    });
  };

  return (
    <MyWishList.Provider value={{ wishlist, addToWishList }}>
      {children}
    </MyWishList.Provider>
  );
}

