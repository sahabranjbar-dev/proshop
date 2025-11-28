"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";
import CartItemContent from "./CartItemContent";
import api from "@/lib/axios";
import { ICart } from "@/types/common";
import { ShoppingCart, Loader2 } from "lucide-react"; // آیکون‌های پیشنهادی
import { getCart } from "../meta/utils";

const CartPageContentLogin = () => {
  const session = useSession();
  const userId = session.data?.user?.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart", userId],
    queryFn: getCart,
    enabled: !!userId, // فقط در صورتی کوئری بگیر که userId موجود باشد
  });

  if (isLoading) {
    return (
      <div className="container mx-auto mt-20 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <p className="mr-2 text-lg">در حال بارگذاری سبد خرید...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto mt-10 p-5 text-red-600 border border-red-300 rounded-lg bg-red-50">
        <p>متأسفانه خطایی در دریافت سبد خرید رخ داده است.</p>
      </div>
    );
  }

  const cartItems = data?.userCart?.items || [];
  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold flex items-center text-gray-800 border-b pb-2">
          <ShoppingCart className="w-6 h-6 ml-2 text-blue-600" />
          سبد خرید شما
        </h2>
      </div>

      {isCartEmpty ? (
        <div className="mt-10 p-10 text-center border-2 border-dashed border-gray-300 rounded-lg bg-white shadow-sm">
          <p className="text-xl text-gray-600">سبد خرید شما خالی است.</p>
          <p className="text-md text-gray-500 mt-2">
            محصولات مورد علاقه خود را اضافه کنید!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* ستون اصلی: آیتم‌های سبد خرید */}
          <div className="lg:col-span-3 bg-white p-4 rounded-lg shadow-md divide-y divide-gray-200">
            {cartItems.map((item: any) => (
              // باید آیتم را به CartItemContent پاس دهید
              <CartItemContent
                key={item.id}
                title={item.product.title}
                description={item.product.description}
                id={item.product.id}
                price={item.product.price}
              />
            ))}
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
                  {data?.userCart?.totalPrice}
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

              <button className="w-full mt-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300">
                تأیید و تکمیل سفارش
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPageContentLogin;
