"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  productId: string;
  productTitle: string;
  productPrice: number;
  productDescription?: string;
  productImageUrl?: string;
}

const ProductCard = ({
  productId,
  productPrice,
  productTitle,
  productDescription,
  productImageUrl,
}: Props) => {
  return (
    <Link
      target="_blank"
      href={`/shop/${productId}`}
      className="border p-2 rounded bg-white max-h-[400px] min-w-[150px] hover:shadow-2xl duration-200"
    >
      <div className="relative flex justify-center items-center">
        <Image
          src={productImageUrl || "/images/placeholder.png"}
          alt={productTitle}
          width={350}
          height={350}
          className="rounded my-2 max-h-48 h-48 object-cover border"
        />
      </div>
      <h3 className="text-primary-700 font-semibold line-clamp-2">
        {productTitle}
      </h3>
      <h4 className="line-clamp-2 my-2 text-gray-400">
        {productDescription} {productDescription}
      </h4>
      <div className="flex justify-end gap-2 ml-1 my-2">
        ۴.۲
        <Star fill="#F9BC00" className="border-none" stroke="" />
      </div>

      <div className="flex justify-end items-center gap-2 ml-2 my-2 font-semibold">
        <span>{Number(productPrice).toLocaleString("fa")}</span>
        <span className="text-xs">تومان</span>
      </div>
    </Link>
  );
};

export default ProductCard;
