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
  refetch,
  ...res
}: ICombobox<{ resultList: { farsiTitle: string; englishTitle: string }[] }>) {
  return (
    <Select
      dir="rtl"
      onValueChange={(value) => {
        res?.onChange?.(value);
      }}
      value={res.value}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a item" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>نقش را انتخاب کنید</SelectLabel>
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
