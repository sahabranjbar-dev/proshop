import { getSlug } from "@/app/api/admin/products/utils";
import BaseField from "@/components/BaseField/BaseField";
import Combobox from "@/components/Combobox/Combobox";
import Form from "@/components/Form/Form";
import FormButtons from "@/components/FormButtons/FormButtons";
import { TextCore } from "@/components/TextCore/TextCore";
import ComboboxItemDataGetter from "@/container/ComboboxItemDataGetter/ComboboxItemDataGetter";
import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

interface Props<T = any> {
  onSuccess?: (data: any) => void;
  onCancel?: () => void;
  initialData?: T;
}

interface IForm {
  id?: string;
  name: string;
  slug: string;
  year?: number;
  engineType?: string;
  carBrandId: string;
}

const CarModelForm = ({ initialData, onCancel, onSuccess }: Props<IForm>) => {
  const id = initialData?.id;
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: IForm) => {
      const res = await api({
        url: "/admin/car/car-model",
        method: id ? "PUT" : "POST",
        data,
      });

      return res.data;
    },
    onSuccess: (data: { message: string }) => {
      onSuccess?.(data);
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["car-model", id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const onSubmit = async (data: IForm) => {
    console.log({ data });
    await mutateAsync(data);
  };
  return (
    <div>
      <Form<IForm> onSubmit={onSubmit} defaultValues={initialData}>
        {({ setValue }) => (
          <>
            <BaseField
              name="name"
              component={TextCore}
              onChange={(value: string) => {
                setValue("slug", getSlug(value));
              }}
              label="نام مدل"
              required
            />
            <BaseField name="slug" component={TextCore} label="slug" required />
            <BaseField
              name="year"
              component={TextCore}
              label="سال تولید"
              number
            />
            <BaseField
              name="engineType"
              component={TextCore}
              label="نوع موتور"
            />

            <ComboboxItemDataGetter url="/admin/car/car-brand" queryKey={[]}>
              <BaseField
                name="carBrandId"
                component={Combobox}
                required
                label="برند خودرو"
                getLabel={(data: any) => {
                  return data?.name;
                }}
              />
            </ComboboxItemDataGetter>
            <FormButtons
              className="mt-4 justify-self-end"
              onCancel={onCancel}
            />
          </>
        )}
      </Form>
    </div>
  );
};

export default CarModelForm;
