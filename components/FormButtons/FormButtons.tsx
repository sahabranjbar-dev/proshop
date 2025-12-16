"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { IFormButtons } from "./meta/types";
import clsx from "clsx";

const FormButtons = ({
  id,
  submitLoading,
  cancelUrl,
  submitLabel,
  onCancel,
  className,
}: IFormButtons) => {
  const { replace } = useRouter();
  return (
    <div className={clsx("flex justify-start items-center gap-2", className)}>
      <Button type="submit" loading={submitLoading}>
        {submitLabel ?? (id ? "ویرایش" : "ثبت")}
      </Button>
      <Button
        type="button"
        onClick={() => {
          if (cancelUrl) {
            replace(cancelUrl);
          }
          onCancel?.();
        }}
        variant={"destructive"}
      >
        انصراف
      </Button>
    </div>
  );
};

export default FormButtons;
