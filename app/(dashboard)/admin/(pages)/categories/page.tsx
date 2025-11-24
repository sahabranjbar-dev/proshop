"use client";
import BaseField from "@/components/BaseField/BaseField";
import FileUpload from "@/components/FileUpload/FileUpload";
import Form from "@/components/Form/Form";
import FormButtons from "@/components/FormButtons/FormButtons";

const CategoriesPage = () => {
  const onUploaded = (publicUrl: string, fileId: string) => {};
  const onSubmit = (data: any) => {};

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <BaseField
          component={FileUpload}
          name="my-file"
          onUploaded={onUploaded}
        />

        <FormButtons cancelUrl="" />
      </Form>
    </div>
  );
};

export default CategoriesPage;
