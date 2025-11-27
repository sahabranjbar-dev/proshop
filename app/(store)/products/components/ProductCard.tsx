import React from "react";
import AddToCartButtons from "./AddToCartButtons";

interface Props {
  productId: string;
  productTitle: string;
  productPrice: number;
}

const ProductCard = ({ productId, productPrice, productTitle }: Props) => {
  return (
    <div className="border p-2">
      <div>{productId}</div>
      <div>{productTitle}</div>
      <div>{productPrice}</div>
      <AddToCartButtons
        price={productPrice}
        productId={productId}
        title={productTitle}
      />
    </div>
  );
};

export default ProductCard;
