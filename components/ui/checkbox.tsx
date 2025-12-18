"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

function Checkbox({
  className,
  text,
  name,
  onChange,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  text?: string;
  name: string;
  onChange?: (value: boolean) => void;
}) {
  return (
    <div className="flex justify-between items-center w-full rounded-2xl flex-row-reverse p-4 border">
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        className={cn(
          "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        name={name}
        onCheckedChange={onChange}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="grid place-content-center text-current transition-none"
        >
          <CheckIcon className="size-3.5" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <Label className="flex-1 cursor-pointer p-2" htmlFor={name}>
        {text}
      </Label>
    </div>
  );
}

export { Checkbox };
