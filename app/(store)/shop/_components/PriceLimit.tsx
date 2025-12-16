"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useCallback, useMemo, useState } from "react";

const getValidNumber = (value: unknown, fallback: number = 0): number => {
  const num = Number(value);

  return isNaN(num) || !isFinite(num) ? fallback : num;
};

const useDebounce = <T,>(value: T, delay: number = 600): T => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

const PriceLimit = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialParams = useMemo(() => {
    const min = getValidNumber(searchParams.get("minPrice"));
    const max = getValidNumber(searchParams.get("maxPrice"));
    return { min, max };
  }, [searchParams]);

  const { data, isLoading } = useQuery({
    queryKey: ["price-range"],
    queryFn: async () => {
      const res = await api.get("/products/price-range");
      if (res.status !== 200) throw new Error("خطا در دریافت محدوده قیمت");
      return res.data;
    },
  });

  const backendMin = useMemo(
    () => getValidNumber(data?.minPrice, 0),
    [data?.minPrice]
  );
  const backendMax = useMemo(
    () => getValidNumber(data?.maxPrice, 100_000_000),
    [data?.maxPrice]
  );

  const [localRange, setLocalRange] = useState<[number, number]>(() => {
    if (initialParams.min > 0 || initialParams.max > 0) {
      const min = Math.max(0, Math.min(initialParams.min, backendMax));
      const max = Math.min(backendMax, Math.max(initialParams.max, min + 1));
      return [min, max];
    }
    return [backendMin, backendMax];
  });

  const debouncedRange = useDebounce(localRange);

  useEffect(() => {
    const [min, max] = debouncedRange;
    if (min < 0 || max <= min) return;

    const params = new URLSearchParams(searchParams.toString());

    const currentMin = getValidNumber(params.get("minPrice"));
    const currentMax = getValidNumber(params.get("maxPrice"));

    const isMinDefault = min === backendMin;
    const isMaxDefault = max === backendMax;

    const shouldUpdateMin = min !== currentMin && !isMinDefault;
    const shouldUpdateMax = max !== currentMax && !isMaxDefault;

    if (!shouldUpdateMin && !shouldUpdateMax) return;

    if (!isMinDefault) {
      params.set("minPrice", min.toString());
    } else {
      params.delete("minPrice");
    }

    if (!isMaxDefault) {
      params.set("maxPrice", max.toString());
    } else {
      params.delete("maxPrice");
    }

    if (params.toString() !== searchParams.toString()) {
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [debouncedRange, backendMin, backendMax, router, searchParams]);

  const handleSliderChange = useCallback(
    ([min, max]: [number, number]) => {
      const clampedMin = Math.max(0, Math.min(min, backendMax));
      const clampedMax = Math.min(backendMax, Math.max(max, clampedMin + 1));
      setLocalRange([clampedMin, clampedMax]);
    },
    [backendMax]
  );

  const handleReset = useCallback(() => {
    setLocalRange([backendMin, backendMax]);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("minPrice");
    params.delete("maxPrice");
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [backendMin, backendMax, router, searchParams]);

  const showReset = localRange[0] > backendMin || localRange[1] < backendMax;

  if (isLoading) {
    return (
      <div className="m-2">
        <Skeleton className="h-10 bg-gray-200 rounded" />
        <div className="flex justify-between mt-4">
          <Skeleton className="h-4 w-20 bg-gray-200 rounded" />
          <Skeleton className="h-4 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="m-2 text-sm text-red-600">
        خطا در بارگذاری محدوده قیمت
      </div>
    );
  }

  const step = Math.max(1000, Math.floor(backendMax / 100));

  return (
    <div className="m-2 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">محدوده قیمت</h3>
        {showReset && (
          <button
            onClick={handleReset}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            بازنشانی
          </button>
        )}
      </div>

      <Slider
        key={`slider-${backendMax}`}
        value={localRange}
        min={0}
        max={backendMax}
        step={step}
        onValueChange={handleSliderChange}
        dir="rtl"
        className="py-2"
      />

      <div className="flex justify-between text-sm">
        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-500">حداقل</span>
          <span className="font-medium text-xs">
            {localRange[0].toLocaleString()} تومان
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-500">حداکثر</span>
          <span className="font-medium text-xs">
            {localRange[1].toLocaleString()} تومان
          </span>
        </div>
      </div>

      <div className="text-xs text-gray-500 text-center">
        محدوده کامل: 0 تا {backendMax.toLocaleString()} تومان
      </div>
    </div>
  );
};

export default PriceLimit;
