import ListHeader from "@/components/ListHeader/ListHeader";
import React from "react";
import CarModelCreateButton from "./CarModelCreateButton";

const CarModelHeader = () => {
  return <ListHeader createButton={<CarModelCreateButton />} />;
};

export default CarModelHeader;
