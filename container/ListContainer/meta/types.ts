import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

export interface IListContainer {
  url: string;
  params?: any;
  queryKey: readonly unknown[];
}

export interface IListContainerContext<TData = any, TError = any> {
  data?: any;
  loading?: boolean;
  fetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<TData, TError>>;
  error?: any;
  url?: string;
  setSearchParams: Dispatch<SetStateAction<any>>;
}

export type SortDirection = "desc" | "asc";
