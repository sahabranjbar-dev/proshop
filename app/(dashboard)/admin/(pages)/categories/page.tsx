import ListContainer from "@/container/ListContainer/ListContainer";
import React from "react";
import CategoriesHeader from "./_components/CategoriesHeader";
import CategoriesList from "./_components/CategoriesList";

const CategoriesPage = () => {
  return (
    <ListContainer queryKey={["categories", "admin"]} url="/admin/category">
      <CategoriesHeader />
      <CategoriesList />
    </ListContainer>
  );
};

export default CategoriesPage;
