"use client";

import { useList } from "@/container/ListContainer/ListContainer";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { Funnel, Plus, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { IListHeader } from "./meta/types";

const ListHeader = ({
  hasRefresh = true,
  filter: Filter,
  formPath,
  title,
  createButton,
}: IListHeader) => {
  const { fetch, loading } = useList();
  const [filterOpen, setFilterOpen] = useState<boolean>();

  return (
    <div>
      {title && <h2 className="text-2xl font-semibold my-4">{title}</h2>}
      <div className="flex items-start justify-start gap-2 my-2">
        {createButton
          ? createButton
          : !!formPath && (
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
                    href={formPath}
                  >
                    <Plus size={20} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>ایجاد</TooltipContent>
              </Tooltip>
            )}
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

      <div
        className={clsx(
          "overflow-hidden transition-all duration-300",
          filterOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-2 bg-white rounded shadow m-2">{Filter}</div>
      </div>
    </div>
  );
};

export default ListHeader;
