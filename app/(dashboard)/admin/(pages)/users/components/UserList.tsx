"use client";
import ListAcionButtons from "@/components/ListAcionButtons/ListAcionButtons";
import { Table } from "@/components/ui/table";
import ListDataProvider from "@/container/ListDataProvider/ListDataProvider";
import { ITableColumns } from "@/types/Table";
import { useMemo } from "react";

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
        title: "موبایل",
      },
      {
        field: "email",
        title: "ایمیل",
      },
      {
        field: "role",
        title: "نقش",
        render: (value) => (value === "ADMIN" ? "ادمین" : "کاربر"),
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
        render: (id) => {
          return (
            <ListAcionButtons
              deleteUrl="/admin/users"
              id={id}
              editHref={`/admin/users/${id}`}
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
      <Table columns={columns} data={[]} />
    </ListDataProvider>
  );
};

export default UserList;
