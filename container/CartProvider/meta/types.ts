import { createCartStore } from "@/store/useCart/useCart";
import { type ReactNode } from "react";

export interface ICartProvider {
  children: ReactNode;
}

export type CartStoreApi = ReturnType<typeof createCartStore>;
