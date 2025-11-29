import { CartState, CartStore } from "@/types/cart";
import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist } from "zustand/middleware";
import { getLocal } from "@/utils/localstorage";

export const defaultInitState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

export const initCartStore = (): CartState => {
  const initialData = getLocal<{
    state: { items: any[]; totalItems: number; totalPrice: number };
  }>("cart-storage");

  if (!initialData) return defaultInitState;

  return {
    items: initialData.state.items,
    totalItems: initialData.state.totalItems,
    totalPrice: initialData.state.totalPrice,
  };
};

const storageAdapter = createJSONStorage(() => ({
  getItem: (name: string): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(name);
    }
    return null;
  },
  setItem: (name: string, value: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(name, value);
    }
  },
  removeItem: (name: string): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(name);
    }
  },
}));

export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>()(
    persist(
      (set, get) => ({
        ...initState,

        addItem: (newItem) => {
          set((state) => {
            const existingItem = state.items.find(
              (i) => i.productId === newItem.productId
            );

            const updatedItems = existingItem
              ? state.items.map((i) =>
                  i.productId === newItem.productId
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
                )
              : [...state.items, { ...newItem, quantity: 1 }];

            const totalItems = updatedItems.reduce(
              (sum, i) => sum + i.quantity,
              0
            );
            const totalPrice = updatedItems.reduce(
              (sum, i) => sum + i.quantity * i.price,
              0
            );

            return {
              items: updatedItems,
              totalItems,
              totalPrice,
            };
          });
        },

        removeItem: (productId) => {
          set((state) => {
            const existingItem = state.items.find(
              (i) => i.productId === productId
            );

            if (!existingItem) return state;

            let updatedItems;
            if (existingItem.quantity === 1) {
              updatedItems = state.items.filter(
                (i) => i.productId !== productId
              );
            } else {
              updatedItems = state.items.map((i) =>
                i.productId === productId
                  ? { ...i, quantity: i.quantity - 1 }
                  : i
              );
            }

            const totalItems = updatedItems.reduce(
              (sum, i) => sum + i.quantity,
              0
            );
            const totalPrice = updatedItems.reduce(
              (sum, i) => sum + i.quantity * i.price,
              0
            );

            return {
              items: updatedItems,
              totalItems,
              totalPrice,
            };
          });
        },

        clearCart: () =>
          set({
            items: [],
            totalItems: 0,
            totalPrice: 0,
          }),

        get totalItems() {
          return get().items.reduce((sum, i) => sum + i.quantity, 0);
        },

        get totalPrice() {
          return get().items.reduce((sum, i) => sum + i.quantity * i.price, 0);
        },
      }),
      {
        name: "cart-storage",
        storage: storageAdapter,
      }
    )
  );
};
