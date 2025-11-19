"use client";

import EmailInput from "@/components/EmailInput/EmailInput";
import Form from "@/components/Form/Form";
import SearchInput from "@/components/SearchInput/SearchInput";
import { Input } from "@/components/ui/input";

export default function Home() {
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <Form<{ firstname: string; lastname: string }> onSubmit={onSubmit}>
      {({ values }) => {
        console.log({ values });

        return (
          <div className="flex flex-col gap-4 p-8 max-w-fit">
            <SearchInput className="max-w-fit" />
            <EmailInput disabled />
            <Input placeholder="یک ورودی ساده" disabled />
          </div>
        );
      }}
    </Form>
  );
}
