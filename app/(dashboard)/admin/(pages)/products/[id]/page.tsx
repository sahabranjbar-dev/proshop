import { authOptions } from "@/lib/authOptions";
import { IFiles, Role } from "@/types/common";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import React from "react";
import ProductForm from "./components/ProductForm";

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== Role.ADMIN) {
    return "شما دسترسی به این صفحه ندارید";
  }

  const resolvedParams = await params;

  const { id } = resolvedParams;
  if (id === "new-product") {
    return <ProductForm />;
  }

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    select: {
      files: {
        where: {
          productId: id,
        },
      },
      id: true,
      price: true,
      title: true,
    },
  });

  return (
    <ProductForm
      id={product?.id}
      price={product?.price}
      title={product?.title}
      files={product?.files}
    />
  );
};

export default ProductPage;
