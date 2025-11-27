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
  if (!initialData)
    return {
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };
  return {
    items: initialData.state.items,
    totalItems: initialData.state.totalItems,
    totalPrice: initialData.state.totalPrice,
  };
};

const storageAdapter = createJSONStorage(() => ({
  getItem: (name: string): string | null => {
    // فقط در سمت کلاینت اجازه دسترسی به localStorage را می‌دهیم
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
// 💡 استفاده از persist در اطراف منطق store
export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>()(
    persist(
      // <--- اینجا از persist استفاده می‌کنیم
      (set, get) => ({
        ...initState,

        addItem: (newItem) => {
          set((state) => {
            const exist = state.items.find(
              (i) => i.productId === newItem.productId
            );

            let updatedItems;

            if (exist) {
              // محصول وجود دارد → فقط quantity را افزایش بده
              updatedItems = state.items.map((i) =>
                i.productId === newItem.productId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              );
            } else {
              // محصول جدید
              updatedItems = [...state.items, { ...newItem, quantity: 1 }];
            }

            // 💡 به روزرسانی totalItems و totalPrice لازم نیست، زیرا
            // اینها با استفاده از geterها به صورت خودکار محاسبه می‌شوند.
            return { items: updatedItems };
          });
        },

        removeItem: (productId) => {
          set((state) => ({
            items: state.items.filter((i) => i.productId !== productId),
          }));
        },

        updateQuantity: (productId, quantity) => {
          if (quantity <= 0) return;

          set((state) => ({
            items: state.items.map((i) =>
              i.productId === productId ? { ...i, quantity } : i
            ),
          }));
        },

        clearCart: () => set({ items: [] }),

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
