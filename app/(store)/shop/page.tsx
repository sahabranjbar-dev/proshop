"use client";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../../components/ProductCard/ProductCard";
import api from "@/lib/axios";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import { useSearchParams } from "next/navigation";

const ProoductsPage = () => {
  const searchParams = useSearchParams();
  const brand = searchParams.get("brand");
  const { data, isLoading, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const reponse = await api.get("/products", {
        params: {
          brand,
        },
      });

      return reponse.data;
    },
  });

  if (isLoading || isPending)
    return <LoadingPage className="border rounded bg-primary-50" />;

  if (isError) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {data?.products?.map((product: any) => {
        return (
          <ProductCard
            key={product.id}
            productId={product.id}
            productTitle={product.title}
            productPrice={product.price}
            productDescription={product?.description ?? ""}
          />
        );
      })}
    </div>
  );
};

export default ProoductsPage;
