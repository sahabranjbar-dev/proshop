"use client";
import BaseField from "@/components/BaseField/BaseField";
import Combobox from "@/components/Combobox/Combobox";
import FilterButtons from "@/components/FilterButtons/FilterButtons";
import Form from "@/components/Form/Form";
import { Input } from "@/components/ui/input";
import ComboboxItemDataGetter from "@/container/ComboboxItemDataGetter/ComboboxItemDataGetter";
import { useList } from "@/container/ListContainer/ListContainer";
import React from "react";

interface IFormValues {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  role?: string;
}

const getPureValue = (value: string | undefined) => (value ? value : undefined);

const UserListFilter = () => {
  const { setSearchParams } = useList();

  const onSubmit = (data: IFormValues) => {
    setSearchParams?.((prev: any) => ({
      ...prev,
      firstName: getPureValue(data.firstName),
      lastName: getPureValue(data.lastName),
      email: getPureValue(data?.email),
      phone: getPureValue(data.phone),
      role: data.role,
    }));
  };
  return (
    <Form<IFormValues> onSubmit={onSubmit} className="grid grid-cols-4 gap-2">
      <BaseField component={Input} label="نام" name="firstName" />
      <BaseField component={Input} label="نام خانوادگی" name="lastName" />
      <BaseField component={Input} label="موبایل" name="phone" />
      <BaseField component={Input} label="ایمیل" name="email" />

      <ComboboxItemDataGetter
        queryKey={["admin", "user-role"]}
        url="/admin/role"
      >
        <BaseField component={Combobox} name="role" label="نقش" />
      </ComboboxItemDataGetter>
      <FilterButtons />
    </Form>
  );
};

export default UserListFilter;
