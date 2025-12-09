"use client";
import { useSession } from "next-auth/react";
import React from "react";
import AddToCartButtonsLogin from "./AddToCartButtonsLogin";
import AddToCartButtons from "./AddToCartButtons";
import { IAddToCartButtonsContainer } from "@/types/cart";
import { AddToCartContext } from "@/context/AddToCartContext";

const AddToCartButtonsContainer = ({
  price,
  productId,
  title,
}: IAddToCartButtonsContainer) => {
  const session = useSession();

  return (
    <AddToCartContext value={{ price, productId, title }}>
      {session.status === "authenticated" ? (
        <AddToCartButtonsLogin />
      ) : (
        <AddToCartButtons />
      )}
    </AddToCartContext>
  );
};

export default AddToCartButtonsContainer;
