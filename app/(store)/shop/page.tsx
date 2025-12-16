"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import api from "@/lib/axios";
import ProductCard from "@/components/ProductCard/ProductCard";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import ShopFilters from "./_components/ShopFilters";

const ProductsPage = () => {
  const searchParams = useSearchParams();

  // ✅ پایدار و sync با API
  const brands = searchParams.getAll("brand");
  const brandParam = brands.length ? brands.join(",") : undefined;
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["products", brandParam, minPrice, maxPrice], // ✅ stable key
    queryFn: async () => {
      const response = await api.get("/products", {
        params: {
          brand: brandParam, // nike,adidas
          minPrice,
          maxPrice,
        },
      });
      return response.data;
    },
  });

  if (isLoading)
    return <LoadingPage className="border rounded bg-primary-50" />;

  if (isError) {
    return <ErrorPage error={error} />;
  }

  return (
    <>
      <div className="container mx-auto m-4 p-4">
        <div className="md:flex justify-start items-start gap-2">
          <ShopFilters />
          {isFetching && (
            <div className="text-sm text-gray-500 mb-2">
              در حال بروزرسانی نتایج...
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {data?.products?.map((product: any) => (
              <ProductCard
                key={product.id}
                productId={product.id}
                productTitle={product.title}
                productPrice={product.price}
                productDescription={product?.description ?? ""}
                productImageUrl={product.files?.[0]?.url}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
