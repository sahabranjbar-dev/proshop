"use client";

import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React, { cloneElement, PropsWithChildren } from "react";
import { IComboboxItemDataGetter } from "./meta/types";

const ComboboxItemDataGetter = ({
  children,
  url,
  queryKey,
}: PropsWithChildren<IComboboxItemDataGetter>) => {
  const { data, isFetching, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await api.get(url);
      return response.data;
    },
  });

  if (!React.isValidElement(children)) {
    // If children is not a valid React element, render it as-is (or null)
    return <>{children}</>;
  }

  return cloneElement(children as React.ReactElement<any>, {
    data,
    loading: isFetching || isLoading,
    refetch,
    error,
  });
};

export default ComboboxItemDataGetter;
