"use client";
import ActionsButtons from "@/components/ActionsButtons/ActionsButtons";
import BrandForm from "./BrandForm";

const BrandActionButton = ({ id }: { id: string }) => {
  return (
    <ActionsButtons
      id={id}
      editForm={({ onCancel, initialData }) =>
        BrandForm({ id, onCancel, initialData })
      }
      title="برند"
      url="/admin/brands"
      queryKey="brand"
    />
  );
};

export default BrandActionButton;
