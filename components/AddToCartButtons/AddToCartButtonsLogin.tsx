"use client";
import { getCart } from "@/app/(store)/cart/meta/utils";
import { AddToCartContext } from "@/context/AddToCartContext";
import api from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { toast } from "sonner";

const AddToCartButtonsLogin = () => {
  const session = useSession();

  const userId = session.data?.user?.id;

  const {
    price = 0,
    productId = "",
    title = "",
  } = useContext(AddToCartContext);

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["cart", userId],
    queryFn: getCart,
  });

  const { mutateAsync: addItem, isPending: addItemLoading } = useMutation({
    mutationFn: async () => {
      const result = await api.post("/cart/add-to-cart", {
        productId,
      });

      return result.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["cart", userId],
      });
    },
  });
  const { mutateAsync: removeItem, isPending: removeItemLoading } = useMutation(
    {
      mutationFn: async () => {
        const result = await api.post("/cart/remove-from-cart", {
          productId,
        });

        return result.data;
      },
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["cart", userId],
        });
      },
    }
  );

  const cartItem = data?.userCart?.items?.find(
    (item: any) => item.productId === productId
  );
  if (!cartItem) {
    return (
      <button
        onClick={() => {
          addItem();
        }}
        className="w-full border p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow text-center"
      >
        افزودن به سبد خرید
      </button>
    );
  }

  return (
    <div className="flex justify-between items-center border p-3 rounded-lg gap-4 shadow bg-white">
      <button
        className="flex items-center justify-center w-10 h-10 bg-green-50 border border-green-200 rounded-lg text-green-600 hover:bg-green-100 transition-colors"
        aria-label="افزایش تعداد"
        onClick={() => {
          addItem();
        }}
      >
        <Plus size={20} />
      </button>

      <div className="flex-1 text-center">
        <span className="text-lg font-semibold text-gray-700">
          {cartItem.quantity}
        </span>
      </div>

      <button
        className="flex items-center justify-center w-10 h-10 bg-red-50 border border-red-200 rounded-lg text-red-600 hover:bg-red-100 transition-colors"
        aria-label={cartItem.quantity <= 1 ? "حذف از سبد خرید" : "کاهش تعداد"}
        onClick={() => {
          removeItem();
        }}
      >
        {cartItem.quantity <= 1 ? <Trash2 size={18} /> : <Minus size={20} />}
      </button>
    </div>
  );
};

export default AddToCartButtonsLogin;
