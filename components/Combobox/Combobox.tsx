"use client";

import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICombobox } from "./meta/types";
import clsx from "clsx";
import { Loader2, TriangleAlert } from "lucide-react";

function Combobox({
  data,
  disabled,
  error,
  onChange,
  refetch,
  selectLabel,
  label,
  placeholder = `${label} را انتخاب کنید...`,
  options,
  selectValue,
  keyField = "id",
  className,
  loading,
  ...res
}: ICombobox<{
  resultList: { farsiTitle: string; englishTitle: string; id: string }[];
}>) {
  // error and loading should handle

  const resolvedOptions = options?.length ? options : data?.resultList;
  return (
    <Select
      dir="rtl"
      onValueChange={(value) => {
        onChange?.(value);
      }}
      value={res?.value}
    >
      <SelectTrigger className={clsx("w-full", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            {selectLabel ? selectLabel : "آیتم"} را انتخاب کنید
          </SelectLabel>
          <div className="min-h-40">
            {loading ? (
              <div className="flex flex-col items-center justify-center min-h-40 w-full">
                <Loader2 className="animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center gap-2 min-h-40 w-full">
                <p className="text-red-500 text-center">خطایی رخ داده است</p>
                <TriangleAlert className="text-red-500" size={20} />
              </div>
            ) : !resolvedOptions?.length ? (
              <div className="flex items-center justify-center gap-2 min-h-40 w-full">
                <p className="text-gray-500">داده‌ای وجود ندارد</p>
              </div>
            ) : (
              resolvedOptions?.map((item) => (
                <SelectItem
                  key={keyField === "id" ? item?.id : item?.englishTitle}
                  value={keyField === "id" ? item.id : item.englishTitle}
                >
                  {item.farsiTitle}
                </SelectItem>
              ))
            )}
          </div>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Combobox;
