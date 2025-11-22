import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

export interface IListContainer {
  url: string;
  params?: any;
  queryKey: string[];
}

export interface IListContainerContext<TData = any, TError = any> {
  data?: any;
  loading?: boolean;
  fetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<TData, TError>>;
  error?: any;
  url?: string;
  onSort: (field: string) => void;
  sortField: string;
  sortDirection: SortDirection;
}

export type SortDirection = "desc" | "asc";
