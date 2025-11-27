"use client";
import dynamic from "next/dynamic";

const AddToCartButtonsContainer = dynamic(
  () => import("./AddToCartButtonsContainer")
);
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
      <AddToCartButtonsContainer
        price={productPrice}
        productId={productId}
        title={productTitle}
      />
    </div>
  );
};

export default ProductCard;
