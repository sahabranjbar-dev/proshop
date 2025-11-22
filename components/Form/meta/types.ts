import { SubmitHandler, UseFormReturn, FieldValues } from "react-hook-form";

export interface IForm<T extends FieldValues = FieldValues> {
  onSubmit: SubmitHandler<T>;
  children?: React.ReactNode | ((methods: UseFormReturn<T>) => React.ReactNode);
  className?: string;
}
