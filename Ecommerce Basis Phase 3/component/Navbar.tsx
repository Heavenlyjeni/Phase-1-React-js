import React, { useContext } from "react";
import { CartContext } from "@/utilitis/CardContext";
import Link from "next/link";

const Navbar = () => {
  const { tempCart } = useContext(CartContext);

  if (!tempCart) {
    return null; // Ensure tempCart is defined
  }

  return (
    <div className="navbar">
      <div className="navbar-name">Ecommerce Basics</div>
      <div className="navbar-links">
        <Link href="/">
          <div className="navbar-links-item">Home</div>
        </Link>
        <Link href="/cart">
          <div className="navbar-links-item">Cart: {tempCart.length}</div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
