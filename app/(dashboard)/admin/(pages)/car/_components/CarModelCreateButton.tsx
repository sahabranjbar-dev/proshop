"use client";
import { Modal } from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const CarModelCreateButton = () => {
  const [openModelModal, setOpenModelModal] = useState<boolean>(false);
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
        salam
      </Modal>
    </div>
  );
};

export default CarModelCreateButton;
