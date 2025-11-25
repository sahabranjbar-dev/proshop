import ListContainer from "@/container/ListContainer/ListContainer";
import React from "react";
import ProductsHeader from "./components/ProductsHeader";
import ProductsList from "./components/ProductsList";

const ProductsPage = () => {
  return (
    <ListContainer queryKey={["admin", "products"]} url="/admin/products">
      <ProductsHeader />
      <ProductsList />
    </ListContainer>
  );
};

export default ProductsPage;
