"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import CartButtonContent from "./CartButtonContent";
import { getCart } from "@/app/(store)/cart/meta/utils";

const CartButtonLogin = () => {
  const session = useSession();

  const userId = session.data?.user?.id;
  const { data } = useQuery({
    queryKey: ["cart", userId],
    queryFn: getCart,
  });

  const cartItemCount = data?.userCart?.items?.length ?? 0;
  return <CartButtonContent cartItemCount={cartItemCount} />;
};

export default CartButtonLogin;
