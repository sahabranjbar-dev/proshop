"use client";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const CartButtonLogin = () => {
  const session = useSession();

  const userId = session.data?.user?.id;
  const { data: userCart } = useQuery<any[]>({
    queryKey: ["cart", userId],
  });

  const cartItemCount = userCart?.length;
  return (
    <Link
      href="/cart"
      className="text-gray-600 hover:text-indigo-600 relative p-2 rounded-full hover:bg-gray-100 transition duration-150"
    >
      <ShoppingCart size={20} />
      {/* نشان تعداد آیتم‌ها */}
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {cartItemCount}
      </span>
    </Link>
  );
};

export default CartButtonLogin;
