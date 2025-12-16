import { Card } from "@/components/ui/card";
import prisma from "@/utils/prisma";
import ProductImageGallery from "./_components/ProductImageGallery";
import ProductDescription from "./_components/ProductDescription";
import TechnicalSpecifications from "./_components/TechnicalSpecifications";
import SimilarProducts from "./_components/SimilarProducts";
import ProductComments from "./_components/ProductComments";
import ProductInfo from "./_components/ProductInfo";

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
    include: {
      brand: true,
      campaigns: true,
      categories: true,
      files: true,
      reviews: {
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      _count: true,
    },
  });

  if (!product) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">محصول یافت نشد</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto m-2 relative">
      <div className="md:flex justify-between items-start gap-2">
        <div className="flex flex-col justify-start items-start flex-1 mt-2 gap-2">
          <Card className="w-full">
            <ProductInfo files={product.files} />
          </Card>
          <Card className="w-full">
            <ProductDescription />
          </Card>
          <Card className="w-full">
            <TechnicalSpecifications />
          </Card>
          <Card className="w-full">
            <ProductComments />
          </Card>
        </div>
        <Card className="md:sticky fixed bottom-0 md:top-40 z-50 w-full md:w-1/4 left-0 md:left-auto right-0 md:right-auto p-4 md:p-6 shadow-lg md:shadow-none">
          add to cart button
        </Card>
      </div>

      <div className="mt-4 border">
        <SimilarProducts />
      </div>
    </div>
  );
};

export default ProductPage;
