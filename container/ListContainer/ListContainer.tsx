"use client";

import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren, useContext, useState } from "react";
import { ListContainerContext } from "./context/ListContainerContext";
import { IListContainer } from "./meta/types";

const ListContainer = ({
  children,
  url,
  params,
  queryKey,
}: PropsWithChildren<IListContainer>) => {
  const [searchParams, setSearchParams] = useState<any>();

  const resolvedParams = { ...params, ...searchParams };

  const { data, error, refetch, isFetching, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await api.get(url, {
        params: resolvedParams,
      });
      return response.data;
    },
  });

  return (
    <ListContainerContext.Provider
      value={{
        data,
        error,
        loading: isFetching || isLoading,
        fetch: refetch,
        url,
        setSearchParams,
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
