"use client";
import { Modal } from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import BrandForm from "./BrandForm";

const BrandsCreateButton = () => {
  const [openBrandModal, setOpenBrandModal] = useState<boolean>(false);
  return (
    <>
      <Button
        onClick={() => {
          setOpenBrandModal(true);
        }}
        tooltip="ایجاد برند"
      >
        <Plus />
      </Button>

      <Modal
        hideActions
        onOpenChange={setOpenBrandModal}
        open={openBrandModal}
        title="برند"
      >
        <BrandForm
          onSuccess={() => {
            setOpenBrandModal(false);
          }}
          onCancel={() => {
            setOpenBrandModal(false);
          }}
        />
      </Modal>
    </>
  );
};

export default BrandsCreateButton;
