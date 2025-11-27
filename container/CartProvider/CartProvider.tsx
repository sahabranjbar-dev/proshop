"use client";
import { createCartStore, initCartStore } from "@/store/useCart/useCart";
import { CartStore } from "@/types/cart";
import { createContext, useContext, useMemo } from "react";
import { useStore } from "zustand";
import { CartStoreApi, ICartProvider } from "./meta/types";

export const CartStoreContext = createContext<CartStoreApi | undefined>(
  undefined
);

export const CartProvider = ({ children }: ICartProvider) => {
  const store = useMemo(() => {
    return createCartStore(initCartStore());
  }, []);

  return (
    <CartStoreContext.Provider value={store}>
      {children}
    </CartStoreContext.Provider>
  );
};

export const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
  const cartStoreContext = useContext(CartStoreContext);

  if (!cartStoreContext) {
    throw new Error(`useCartStore must be used within CartStoreProvider`);
  }

  return useStore(cartStoreContext, selector);
};
