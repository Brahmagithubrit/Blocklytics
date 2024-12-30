import React, { useContext } from "react";
import { MyWishList } from "../Contexts/MyWishListContext";

export default function WishList() {
  const { wishlist } = useContext(MyWishList);

  return (
    <div className="wishlist">
      <h3>Wishlist</h3>
      <ul>
        {wishlist.length > 0 ? (
          wishlist.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <p>No items in the wishlist</p>
        )}
      </ul>
    </div>
  );
}
