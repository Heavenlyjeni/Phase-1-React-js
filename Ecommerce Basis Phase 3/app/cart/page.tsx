"use client";

import Navbar from "@/component/Navbar";
import { CartContext } from "@/utilitis/CardContext";
import React, { useContext } from "react";

const CartPage = () => {
  const { tempCart, setTempCart } = useContext(CartContext);

  const handleRemoveItem = (productId) => {
    const newCart = tempCart.filter((item) => item.productId !== productId);
    setTempCart(newCart);
  };

  const handleIncreaseCount = (productId) => {
    const newCart = tempCart.map((item) =>
      item.productId === productId
        ? { ...item, count: item.count + 1 }
        : item
    );
    setTempCart(newCart);
  };

  const handleDecreaseCount = (productId) => {
    const newCart = tempCart.map((item) =>
      item.productId === productId && item.count > 1
        ? { ...item, count: item.count - 1 }
        : item
    );
    setTempCart(newCart);
  };

  return (
    <div className="cart">
      <Navbar />
      {tempCart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        tempCart.map((item) => {
          return (
            <div className="cart-item" key={item.productId}>
              <div className="home-data-item-name">{item.name}</div>
              <div className="home-data-item-description">{item.description}</div>
              <div className="home-data-item-count">
                Count:
                <button
                  onClick={() => handleDecreaseCount(item.productId)}
                  className="count-btn"
                >
                  -
                </button>
                <span>{item.count}</span>
                <button
                  onClick={() => handleIncreaseCount(item.productId)}
                  className="count-btn"
                >
                  +
                </button>
              </div>
              <div className="home-data-item-price">
                Price: Rs. {item.price * item.count}
              </div>
              <button
                className="remove-item-btn"
                onClick={() => handleRemoveItem(item.productId)}
              >
                Remove
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CartPage;