import { getSlug } from "@/app/api/admin/products/utils";
import BaseField from "@/components/BaseField/BaseField";
import Form from "@/components/Form/Form";
import FormButtons from "@/components/FormButtons/FormButtons";
import { TextCore } from "@/components/TextCore/TextCore";
import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
interface IForm {
  name: string;
  slug: string;
  id?: string;
}

interface Props {
  initialData?: IForm;
  onSuccess?: (data: any) => void;
  onCancel?: () => void;
}
const CarBrandForm = ({ initialData, onSuccess, onCancel }: Props) => {
  const id = initialData?.id;

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (data: IForm) => {
      const res = await api({
        url: id ? `/admin/car/car-brand/${id}` : "/admin/car/car-brand",
        method: id ? "PUT" : "POST",
        data,
      });

      return res.data;
    },
    onSuccess: (data: { message: string }) => {
      onSuccess?.(data);
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["car-brand", id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: IForm) => {
    await mutateAsync(data);
  };
  return (
    <>
      <Form<IForm> onSubmit={onSubmit} defaultValues={initialData}>
        {({ setValue }) => {
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <BaseField
                name="name"
                component={TextCore}
                label="نام"
                onChange={(value: string) => {
                  setValue("slug", getSlug(value));
                }}
                required
              />

              <BaseField
                name="slug"
                component={TextCore}
                label="slug"
                required
              />
              <FormButtons
                className="col-span-2 justify-self-end"
                onCancel={onCancel}
              />
            </div>
          );
        }}
      </Form>
    </>
  );
};

export default CarBrandForm;
