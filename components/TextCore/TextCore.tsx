import * as React from "react";
import { cn } from "@/lib/utils";
import { convertToEnglishDigits } from "@/utils/common";
import { Input } from "../ui/input";

const formatNumberWithCommas = (value: string | number): string => {
  if (value === null || value === undefined || value === "") return "";

  const cleanValue = convertToEnglishDigits(String(value)).replace(/[٬,]/g, "");

  if (isNaN(Number(cleanValue))) return cleanValue;

  return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, "٬");
};

interface NumberInputProps {
  event: React.ChangeEvent<HTMLInputElement>;
  onChange: (value: number | undefined) => void;
}
const handleNumberInput = ({ event, onChange }: NumberInputProps) => {
  const rawValue = event.target.value;

  const cleanValue = convertToEnglishDigits(rawValue).replace(/[٬,]/g, "");

  if (cleanValue === "") {
    onChange(undefined);
    return;
  }

  const numberValue = Number(cleanValue);

  if (isNaN(numberValue)) {
    return;
  }

  onChange(numberValue);
};

interface BaseInputProps
  extends Omit<React.ComponentProps<"input">, "onChange" | "value"> {
  value?: string | number | null | undefined;
}

interface StandardInputProps extends BaseInputProps {
  number?: false;
  formatter?: false;
  onChange: (value: string) => void;
}

interface FormatterInputProps extends BaseInputProps {
  formatter: true;
  number?: false;
  onChange: (value: string) => void;
}

interface NumberOnlyInputProps extends BaseInputProps {
  number: true;
  formatter?: false;
  onChange: (value: number | undefined) => void;
}

type InputProps =
  | StandardInputProps
  | FormatterInputProps
  | NumberOnlyInputProps;

function TextCore({
  className,
  type,
  disabled,
  placeholder,
  formatter = false,
  number = false,
  onChange,
  value,
  ...props
}: InputProps) {
  const isNumberInput = number;
  const isFormatterInput = formatter;

  const displayValue = React.useMemo(() => {
    if (value === null || value === undefined) return "";

    if (isFormatterInput) {
      return formatNumberWithCommas(value);
    }

    return String(value);
  }, [value, isFormatterInput]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1. حالت عددی (خروجی: number | undefined)
    if (isNumberInput) {
      const rawValue = e.target.value;

      // اگر ورودی خالی باشد، مستقیماً رشته خالی را برگردان
      if (rawValue === "") {
        (onChange as (value: string) => void)("");
        return;
      }
      handleNumberInput({
        event: e,
        // چون number=true، خروجی در صورت پاک شدن کامل فیلد، undefined خواهد بود
        onChange: onChange as (value: number | undefined) => void,
      });
      return;
    }

    // 2. حالت فرمت‌بندی (خروجی: string تمیز شده)
    if (isFormatterInput) {
      const rawValue = e.target.value;

      // اگر ورودی خالی باشد، مستقیماً رشته خالی را برگردان
      if (rawValue === "") {
        (onChange as (value: string) => void)("");
        return;
      }

      // اگر خالی نیست، آن را تمیز کن
      const cleanValue = convertToEnglishDigits(rawValue).replace(/[٬,]/g, "");
      (onChange as (value: string) => void)(cleanValue);
      return;
    }

    // 3. حالت استاندارد (خروجی: string)
    (onChange as (value: string) => void)(e.target.value);
  };

  return (
    <div className="relative inline-block w-full">
      <Input
        {...props}
        data-slot="input"
        className={cn(className)}
        disabled={disabled}
        placeholder={disabled ? "" : placeholder}
        value={displayValue}
        onChange={handleChange}
        type={isNumberInput || isFormatterInput ? "text" : type}
      />
    </div>
  );
}

export { TextCore };
