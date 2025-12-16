"use client";
import { Table } from "@/components/ui/table";
import ListDataProvider from "@/container/ListDataProvider/ListDataProvider";
import { ITableColumns } from "@/types/Table";
import { useMemo } from "react";
import BrandActionButton from "./BrandActionButton";

const BrandsList = () => {
  const columns = useMemo<ITableColumns[]>(
    () => [
      {
        field: "rowNumber",
        title: "ردیف",
      },
      {
        field: "farsiTitle",
        title: "نام فارسی",
      },
      {
        field: "englishTitle",
        title: "نام انگلیسی",
      },
      {
        field: "slug",
        title: "شعار",
      },
      {
        field: "website",
        title: "وبسایت",
      },
      {
        field: "isActive",
        title: "فعال/غیرفعال",
        render: (value) =>
          value ? (
            <p className="p-1 rounded-2xl bg-green-200 text-center">فعال</p>
          ) : (
            <p className="p-1 rounded-2xl bg-red-200 text-center">غیرفعال</p>
          ),
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
        render: (id) => <BrandActionButton id={id} />,
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

export default BrandsList;
