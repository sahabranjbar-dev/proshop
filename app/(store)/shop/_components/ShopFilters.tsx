"use client";

import { Modal } from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { Filter as FilterIcon } from "lucide-react";
import React, { useState } from "react";
import Filters from "./Filters";

const ShopFilters = () => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  return (
    <>
      <div className="border p-4 rounded md:hidden">
        <Button type="button" onClick={() => setOpenFilter(true)}>
          <FilterIcon />
        </Button>

        <Modal
          title="فیلتر"
          hideActions
          open={openFilter}
          onOpenChange={setOpenFilter}
          className="overflow-scroll"
        >
          <Filters />
        </Modal>
      </div>

      <div className="border p-4 rounded hidden md:flex flex-col min-w-1/5 sticky top-40">
        <h2 className="text-lg font-bold">فیلتر</h2>
        <Filters />
      </div>
    </>
  );
};

export default ShopFilters;
