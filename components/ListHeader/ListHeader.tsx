"use client";

import { useList } from "@/container/ListContainer/ListContainer";
import { cn } from "@/lib/utils";
import { Funnel, Plus, RefreshCcw } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { IListHeader } from "./meta/types";

const ListHeader = ({
  hasRefresh = true,
  filter: Filter,
  formPath,
  title,
  hasExport = false,
  exportUrl,
}: IListHeader) => {
  const { fetch, loading } = useList();
  const [filterOpen, setFilterOpen] = useState<boolean>();
  const pathname = usePathname();
  const pathType = pathname.split("/")[pathname.split("/").length - 1];

  return (
    <div>
      {title && <h2 className="text-2xl font-semibold my-4">{title}</h2>}
      <div className="flex items-start justify-start gap-2 my-2">
        <Button onClick={() => {}} tooltip="ایجاد">
          <Plus />
        </Button>
        {hasRefresh && (
          <Button
            variant="outline"
            className="flex items-center gap-1 hover:text-orange-500"
            disabled={loading}
            tooltip="بروزرسانی"
            onClick={() => {
              fetch();
            }}
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="outline"
          className={cn("flex items-center gap-1 hover:text-orange-500", {
            "text-red-400 border-orange-400": filterOpen,
          })}
          onClick={() => setFilterOpen((prev) => !prev)}
          tooltip="فیلتر"
        >
          <Funnel />
        </Button>
      </div>
      filters
    </div>
  );
};

export default ListHeader;
