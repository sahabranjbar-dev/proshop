"use client";
import React from "react";
import { Button } from "../ui/button";
import { CircleX, Search } from "lucide-react";
import { useList } from "@/container/ListContainer/ListContainer";
import { useFormContext } from "react-hook-form";

const FilterButtons = () => {
  const { setSearchParams } = useList();
  const { reset } = useFormContext();
  const resetSearchHandler = () => {
    setSearchParams?.({});
    reset();
  };
  return (
    <div className="flex justify-start items-center gap-2 mr-2">
      <Button
        tooltip="جستجو"
        variant={"link"}
        className="rounded-full bg-blue-500 h-10 w-10 mt-4"
      >
        <Search className="text-white" />
      </Button>

      <Button
        tooltip="حذف فیلتر‌ها"
        type="button"
        variant={"link"}
        className="rounded-full bg-red-500 h-10 w-10 mt-4"
        onClick={resetSearchHandler}
      >
        <CircleX className="text-white" />
      </Button>
    </div>
  );
};

export default FilterButtons;
