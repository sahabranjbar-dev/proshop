"use client";
import ActionsButtons from "@/components/ActionsButtons/ActionsButtons";
import { Table } from "@/components/ui/table";
import ListDataProvider from "@/container/ListDataProvider/ListDataProvider";
import { ITableColumns } from "@/types/Table";
import React, { useMemo } from "react";
import CarModelForm from "./CarModelForm";

const CarModelList = () => {
  const columns: ITableColumns[] = useMemo(
    () => [
      {
        field: "rowNumber",
        title: "ردیف",
      },
      {
        field: "name",
        title: "نام",
      },
      {
        field: "slug",
        title: "slug",
      },
      {
        field: "carBrand",
        title: "برند خودرو",
        render: (value: { name: string }) => value?.name,
      },
      {
        field: "year",
        title: "سال تولید",
      },
      {
        field: "engineType",
        title: "نوع موتور",
      },
      {
        field: "id",
        title: "عملیات",
        render: (v: string) => (
          <ActionsButtons
            editForm={CarModelForm}
            id={v}
            queryKey={["car-model"]}
            title="مدل خودرو"
            url="/admin/car/car-model"
          />
        ),
      },
    ],
    []
  );
  return (
    <ListDataProvider>
      <Table columns={columns} />
    </ListDataProvider>
  );
};

export default CarModelList;
