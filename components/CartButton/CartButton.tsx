"use client";
import { useCartStore } from "@/container/CartProvider/CartProvider";
import CartButtonContent from "./CartButtonContent";

const CartButton = () => {
  const items = useCartStore((state) => state.items);

  const cartItemCount = items.length;
  return <CartButtonContent cartItemCount={cartItemCount} />;
};

export default CartButton;
