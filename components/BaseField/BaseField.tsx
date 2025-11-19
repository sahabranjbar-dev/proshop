import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { IBaseField } from "./meta/types";
import { cn } from "@/lib/utils";

const BaseField = ({
  name,
  label,
  required,
  validate,
  loading,
  disabled,
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
          <div>
            <label htmlFor={name}>
              {label} {required && <span className=" text-red-500">{"*"}</span>}
            </label>
            <Input
              {...field}
              {...res}
              id={name}
              className={cn("border", {
                "border-red-500": formState.errors[name],
              })}
              disabled={
                (typeof disabled === "boolean"
                  ? disabled
                  : Boolean(disabled)) || loading
              }
              data-loading={loading ? true : false}
            />
            <span className="text-red-500 text-xs">
              {formState.errors[name]?.message as string}
            </span>
          </div>
        );
      }}
    />
  );
};

export default BaseField;
