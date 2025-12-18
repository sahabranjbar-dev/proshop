"use client";
import { Table } from "@/components/ui/table";
import ListDataProvider from "@/container/ListDataProvider/ListDataProvider";
import { ITableColumns } from "@/types/Table";
import React, { useMemo } from "react";
import CategoryActionButtons from "./CategoryActionButtons";

const CategoriesList = () => {
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
        title: "نام",
      },
      {
        field: "parent",
        title: "زیرمجموعه",
        render: (data) => data?.name ?? "---",
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
        render: (id) => <CategoryActionButtons id={id} />,
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

export default CategoriesList;
