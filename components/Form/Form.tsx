"use client";
import { FormProvider, useForm, FieldValues } from "react-hook-form";
import { IForm } from "./meta/types";

const Form = <T extends FieldValues = FieldValues>({
  children,
  onSubmit,
}: IForm<T>) => {
  const methods = useForm<T>();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {typeof children === "function"
          ? children({
              ...methods,
              values: methods.getValues(),
              reset: methods.reset,
              update: methods.setValue,
              formState: methods.formState,
            })
          : children}
      </form>
    </FormProvider>
  );
};

export default Form;
