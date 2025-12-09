"use client";
import { cn } from "@/lib/utils";
import { ChangeEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { IBaseField } from "./meta/types";
import clsx from "clsx";

const BaseField = ({
  name,
  label,
  required,
  validate,
  loading,
  disabled,
  className,
  component: Compo = Input,
  defaultValue,
  onChange,
  containerClassName,
  ...res
}: IBaseField) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required: required ? "فیلد اجباری است" : false,
        validate: validate ? validate : undefined,
      }}
      render={({ field, formState }) => {
        return (
          <div
            className={clsx(
              "flex flex-col justify-between items-start gap-2 relative",
              containerClassName
            )}
          >
            {label && (
              <label htmlFor={name}>
                {label}{" "}
                {required && <span className=" text-red-500">{"*"}</span>}
              </label>
            )}
            <Compo
              {...field}
              {...res}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onChange?.(event);
                field.onChange(event);
              }}
              id={name}
              className={cn(
                "disabled:cursor-not-allowed disabled:select-none",
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
