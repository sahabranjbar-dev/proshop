"use client";
import { Table } from "@/components/ui/table";
import ListDataProvider from "@/container/ListDataProvider/ListDataProvider";
import { ITableColumns } from "@/types/Table";
import React, { useMemo } from "react";

const CarModelList = () => {
  const columns: ITableColumns[] = useMemo(
    () => [
      {
        field: "rowNumber",
        title: "ردیف",
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
