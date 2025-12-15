"use client";
import BaseField from "@/components/BaseField/BaseField";
import FilterButtons from "@/components/FilterButtons/FilterButtons";
import Form from "@/components/Form/Form";
import { Input } from "@/components/ui/input";
import { useList } from "@/container/ListContainer/ListContainer";
import { unFormatPrice } from "@/utils/common";
import React from "react";

const ProductsFilter = () => {
  const { setSearchParams } = useList();
  const onSubmit = (data: {
    title: string;
    fromPrice: string;
    toPrice: string;
  }) => {
    setSearchParams?.((prev: any) => ({
      ...prev,
      title: data.title,
      fromPrice: data.fromPrice ? unFormatPrice(data.fromPrice) : undefined,
      toPrice: data?.toPrice ? unFormatPrice(data?.toPrice) : undefined,
    }));
  };
  return (
    <>
      <Form onSubmit={onSubmit} className="grid grid-cols-4 gap-2">
        <BaseField component={Input} label="نام محصول" name="title" />
        <BaseField
          component={Input}
          formatter
          label="از قیمت"
          name="fromPrice"
        />
        <BaseField component={Input} formatter label="تا قیمت" name="toPrice" />
        <FilterButtons />
      </Form>
    </>
  );
};

export default ProductsFilter;
