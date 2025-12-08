import prisma from "@/utils/prisma";
import React from "react";
import ProductCard from "./components/ProductCard";

const ProoductsPage = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 m-4">
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            productId={product.id}
            productTitle={product.title}
            productPrice={product.price.toNumber()}
          />
        );
      })}
    </div>
  );
};

export default ProoductsPage;
