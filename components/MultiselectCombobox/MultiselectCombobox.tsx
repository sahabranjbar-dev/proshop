import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { ReactElement } from "react";
import { useFormContext } from "react-hook-form";

interface Props<T = any> {
  data?: T;
  loading?: boolean;
  error?: any;
  refetch?: () => void;
  keyField?: string;
  options?: { farsiTitle: string; englishTitle: string; id: string }[];
  onChange?: (value: string[]) => void;
  label: string;
  name: string;
}

const MultiselectCombobox = ({
  data,
  error,
  loading,
  options,
  keyField = "id",
  label,
  name,
  onChange,
  ...res
}: Props<{
  resultList: { farsiTitle: string; englishTitle: string; id: string }[];
}>) => {
  const { getFieldState } = useFormContext();
  const { invalid } = getFieldState(name);
  const resolvedOptions = options?.length ? options : data?.resultList;

  const LoadingCompo: ReactElement = (
    <div>
      <Loader2 className="animate-spin" />
    </div>
  );
  const ErrorCompo: ReactElement = (
    <div>
      <p>خطایی رخ داده است</p>
    </div>
  );
  const DataCompo: ReactElement = (
    <div>
      {resolvedOptions?.map(({ id, englishTitle, farsiTitle }) => (
        <MultiSelectItem
          key={keyField === "id" ? id : englishTitle}
          value={keyField === "id" ? id : englishTitle}
        >
          {farsiTitle}
        </MultiSelectItem>
      ))}
    </div>
  );
  const EmptyDataCompo: ReactElement = (
    <div>
      <p>داده‌ای وجود ندارد</p>
    </div>
  );

  const SelectItemCompo = loading
    ? LoadingCompo
    : error
    ? ErrorCompo
    : resolvedOptions?.length
    ? DataCompo
    : EmptyDataCompo;

  return (
    <MultiSelect {...res} onValuesChange={onChange}>
      <MultiSelectTrigger
        name={name}
        className={clsx("w-full", { "border-red-500": invalid })}
      >
        <MultiSelectValue placeholder={`${label} را انتخاب کنید...`} />
      </MultiSelectTrigger>
      <MultiSelectContent>
        <MultiSelectGroup>{SelectItemCompo}</MultiSelectGroup>
      </MultiSelectContent>
    </MultiSelect>
  );
};

export default MultiselectCombobox;
