"use client";
import { useCartStore } from "@/container/CartProvider/CartProvider";
import React, { useState } from "react";
import CartItemContent from "./CartItemContent";
import { Loader2, ShoppingCart } from "lucide-react";
import { Modal } from "@/components/Modal/Modal";
import LoginForm from "@/app/auth/components/LoginForm";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EmptyCart from "./EmptyCart";

const CartPageContent = () => {
  const { push } = useRouter();
  const session = useSession();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const { mutateAsync, isPending, data } = useMutation({
    mutationFn: async () => {
      const result = await api.post("/cart/merge", {
        cartItems: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      });

      console.log({ result });
      return result.data;
    },
    onSuccess(data) {
      console.log({ data });
      clearCart();
    },
  });

  const cartItems = items?.length ? items : data?.userCart?.items;
  const isCartEmpty = !cartItems?.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <h2 className="text-3xl font-extrabold flex items-center text-gray-800 border-b pb-2">
          <ShoppingCart className="w-6 h-6 ml-2 text-blue-600" />
          سبد خرید شما
        </h2>
      </div>

      {isCartEmpty ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 bg-white p-4 rounded-lg shadow-md divide-y divide-gray-200">
            {isPending ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              cartItems?.map((item: any, index: number) => (
                <CartItemContent
                  key={index}
                  title={item.title || item?.product?.title}
                  price={item.price || item?.product?.price}
                  id={item.productId || item?.product?.id}
                />
              ))
            )}
          </div>

          {/* ستون فرعی: خلاصه قیمت (Summary) */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white p-5 rounded-lg shadow-xl border border-gray-100">
              <h3 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">
                خلاصه فاکتور
              </h3>

              <div className="flex justify-between text-lg mb-2">
                <span>جمع کل خرید:</span>
                <span className="font-semibold">
                  {totalPrice || data?.userCart?.totalPrice}
                </span>{" "}
                {/* جایگزین با متغیر قیمت */}
              </div>

              <div className="flex justify-between text-lg mb-4 text-green-600">
                <span>تخفیف:</span>
                <span className="font-semibold">0 تومان</span>
              </div>

              <div className="flex justify-between text-2xl font-extrabold pt-3 border-t-2 border-dashed border-gray-300">
                <span>قابل پرداخت:</span>
                <span className="text-blue-600">cart price</span>{" "}
                {/* جایگزین با متغیر قیمت نهایی */}
              </div>

              <button
                onClick={() => {
                  if (session.status === "authenticated") {
                    push("/shipping");
                    return;
                  }
                  toast.info("لطفاْ ابتدا وارد حساب کاربری شوید");
                  setOpenModal(true);
                }}
                className="text-center w-full mt-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
              >
                تأیید و تکمیل سفارش
              </button>
              <Modal
                title="ورود به حساب کاربری"
                onClose={() => setOpenModal(false)}
                open={openModal}
                hideActions
              >
                <LoginForm
                  onLoginSuccess={(data) => {
                    if (!data?.ok) return;
                    setOpenModal(false);
                    mutateAsync();
                  }}
                />
              </Modal>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPageContent;
