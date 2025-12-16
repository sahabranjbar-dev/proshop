"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { allProvinces, citiesOfProvince, searchByName } from "iran-city";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

export interface AddressFormData {
  id?: string;
  province: string;
  city: string;
  address: string;
  plaque: string;
  floor: string;
  postalCode: string;
  phone: string;
  recipientName: string;
  title: string;
  isDefault: boolean;
}

interface Props {
  onSuccess?: (data: any) => void;
}

const AddressForm = ({ onSuccess }: Props) => {
  const provinces = allProvinces();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm<AddressFormData>();

  // eslint-disable-next-line react-hooks/incompatible-library
  const provinceId = +watch("province");

  const filteredCities = useMemo(
    () => citiesOfProvince(provinceId),
    [provinceId]
  );

  const onSubmit = (data: AddressFormData) => {
    mutateAsync(data);
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: AddressFormData) => {
      const result = await api.post("/address", {
        ...data,
      });
      return result.data;
    },
    onSuccess: onSuccess,
  });

  return (
    <div className="border-t p-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        {/* استان و شهر */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* استان */}
          <div className="space-y-2">
            <Label htmlFor="province" className="text-sm sm:text-base">
              استان
              <span className=" text-red-500">{"*"}</span>
            </Label>
            <Controller
              name="province"
              control={control}
              rules={{ required: "انتخاب استان الزامی است" }}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(v) => {
                    field.onChange(v);
                    setValue("city", ""); // reset city
                  }}
                >
                  <SelectTrigger
                    id="province"
                    className="w-full text-sm sm:text-base h-10 sm:h-12"
                  >
                    <SelectValue placeholder="استان را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {provinces.map((p: any) => (
                      <SelectItem
                        key={p.id}
                        value={p.name.toString()}
                        className="text-sm sm:text-base"
                      >
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.province && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.province.message}
              </p>
            )}
          </div>

          {/* شهر */}
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm sm:text-base">
              شهر
              <span className=" text-red-500">{"*"}</span>
            </Label>
            <Controller
              name="city"
              control={control}
              rules={{ required: "انتخاب شهر الزامی است" }}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!watch("province")}
                >
                  <SelectTrigger
                    id="city"
                    className="w-full text-sm sm:text-base h-10 sm:h-12"
                  >
                    <SelectValue
                      placeholder={
                        provinceId
                          ? "شهر را انتخاب کنید"
                          : "ابتدا استان را انتخاب کنید"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {searchByName(watch("province")).map((c: any) => (
                      <SelectItem
                        key={c.name}
                        value={c.name}
                        className="text-sm sm:text-base"
                      >
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.city && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.city.message}
              </p>
            )}
          </div>
        </div>

        {/* آدرس */}
        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm sm:text-base">
            آدرس <span className=" text-red-500">{"*"}</span>
          </Label>
          <div className="relative">
            <Input
              id="address"
              maxLength={120}
              {...register("address", {
                required: "آدرس الزامی است",
                maxLength: {
                  value: 120,
                  message: "حداکثر ۱۲۰ کاراکتر مجاز است",
                },
              })}
              placeholder="مثلاً خیابان آزادی، کوچه ۱۰"
              className="text-sm sm:text-base h-10 sm:h-12 pr-3"
            />
            <span className="m-2 text-xs text-gray-400">
              {watch("address")?.length || 0}/120
            </span>
          </div>
          {errors.address && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* پلاک و واحد */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2">
            <Label htmlFor="plaque" className="text-sm sm:text-base">
              پلاک
            </Label>
            <Input
              id="plaque"
              maxLength={5}
              {...register("plaque", {
                maxLength: { value: 5, message: "حداکثر ۵ رقم" },
                pattern: {
                  value: /^\d+$/,
                  message: "فقط اعداد مجاز هستند",
                },
              })}
              placeholder="مثلاً ۱۲"
              className="text-sm sm:text-base h-10 sm:h-12 text-left"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="floor" className="text-sm sm:text-base">
              واحد
            </Label>
            <Input
              id="floor"
              maxLength={5}
              {...register("floor", {
                pattern: {
                  value: /^\d+$/,
                  message: "فقط اعداد مجاز هستند",
                },
              })}
              placeholder="مثلاً ۴"
              className="text-sm sm:text-base h-10 sm:h-12 text-left"
            />
          </div>
        </div>

        {/* کد پستی */}
        <div className="space-y-2">
          <Label htmlFor="postalCode" className="text-sm sm:text-base">
            کد پستی
            <span className=" text-red-500">{"*"}</span>
          </Label>
          <Input
            id="postalCode"
            maxLength={10}
            {...register("postalCode", {
              required: "کد پستی الزامی است",
              pattern: {
                value: /^\d{10}$/,
                message: "کد پستی باید ۱۰ رقم باشد",
              },
            })}
            placeholder="مثلاً 1234567890"
            className="text-sm sm:text-base h-10 sm:h-12 text-left font-mono"
          />
          {errors.postalCode && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.postalCode.message}
            </p>
          )}
        </div>

        {/* شماره تماس */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm sm:text-base">
            شماره تماس
          </Label>
          <Input
            id="phone"
            {...register("phone")}
            placeholder="مثلاً 09123456789"
            className="text-sm sm:text-base h-10 sm:h-12 text-left font-mono"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="recipientName" className="text-sm sm:text-base">
            نام دریافت کننده محصول
          </Label>
          <Input
            id="recipientName"
            {...register("recipientName")}
            className="text-sm sm:text-base h-10 sm:h-12 text-left font-mono"
          />
        </div>

        {/* دکمه نهایی */}
        <Button
          type="submit"
          disabled={isPending}
          loading={isPending}
          className="w-full mt-4 sm:mt-6 py-3 text-sm sm:text-lg font-bold bg-purple-600 hover:bg-purple-700 transition-all duration-200 h-12 sm:h-14 text-white shadow-lg hover:shadow-xl"
        >
          ثبت
        </Button>
      </form>
    </div>
  );
};

export default AddressForm;
