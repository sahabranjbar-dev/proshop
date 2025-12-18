import ActionsButtons from "@/components/ActionsButtons/ActionsButtons";
import React from "react";
import CategoryForm from "./CategoryForm";

const CategoryActionButtons = ({ id }: { id: string }) => {
  return (
    <ActionsButtons
      id={id}
      editForm={({ onCancel, initialData, onSuccess }) =>
        CategoryForm({ id, onCancel, initialData, onSuccess })
      }
      title="دسته‌بندی"
      url="/admin/category"
      queryKey={["categories", "admin"]}
    />
  );
};

export default CategoryActionButtons;
