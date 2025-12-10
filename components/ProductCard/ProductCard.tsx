"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  productId: string;
  productTitle: string;
  productPrice: number;
  productDescription?: string;
}

const ProductCard = ({
  productId,
  productPrice,
  productTitle,
  productDescription,
}: Props) => {
  return (
    <Link
      target="_blank"
      href={`/shop/${productId}`}
      className="border p-2 rounded bg-white"
    >
      <Image
        src={"/images/placeholder.png"}
        alt={productTitle}
        width={100}
        height={200}
        className="w-full"
      />
      <h3 className="text-primary-500 font-semibold">{productTitle}</h3>
      <h4 className="line-clamp-2 my-2 text-gray-400">
        {productDescription} {productDescription}
      </h4>
      <div className="flex justify-end gap-2 ml-1 my-2">
        ۴.۲
        <Star fill="#F9BC00" className="border-none" stroke="" />
      </div>

      <div className="flex justify-end items-center gap-2 ml-2 my-2 font-semibold">
        <span>{productPrice.toLocaleString("fa")}</span>
        تومان
      </div>
    </Link>
  );
};

export default ProductCard;
