"use client";
import BaseField from "@/components/BaseField/BaseField";
import Form from "@/components/Form/Form";
import FormButtons from "@/components/FormButtons/FormButtons";
import SwitchContainer from "@/components/SwitchContainer/SwitchContainer";
import { TextCore } from "@/components/TextCore/TextCore";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface IForm {
  id?: string;
  farsiTitle: string;
  englishTitle: string;
  slug?: string;
  website?: string;
  description?: string;
  isActive?: boolean;
}

interface IBrandForm {
  id?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  initialData?: IForm;
}

const BrandForm = ({ id, onSuccess, onCancel, initialData }: IBrandForm) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: IForm) => {
      const response = await api({
        url: "/admin/brands",
        method: id ? "PUT" : "POST",
        params: { id },
        data,
      });

      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
      queryClient.invalidateQueries({
        queryKey: ["brand", id],
      });
    },
    onError: (
      error: AxiosError<{ error: string; errors: { message: string }[] }>
    ) => {
      if (error.response?.data.error) {
        toast.error(error.response.data.error);
      }
      const errors = error.response?.data.errors;

      errors?.forEach((err) => {
        toast.error(err.message);
      });
    },
  });
  const onSubmitHandler = async (data: IForm) => {
    await mutateAsync({
      ...data,
      website: data.website ?? "",
      description: data.description || "",
    });
  };
  return (
    <Form
      defaultValues={{
        ...initialData,
        description: initialData?.description || "",
        website: initialData?.website || "",
      }}
      onSubmit={onSubmitHandler}
      className="grid grid-cols-2 gap-2 p-4 m-2"
    >
      {({ setValue }) => {
        return (
          <>
            <BaseField
              component={TextCore}
              name="farsiTitle"
              label="نام فارسی برند"
              required
            />

            <BaseField
              component={TextCore}
              name="englishTitle"
              label="نام انگلیسی برند"
              required
              onChange={(value: string) => {
                const resolvedValue = value.replaceAll(" ", "-").toLowerCase();
                setValue("slug", resolvedValue);
              }}
            />

            <BaseField component={TextCore} name="slug" label="شعار برند" />
            <BaseField
              component={TextCore}
              name="website"
              label="وبسایت برند"
            />

            <BaseField
              component={Textarea}
              name="description"
              label="توضیحات برند"
              containerClassName="col-span-2"
            />

            <BaseField
              containerClassName="col-span-2"
              component={SwitchContainer}
              name="isActive"
              switchClassName="w-full"
            />

            <div className="col-start-2 mt-4">
              <FormButtons
                onCancel={onCancel}
                className="justify-end!"
                submitLoading={isPending}
              />
            </div>
          </>
        );
      }}
    </Form>
  );
};

export default BrandForm;
