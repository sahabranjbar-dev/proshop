"use client";
import { Table } from "@/components/ui/table";
import ListDataProvider from "@/container/ListDataProvider/ListDataProvider";
import { ITableColumns } from "@/types/Table";
import React, { useMemo } from "react";

const UserList = () => {
  const columns: ITableColumns[] = useMemo(
    () => [
      {
        field: "rowNumber",
        title: "ردیف",
        sortable: false,
      },
      {
        field: "firstName",
        title: "نام",
      },
      {
        field: "lastName",
        title: "نام خانوادگی",
      },
      {
        field: "phone",
        title: "تلفن",
      },
      {
        field: "email",
        title: "ایمیل",
      },
      {
        field: "role",
        title: "نقش",
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
      },
    ],
    []
  );
  return (
    <ListDataProvider>
      <Table columns={columns} data={[]} />
    </ListDataProvider>
  );
};

export default UserList;
