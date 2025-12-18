"use client";
import { getSlug } from "@/app/api/admin/products/utils";
import BaseField from "@/components/BaseField/BaseField";
import Combobox from "@/components/Combobox/Combobox";
import Form from "@/components/Form/Form";
import FormButtons from "@/components/FormButtons/FormButtons";
import { TextCore } from "@/components/TextCore/TextCore";
import { Textarea } from "@/components/ui/textarea";
import ComboboxItemDataGetter from "@/container/ComboboxItemDataGetter/ComboboxItemDataGetter";
import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { toast } from "sonner";

interface Props {
  id?: string;
  onSuccess?: (data: any) => void;
  onCancel?: () => void;
  initialData?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    parentId: any;
    createdAt: string;
    updatedAt: string;
  };
}

interface IForm {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
}

const CategoryForm = ({ id, onCancel, onSuccess, initialData }: Props) => {
  const { mutateAsync } = useMutation({
    mutationFn: async (data: IForm) => {
      const response = await api({
        url: "/admin/category",
        method: id ? "PUT" : "POST",
        data,
        params: id ? { id } : undefined,
      });

      return response.data;
    },
    onSuccess: (data: { success: boolean; message: string }) => {
      console.log({ data });
      if (data?.success) {
        toast.success(data?.message);
        onSuccess?.(data);
      }
    },
    onError: (error: AxiosError<{ error: string; message: string }>) => {
      toast.error(error.response?.data.error ?? error.response?.data.message);
    },
  });
  const onSubmit = (data: IForm) => {
    console.log({ data });

    mutateAsync(data);
  };
  return (
    <Form defaultValues={initialData} onSubmit={onSubmit}>
      {({ setValue }) => {
        return (
          <>
            <BaseField
              component={TextCore}
              name="name"
              label="نام فارسی"
              required
              onChange={(value: string) => {
                setValue("slug", getSlug(value));
              }}
            />
            <BaseField component={TextCore} name="slug" label="slug" required />
            <BaseField
              component={Textarea}
              name="description"
              label="توضیحات"
            />

            <ComboboxItemDataGetter
              queryKey={["category-parent", "admin"]}
              url="/admin/category/category-parent"
            >
              <BaseField
                name="parentId"
                component={Combobox}
                label="دسته‌بندی والد"
              />
            </ComboboxItemDataGetter>

            <FormButtons
              onCancel={onCancel}
              className="justify-self-end mt-4"
            />
          </>
        );
      }}
    </Form>
  );
};

export default CategoryForm;
