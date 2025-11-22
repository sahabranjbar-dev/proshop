"use client";

import {
  FormProvider,
  useForm,
  UseFormProps,
  FieldValues,
} from "react-hook-form";
import { IForm } from "./meta/types";

const Form = <T extends FieldValues = FieldValues>({
  children,
  onSubmit,
  className,
  // اینا رو اضافه کردیم
  defaultValues,
  resolver,
  mode = "onBlur",
  reValidateMode = "onChange",
  ...restUseFormOptions
}: IForm<T> & UseFormProps<T>) => {
  const methods = useForm<T>({
    defaultValues,
    resolver,
    mode,
    reValidateMode,
    ...restUseFormOptions,
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={className}
        noValidate // مهم! تا مرورگر اعتبارسنجی خودش رو نشون نده
      >
        {typeof children === "function" ? children(methods) : children}
      </form>
    </FormProvider>
  );
};

export default Form;
