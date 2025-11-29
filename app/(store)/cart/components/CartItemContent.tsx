"use client";
import Image from "next/image";
import React from "react";
import AddToCartButtonsContainer from "../../products/components/AddToCartButtonsContainer";

interface Props {
  title: string;
  description?: string;
  id?: string;
  price: number;
}

const CartItemContent = ({ description, title, price, id }: Props) => {
  return (
    <div className="border p-4 rounded-2xl shadow m-2">
      <div className="flex justify-start items-start">
        <Image
          alt="pr"
          src={"/images/placeholder.png"}
          width={100}
          height={100}
        />

        <div className="flex-1">
          <h3>{title}</h3>
          {!!description && <p>{description}</p>}
          <p>{price}</p>
        </div>

        <div>
          <AddToCartButtonsContainer
            productId={id ?? ""}
            price={price}
            title={title}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItemContent;
