import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({
  className,
  maxLength = 500,
  onChange,
  value,
  ...props
}: React.ComponentProps<"textarea">) {
  const [length, setLength] = React.useState(value?.toString().length ?? 0);

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLength(event.target.value.length);
    onChange?.(event);
  };
  return (
    <>
      <textarea
        data-slot="textarea"
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        maxLength={maxLength}
        onChange={onChangeHandler}
        value={value ?? ""}
        {...props}
      />

      <span className="text-xs text-gray-500">{`${maxLength}/${length}`}</span>
    </>
  );
}

export { Textarea };
