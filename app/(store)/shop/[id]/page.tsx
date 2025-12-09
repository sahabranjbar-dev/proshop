import prisma from "@/utils/prisma";
import React from "react";

interface Props {
  params?: Promise<{ id: string }>;
}

const ProductPage = async ({ params }: Props) => {
  const resolvedParams = await params;

  const id = resolvedParams?.id;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return <div>{product?.title}</div>;
};

export default ProductPage;
