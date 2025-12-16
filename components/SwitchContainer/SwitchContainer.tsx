"use client";
import clsx from "clsx";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

interface ISwitchContainer {
  name: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
  switchClassName?: string;
}

const SwitchContainer = ({
  name,
  value,
  onChange,
  className,
  switchClassName,
}: ISwitchContainer) => {
  return (
    <div
      className={clsx(
        "p-4 rounded flex justify-between items-center border",
        switchClassName
      )}
    >
      <Label htmlFor={name} className="flex-1 cursor-pointer p-2">
        {value ? "فعال" : "غیرفعال"}
      </Label>

      <Switch
        id={name}
        name={name}
        checked={value}
        onCheckedChange={onChange}
        className={className}
        dir="ltr"
      />
    </div>
  );
};

export default SwitchContainer;
