"use client";

import React from "react";
import clsx from "clsx";
import { Loader2, TriangleAlert } from "lucide-react";

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
  selectLabel,
  label,
  placeholder = `${label} را انتخاب کنید...`,
  options,
  keyField = "id",
  className,
  loading,
  getLabel,
  getKey,
  ...rest
}: ICombobox) {
  const resolvedOptions = options?.length ? options : data?.resultList ?? [];

  const getItemKey = (item: any) =>
    keyField === "id" ? item.id : getKey ? getKey(item) : item.englishTitle;

  const getItemLabel = (item: any) =>
    getLabel ? getLabel(item) : item.farsiTitle;

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-40">
          <Loader2 className="animate-spin text-primary" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center gap-2 min-h-40">
          <TriangleAlert className="text-red-500" size={20} />
          <p className="text-red-500">خطایی رخ داده است</p>
        </div>
      );
    }

    if (!resolvedOptions.length) {
      return (
        <div className="flex items-center justify-center min-h-40">
          <p className="text-gray-500">داده‌ای وجود ندارد</p>
        </div>
      );
    }

    return resolvedOptions.map((item: any) => {
      const value = getItemKey(item);

      return (
        <SelectItem key={value} value={value}>
          {getItemLabel(item)}
        </SelectItem>
      );
    });
  };

  return (
    <Select
      dir="rtl"
      disabled={disabled}
      value={rest.value}
      onValueChange={onChange}
    >
      <SelectTrigger className={clsx("w-full", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>{selectLabel ?? "آیتم"} را انتخاب کنید</SelectLabel>

          <div className="min-h-40">{renderContent()}</div>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Combobox;
