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
import FileUpload from "@/components/FileUpload/FileUpload";
import Combobox from "@/components/Combobox/Combobox";
import Image from "next/image";

const ProductForm = ({ id, files, price, title }: IProductFormValues) => {
  const { replace } = useRouter();
  console.log({ files });

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

  const onUploaded = (publicUrl: string, fileId: string) => {
    console.log("in productForm", publicUrl, fileId);
  };
  const onSubmit = (data: IProductFormValues) => {
    console.log({ data });

    mutateAsync({
      price: +String(data.price).replace(/,/g, ""),
      title: data.title,
      id,
      files: data.files,
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
        files: files,
      }}
    >
      {({ getValues }) => {
        const files = getValues("files");
        return (
          <>
            <BaseField
              component={Input}
              name="title"
              label="نام محصول"
              required
            />
            <BaseField
              type="text"
              component={Input}
              name="price"
              label="قیمت محصول"
              required
              formatter
            />

            <BaseField
              type="text"
              component={Combobox}
              name="category"
              label="دسته‌بندی محصول"
            />

            <BaseField
              component={FileUpload}
              name="productImage"
              onUploaded={onUploaded}
            />

            {files.map((item) => (
              <div key={item?.id}>
                <Image
                  src={item?.url}
                  alt={`product-image-${item?.key}`}
                  width={100}
                  height={100}
                />
              </div>
            ))}
            <FormButtons cancelUrl="/admin/products" id={id} />
          </>
        );
      }}
    </Form>
  );
};

export default ProductForm;
