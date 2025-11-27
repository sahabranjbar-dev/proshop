"use client";
import React from "react";
import CartButton from "./CartButton";
import { useSession } from "next-auth/react";
import CartButtonLogin from "./CartButtonLogin";

const CartButtonContainer = () => {
  const session = useSession();
  const authenticated = session.status === "authenticated";
  return authenticated ? <CartButtonLogin /> : <CartButton />;
};

export default CartButtonContainer;
