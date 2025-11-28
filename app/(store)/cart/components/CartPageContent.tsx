"use client";
import { useCartStore } from "@/container/CartProvider/CartProvider";
import React from "react";
import CartItemContent from "./CartItemContent";

const CartPageContent = () => {
  const cartItems = useCartStore((state) => state.items);

  return (
    <div>
      {cartItems.map((item, index) => {
        return <CartItemContent key={index} />;
      })}
    </div>
  );
};

export default CartPageContent;
