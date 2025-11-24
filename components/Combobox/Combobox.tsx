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

function Combobox({
  data,
  disabled,
  error,
  onChange,
  refetch,
  selectLabel,
  placeholder,
  ...res
}: ICombobox<{ resultList: { farsiTitle: string; englishTitle: string }[] }>) {
  // error and loading should handle

  return (
    <Select
      dir="rtl"
      onValueChange={(value) => {
        onChange?.(value);
      }}
      value={res.value}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            {selectLabel ? selectLabel : "آیتم"} را انتخاب کنید
          </SelectLabel>
          {data?.resultList.map((item) => (
            <SelectItem key={item.englishTitle} value={item.englishTitle}>
              {item.farsiTitle}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Combobox;
