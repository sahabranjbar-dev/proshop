"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import api from "@/lib/axios";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Brand = {
  id: number;
  farsiTitle: string;
  englishTitle: string;
  slug: string;
};

const BrandItem = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ source of truth
  const selectedBrands = searchParams.getAll("brand");

  const toggleBrand = (slug: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    const brands = params.getAll("brand");

    params.delete("brand");

    const nextBrands = checked
      ? Array.from(new Set([...brands, slug])) // جلوگیری از تکرار
      : brands.filter((b) => b !== slug);

    nextBrands.forEach((b) => params.append("brand", b));

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await api.get("/brands");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {data?.result?.map((brand: Brand) => {
        const isChecked = selectedBrands.includes(brand.slug);

        return (
          <div key={brand.id} className="flex items-center gap-2">
            <Checkbox
              id={brand.slug}
              checked={isChecked}
              onCheckedChange={(checked) =>
                toggleBrand(brand.slug, Boolean(checked))
              }
            />
            <Label htmlFor={brand.slug} className="cursor-pointer">
              {brand.farsiTitle}
            </Label>
          </div>
        );
      })}
    </div>
  );
};

export default BrandItem;
