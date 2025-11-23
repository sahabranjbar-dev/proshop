"use client";
import BaseField from "@/components/BaseField/BaseField";
import Form from "@/components/Form/Form";
import FormButtons from "@/components/FormButtons/FormButtons";
import { Input } from "@/components/ui/input";
import { IData, IProductFormValues } from "../meta/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ProductForm = ({ id, image, price, title }: IProductFormValues) => {
  const { replace } = useRouter();

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: IData) => {
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
    onSuccess: (data: {
      product: IProductFormValues;
      success: boolean;
      message: string;
    }) => {
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
  const onSubmit = (data: IProductFormValues) => {
    mutateAsync({
      price: +String(data.price).replace(/,/g, ""),
      title: data.title,
      id,
    });
  };
  return (
    <Form<IProductFormValues>
      className="grid grid-cols-3 gap-4"
      onSubmit={onSubmit}
      defaultValues={{
        id: id ?? "",
        title: title ?? "",
        price: price,
      }}
    >
      <BaseField component={Input} name="title" label="نام محصول" required />
      <BaseField
        type="text"
        component={Input}
        name="price"
        label="قیمت محصول"
        required
        formatter
      />

      <FormButtons cancelUrl="/admin/products" id={id} />
    </Form>
  );
};

export default ProductForm;
