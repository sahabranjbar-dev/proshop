"use client";
import { Modal } from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import CarBrandForm from "./CarBrandForm";

const CardBrandCreateButton = () => {
  const [openBrandModal, setOpenBrandModal] = useState<boolean>(false);

  const closeModal = () => {
    setOpenBrandModal(false);
  };
  return (
    <div>
      <Button
        onClick={() => {
          setOpenBrandModal(true);
        }}
        tooltip="ایجاد برند خودرو"
      >
        <Plus />
      </Button>

      <Modal
        title="برند خودرو"
        hideActions
        onOpenChange={setOpenBrandModal}
        open={openBrandModal}
      >
        <CarBrandForm
          onSuccess={() => {
            closeModal();
          }}
          onCancel={() => {
            closeModal();
          }}
        />
      </Modal>
    </div>
  );
};

export default CardBrandCreateButton;
