"use client";
import ListAcionButtons from "@/components/ListAcionButtons/ListAcionButtons";
import { Table } from "@/components/ui/table";
import ListDataProvider from "@/container/ListDataProvider/ListDataProvider";
import { ITableColumns } from "@/types/Table";
import { useMemo } from "react";

const ProductsList = () => {
  const columns: ITableColumns[] = useMemo(
    () => [
      {
        field: "rowNumber",
        title: "ردیف",
        sortable: false,
      },
      {
        field: "title",
        title: "نام محصول",
      },
      {
        field: "price",
        title: "قیمت محصول",
        render: (value: number) => value.toLocaleString("fa"),
      },
      {
        field: "createdAt",
        title: "تاریخ ایجاد",
        hasDateFormatter: true,
      },
      {
        field: "updatedAt",
        title: "تاریخ ویرایش",
        hasDateFormatter: true,
      },
      {
        field: "id",
        title: "عملیات",
        sortable: false,
        render: (id: string) => {
          return (
            <ListAcionButtons
              deleteUrl="/admin/products"
              id={id}
              editHref={`/admin/products/${id}`}
              key={id}
            />
          );
        },
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

export default ProductsList;
