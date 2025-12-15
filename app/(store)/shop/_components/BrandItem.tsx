"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const BrandItem = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="flex justify-start items-center gap-2 p-2 border-b">
      <Checkbox
        id="ngk"
        onCheckedChange={(data) => {
          if (!data) return;
          updateParam("brand", "ngk");
        }}
      />
      <Label htmlFor="ngk">NGK</Label>
    </div>
  );
};

export default BrandItem;
