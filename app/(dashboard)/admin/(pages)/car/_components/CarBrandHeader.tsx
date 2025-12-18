import ListHeader from "@/components/ListHeader/ListHeader";
import React from "react";
import CardBrandCreateButton from "./CardBrandCreateButton";

const CarBrandHeader = () => {
  return <ListHeader createButton={<CardBrandCreateButton />} />;
};

export default CarBrandHeader;
