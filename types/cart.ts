export interface ICartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

export type CartState = {
  items: ICartItem[];
  totalItems: number;
  totalPrice: number;
};

export type CartActions = {
  addItem: (item: Omit<ICartItem, "quantity">) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

export type CartStore = CartState & CartActions;
