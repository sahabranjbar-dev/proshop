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

function Combobox({
  data,
  disabled,
  error,
  onChange,
  refetch,
  selectLabel,
  placeholder,
  options,
  selectValue,
  keyField = "id",
  className,
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
        {selectValue ? selectValue : <SelectValue placeholder={placeholder} />}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            {selectLabel ? selectLabel : "آیتم"} را انتخاب کنید
          </SelectLabel>
          {resolvedOptions?.map((item) => (
            <SelectItem
              key={item.englishTitle}
              value={keyField === "id" ? item.id : item.englishTitle}
            >
              {item.farsiTitle}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Combobox;
