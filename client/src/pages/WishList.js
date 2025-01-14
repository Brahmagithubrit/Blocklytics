import React, { useContext } from "react";
import { MyWishList } from "../Contexts/MyWishListContext";
import "../App2.css";
import { Link } from "react-router-dom";

export default function WishList() {
  const { wishlist } = useContext(MyWishList);
  console.log(" in wishlist " + wishlist.length);

  return (
    <div className="wishlist">
      <h3>Wishlist</h3>
      <ul>
        {wishlist.length > 0 ? (
          wishlist.map((item, index) => (
            <div className="Row">
              <li key={index}>{item}</li>
              <Link to="/">Buy</Link>
            </div>
          ))
        ) : (
          <p>No items in the wishlist</p>
        )}
      </ul>
    </div>
  );
}
