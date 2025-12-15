import ListContainer from "@/container/ListContainer/ListContainer";
import React from "react";
import ProductsHeader from "./_components/ProductsHeader";
import ProductsList from "./_components/ProductsList";

const ProductsPage = () => {
  return (
    <ListContainer queryKey={["admin", "products"]} url="/admin/products">
      <ProductsHeader />
      <ProductsList />
    </ListContainer>
  );
};

export default ProductsPage;
