"use client";
import React, { createContext, useState, ReactNode } from "react";

type CartItem = {
  productId: number;
  name: string;
  description: string;
  price: number;
  count: number;
};

type CartContextType = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  tempCart: CartItem[];
  setTempCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

const CartProvider = ({ children }: CartProviderProps) => {
  const [count, setCount] = useState(0);
  const [tempCart, setTempCart] = useState<CartItem[]>([]);

  return (
    <CartContext.Provider value={{ count, setCount, tempCart, setTempCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
