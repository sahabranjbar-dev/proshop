import * as React from "react";

import { cn } from "@/lib/utils";
import { ShieldAlert } from "lucide-react";
import { formatPrice, unFormatPrice } from "@/utils/common";

function Input({
  className,
  type,
  disabled,
  placeholder,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <div className="relative inline-block w-full">
      <input
        {...props}
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-200 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "placeholder:select-none",
          className
        )}
        disabled={disabled}
        placeholder={disabled ? "" : placeholder}
      />

      {disabled && (
        <div className="absolute left-0 top-0 cursor-not-allowed">
          <div className="flex items-center gap-1">
            <ShieldAlert className="text-gray-400" />
            <span className="text-wrap text-xs max-w-8 select-none text-neutral-400">
              غیر فعال
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export { Input };
