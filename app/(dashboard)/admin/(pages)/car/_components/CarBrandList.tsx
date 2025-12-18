"use client";
import ActionsButtons from "@/components/ActionsButtons/ActionsButtons";
import { Table } from "@/components/ui/table";
import ListDataProvider from "@/container/ListDataProvider/ListDataProvider";
import { ITableColumns } from "@/types/Table";
import React, { useMemo } from "react";
import CarBrandForm from "./CarBrandForm";

const CarBrandList = () => {
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
        field: "id",
        title: "عملیات",
        render: (v) => (
          <ActionsButtons
            editForm={CarBrandForm}
            id={v}
            queryKey={["car-brand"]}
            title="برند خودرو"
            url="/admin/car/car-brand"
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

export default CarBrandList;
