"use client";

import { PropsWithChildren, useContext, useState } from "react";
import { IListContainer, SortDirection } from "./meta/types";
import { ListContainerContext } from "./context/ListContainerContext";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

const ListContainer = ({
  children,
  url,
  params,
  queryKey,
}: PropsWithChildren<IListContainer>) => {
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const resolvedParams = { ...params, sortField, sortDirection };

  const { data, error, refetch, isFetching, isLoading } = useQuery({
    queryKey: [...queryKey, sortField, sortDirection],
    queryFn: async () => {
      const response = await api.get(url, {
        params: resolvedParams,
      });
      return response.data;
    },
  });

  const handleSort = (field: string) => {
    setSortDirection(
      sortField === field && sortDirection === "asc" ? "desc" : "asc"
    );
    setSortField(field);
  };
  return (
    <ListContainerContext.Provider
      value={{
        data,
        error,
        loading: isFetching || isLoading,
        fetch: refetch,
        url,
        onSort: handleSort,
        sortField: sortField,
        sortDirection: sortDirection,
      }}
    >
      {children}
    </ListContainerContext.Provider>
  );
};

export const useList = () => {
  const context = useContext(ListContainerContext);
  if (!context) throw new Error("useList must be used within ListContainer");
  return context;
};
export default ListContainer;
