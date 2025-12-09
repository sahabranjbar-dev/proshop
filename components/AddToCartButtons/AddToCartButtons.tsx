"use client";
import { useCartStore } from "@/container/CartProvider/CartProvider";
import { AddToCartContext } from "@/context/AddToCartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useContext } from "react";

const AddToCartButtons = () => {
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const items = useCartStore((state) => state.items);

  const {
    price = 0,
    productId = "",
    title = "",
  } = useContext(AddToCartContext);

  const cartItem = items.find((item) => item.productId === productId);

  if (!cartItem) {
    return (
      <button
        onClick={() => addItem({ price, productId, title })}
        className="w-full border p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow text-center"
      >
        افزودن به سبد خرید
      </button>
    );
  }

  return (
    <div className="flex justify-between items-center border p-3 rounded-lg gap-4 shadow bg-white">
      <button
        onClick={() => addItem({ price, productId, title })}
        className="flex items-center justify-center w-10 h-10 bg-green-50 border border-green-200 rounded-lg text-green-600 hover:bg-green-100 transition-colors"
        aria-label="افزایش تعداد"
      >
        <Plus size={20} />
      </button>

      <div className="flex-1 text-center">
        <span className="text-lg font-semibold text-gray-700">
          {cartItem.quantity}
        </span>
      </div>

      <button
        onClick={() => removeItem(productId)}
        className="flex items-center justify-center w-10 h-10 bg-red-50 border border-red-200 rounded-lg text-red-600 hover:bg-red-100 transition-colors"
        aria-label={cartItem.quantity <= 1 ? "حذف از سبد خرید" : "کاهش تعداد"}
      >
        {cartItem.quantity <= 1 ? <Trash2 size={18} /> : <Minus size={20} />}
      </button>
    </div>
  );
};

export default AddToCartButtons;
