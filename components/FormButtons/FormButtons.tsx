"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { IFormButtons } from "./meta/types";

const FormButtons = ({
  id,
  submitLoading,
  cancelUrl,
  submitLabel,
  onCancel,
}: IFormButtons) => {
  const { replace } = useRouter();
  return (
    <div className="flex justify-start items-center gap-2">
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
