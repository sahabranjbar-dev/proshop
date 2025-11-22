"use client";
import BaseField from "@/components/BaseField/BaseField";
import Form from "@/components/Form/Form";
import FormButtons from "@/components/FormButtons/FormButtons";
import { IData, IFormValues } from "../meta/type";
import { Input } from "@/components/ui/input";
import ComboboxItemDataGetter from "@/container/ComboboxItemDataGetter/ComboboxItemDataGetter";
import Combobox from "@/components/Combobox/Combobox";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";

const UserForm = ({
  id,
  email,
  firstName,
  lastName,
  phone,
  role,
}: IFormValues) => {
  const { mutateAsync } = useMutation({
    mutationFn: async (data: IData) => {
      const response = await api({
        method: "PUT",
        url: "/admin/users",
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
      user: IFormValues;
      success: boolean;
      message: string;
    }) => {
      if (data.success) toast.success(data.message);
    },
  });
  const onSubmit = (data: IFormValues) => {
    mutateAsync(data);
  };
  return (
    <Form<IFormValues>
      className="grid grid-cols-3 gap-4"
      onSubmit={onSubmit}
      defaultValues={{
        id: id ?? "",
        email: email ?? "",
        firstName: firstName ?? "",
        lastName: lastName ?? "",
        phone: phone ?? "",
        role: role ?? "",
      }}
    >
      <BaseField component={Input} name="firstName" label="نام" />
      <BaseField component={Input} name="lastName" label="نام خانوادگی" />
      <BaseField component={Input} name="email" label="ایمیل" />
      <BaseField component={Input} name="phone" label="موبایل" required />
      <ComboboxItemDataGetter queryKey={["user", "role"]} url="/admin/role">
        <BaseField
          component={Combobox}
          name="role"
          label="نقش"
          required
          className="min-w-full"
        />
      </ComboboxItemDataGetter>
      <FormButtons cancelUrl="/admin/users" id={id} />
    </Form>
  );
};

export default UserForm;
