"use client";
import BaseField from "@/components/BaseField/BaseField";
import Form from "@/components/Form/Form";
import FormButtons from "@/components/FormButtons/FormButtons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/FileUpload/FileUpload";

const ProductForm = ({ id }: any) => {
  const { replace } = useRouter();

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: any) => {
      const response = await api({
        method: id ? "PUT" : "POST",
        url: "/admin/products",
        data,
      });

      return response.data;
    },
    onError(error: AxiosError<{ error: string }>) {
      const errors = JSON.parse(error.response?.data.error ?? "") as {
        message: string;
      }[];

      errors.forEach((item) => {
        toast.error(item.message);
      });
    },
    onSuccess: (data: { product: any; success: boolean; message: string }) => {
      if (data.success) {
        toast.success(data.message);

        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
        if (id) return;
        replace(`/admin/products/${data.product.id}`);
      }
    },
  });

  const onSubmit = (data: any) => {
    mutateAsync({
      ...data,
    });
  };

  return (
    <Form className="grid grid-cols-3 gap-4" onSubmit={onSubmit}>
      <BaseField
        component={FileUpload}
        name="title"
        label="نام محصول"
        required
      />
      <FormButtons cancelUrl="" id="" submitLoading />
    </Form>
  );
};

export default ProductForm;
