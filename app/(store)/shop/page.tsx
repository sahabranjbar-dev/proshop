import prisma from "@/utils/prisma";
import React from "react";
import ProductCard from "../../../components/ProductCard/ProductCard";

const ProoductsPage = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  console.log({ products });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 m-4">
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            productId={product.id}
            productTitle={product.title}
            productPrice={product.price.toNumber()}
            productDescription={product?.description ?? ""}
          />
        );
      })}
    </div>
  );
};

export default ProoductsPage;
