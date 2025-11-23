import ListHeader from "@/components/ListHeader/ListHeader";
import React from "react";
import ProductsFilter from "./ProductsFilter";

const ProductsHeader = () => {
  return (
    <ListHeader
      filter={<ProductsFilter />}
      formPath="/admin/products/new-product"
    />
  );
};

export default ProductsHeader;
