"use client";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";
import { IBaseField } from "./meta/types";
import { convertToEnglishDigits } from "@/utils/common";

const BaseField = ({
  name,
  label,
  required,
  validate,
  loading,
  disabled,
  className,
  component: Compo,
  formatter = false,
  ...res
}: IBaseField) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={""}
      rules={{
        required: required ? "فیلد اجباری است" : false,
        validate: validate ? validate : undefined,
      }}
      render={({ field, formState }) => {
        return (
          <div className="flex flex-col justify-between items-start gap-2">
            {label && (
              <label htmlFor={name}>
                {label}{" "}
                {required && <span className=" text-red-500">{"*"}</span>}
              </label>
            )}
            <Compo
              {...field}
              {...res}
              id={name}
              className={cn(
                "border",
                {
                  "border-red-500": formState.errors[name],
                },
                className
              )}
              disabled={
                (typeof disabled === "boolean"
                  ? disabled
                  : Boolean(disabled)) || loading
              }
              data-loading={loading ? true : false}
              value={
                field.value !== null && field.value !== undefined
                  ? field.value.toLocaleString("fa")
                  : ""
              }
              onChange={(e: any) => {
                if (!formatter) {
                  field.onChange(e.target.value);
                  return;
                }
                field.onChange(
                  convertToEnglishDigits(e.target.value)
                    .replace(/[٬,]/g, "")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                );
              }}
            />
            <span className="text-red-500 text-xs">
              {formState.errors[name] && (
                <>
                  {formState.errors[name]?.message}
                  {/* اگر چند خطا باشه (مثل superRefine یا refine چندتایی) */}
                  {formState.errors[name]?.type === "manual" &&
                    (formState.errors[name] as any)?.messages?.map(
                      (msg: string, i: number) => <div key={i}>{msg}</div>
                    )}
                </>
              )}
            </span>
          </div>
        );
      }}
    />
  );
};

export default BaseField;
