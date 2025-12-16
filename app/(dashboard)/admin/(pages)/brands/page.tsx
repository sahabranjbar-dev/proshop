import ListContainer from "@/container/ListContainer/ListContainer";
import React from "react";
import BrandsHeader from "./_components/BrandsHeader";
import BrandsList from "./_components/BrandsList";

const BrandsPage = () => {
  return (
    <ListContainer queryKey={["brands"]} url="/admin/brands">
      <BrandsHeader />
      <BrandsList />
    </ListContainer>
  );
};

export default BrandsPage;
