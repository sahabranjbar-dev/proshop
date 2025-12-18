"use client";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { IBaseField } from "./meta/types";

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
  onChange: inputOnchange,
  containerClassName,
  description,
  ...res
}: IBaseField) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required: required ? `${label} اجباری است` : false,
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
              {...res}
              {...field}
              value={field.value}
              checked={
                typeof field.value === "boolean" ? field.value : undefined
              }
              onChange={(value: any) => {
                inputOnchange?.(value);

                // اگر boolean بود (مثل Switch)
                if (typeof value === "boolean") {
                  field.onChange(value);
                } else {
                  field.onChange(value?.target?.value ?? value);
                }
              }}
              id={name}
              className={cn(
                "disabled:cursor-not-allowed disabled:select-none",
                {
                  "border-red-500": formState.errors[name],
                },
                className
              )}
              disabled={Boolean(disabled || loading)}
              loading={loading}
              label={label}
            />
            {!!description && (
              <span className="text-xs text-primary">{description}</span>
            )}
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
