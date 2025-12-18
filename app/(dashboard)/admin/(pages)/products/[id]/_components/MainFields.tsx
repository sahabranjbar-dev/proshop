"use client";
import { getSlug } from "@/app/api/admin/products/utils";
import BaseField from "@/components/BaseField/BaseField";
import { TextCore } from "@/components/TextCore/TextCore";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

const MainFields = () => {
  const { setValue } = useFormContext();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <BaseField
        name="title"
        component={TextCore}
        required
        label="عنوان فارسی محصول (نمایش به کاربر)"
        onChange={(value: string) => {
          setValue("slug", getSlug(value));
        }}
        maxLength={100}
      />

      <BaseField name="slug" component={TextCore} label="slug" required />
      <BaseField
        name="description"
        component={Textarea}
        label="توضیحات کوتاه"
        required
        containerClassName="lg:col-span-2"
      />
      <BaseField
        name="content"
        component={Textarea}
        label="توضیحات کامل"
        required
        maxLength={10_000}
        containerClassName="lg:col-span-2"
      />
    </div>
  );
};

export default MainFields;
