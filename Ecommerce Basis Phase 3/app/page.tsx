"use client";

import Navbar from "@/component/Navbar";
import { products } from "./data";
import { useContext, useEffect, useState, useMemo } from "react";
import { CartContext } from "@/utilitis/CardContext";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

type Price = {
  type: number;
  minPrice: number;
  maxPrice: number;
  price: string;
};

const prices: Price[] = [
  { type: 0, minPrice: 0, maxPrice: 100, price: "0-100" },
  { type: 1, minPrice: 100, maxPrice: 200, price: "100-200" },
  { type: 2, minPrice: 200, maxPrice: 300, price: "200-300" },
  { type: 4, minPrice: 300, maxPrice: 100000, price: "300 & above" },
];

export default function Home() {
  const [tempData, setTempData] = useState<Product[]>([]);
  const { tempCart, setTempCart } = useContext(CartContext);
  const [selectedPrice, setSelectedPrice] = useState<Price[]>([]);

  useEffect(() => {
    if (selectedPrice.length === 0) {
      setTempData(products);
    } else {
      setTempData(() => {
        return selectedPrice.flatMap((item) =>
          products.filter(
            (it) => it.price >= item.minPrice && it.price <= item.maxPrice
          )
        );
      });
    }
  }, [selectedPrice]);

  const handleAddtoCart = (item: Product) => {
    let itemIndex = tempCart.findIndex((it) => it.productId === item.id);

    if (itemIndex === -1) {
      setTempCart([
        ...tempCart,
        {
          productId: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          count: 1,
        },
      ]);
    } else {
      const newCart = [...tempCart];
      newCart[itemIndex].count++;
      setTempCart(newCart);
    }
  };

  const filteredData = useMemo(() => {
    if (selectedPrice.length === 0) {
      return products;
    }
    return selectedPrice.flatMap((item) =>
      products.filter(
        (it) => it.price >= item.minPrice && it.price <= item.maxPrice
      )
    );
  }, [selectedPrice]);

  return (
    <div className="home">
      <Navbar />

      <div className="home-sidebar">
        <div className="home-sidebar-heading">Price based filter</div>
        <div className="home-sidebar-prices">
          {prices.map((item) => (
            <label
              className="home-sidebar-prices-item"
              key={item.type}
              htmlFor={item.price}
            >
              <input
                type="checkbox"
                name="price"
                id={item.price}
                onChange={() => {
                  if (selectedPrice.includes(item)) {
                    setSelectedPrice(
                      selectedPrice.filter((prop) => prop.type !== item.type)
                    );
                  } else {
                    setSelectedPrice([...selectedPrice, item]);
                  }
                }}
              />
              {item.price}
            </label>
          ))}
        </div>
      </div>
      <div className="home-data">
        <Link href="/cart">
          <button className="cart-button">Go to Cart ({tempCart.length})</button>
        </Link>

        {filteredData.map((item, ind) => (
          <div className="home-data-item" key={ind}>
            <div className="home-data-item-name">{item.name}</div>
            <div className="home-data-item-description">
              {item.description}
            </div>
            <div className="home-data-item-price">
              Price: <span>Rs. {item.price}</span>
            </div>
            <button
              className="home-data-item-button"
              onClick={() => handleAddtoCart(item)}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
