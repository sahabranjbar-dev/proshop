"use client";
import { Modal } from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import CarModelForm from "./CarModelForm";

const CarModelCreateButton = () => {
  const [openModelModal, setOpenModelModal] = useState<boolean>(false);

  const closeModal = () => {
    setOpenModelModal(false);
  };
  return (
    <div>
      <Button
        onClick={() => {
          setOpenModelModal(true);
        }}
        tooltip="ایجاد مدل خودرو"
      >
        <Plus />
      </Button>

      <Modal
        title="مدل خودرو"
        hideActions
        onOpenChange={setOpenModelModal}
        open={openModelModal}
      >
        <CarModelForm
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

export default CarModelCreateButton;
