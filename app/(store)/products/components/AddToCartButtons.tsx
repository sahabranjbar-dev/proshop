"use client";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/container/CartProvider/CartProvider";
import { IAddToCartButtons } from "../meta/types";

const AddToCartButtons = ({ price, productId, title }: IAddToCartButtons) => {
  const { addItem } = useCartStore((state) => state);
  return (
    <div>
      <Button
        onClick={() => {
          addItem({
            price,
            productId,
            title,
          });
        }}
      >
        add to cart
      </Button>
    </div>
  );
};

export default AddToCartButtons;
