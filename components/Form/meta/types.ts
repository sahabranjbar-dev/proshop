import { SubmitHandler, UseFormReturn, FieldValues } from "react-hook-form";

export interface IForm<T extends FieldValues = FieldValues> {
  onSubmit: SubmitHandler<T>;
  children?:
    | React.ReactNode
    | ((
        methods: UseFormReturn<T> & {
          values: T;
          reset: UseFormReturn<T>["reset"];
          update: UseFormReturn<T>["setValue"];
          formState: UseFormReturn<T>["formState"];
        }
      ) => React.ReactNode);
}
