"use client";
import { Modal } from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import CategoryForm from "./CategoryForm";
import { useQueryClient } from "@tanstack/react-query";

const CategoryCreateButton = () => {
  const queryClient = useQueryClient();
  const [openCategoryModal, setOpenCategoryModal] = useState<boolean>(false);
  return (
    <>
      <Button
        onClick={() => {
          setOpenCategoryModal(true);
        }}
        tooltip="ایجاد دسته‌بندی"
      >
        <Plus />
      </Button>

      <Modal
        hideActions
        onOpenChange={setOpenCategoryModal}
        open={openCategoryModal}
        title="دسته‌بندی"
      >
        <CategoryForm
          onSuccess={() => {
            setOpenCategoryModal(false);
            queryClient.invalidateQueries({
              queryKey: ["categories", "admin"],
            });
          }}
          onCancel={() => {
            setOpenCategoryModal(false);
          }}
        />
      </Modal>
    </>
  );
};

export default CategoryCreateButton;
