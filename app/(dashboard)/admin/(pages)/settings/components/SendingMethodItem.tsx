"use client";
import { Modal } from "@/components/Modal/Modal";
import { Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import AddSendingMethodsForm from "./AddSendingMethodsForm";
import DeleteConfirm from "@/components/DeleteConfirm/DeleteConfirm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";

interface Props {
  id: string;
  farsiTitle: string;
  englishTitle: string;
  baseCost: number;
}

const SendingMethodItem = ({
  baseCost,
  englishTitle,
  farsiTitle,
  id,
}: Props) => {
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { mutateAsync: deleteMethod } = useMutation({
    mutationFn: async () => {
      const result = await api.delete("/admin/setting/sending-method", {
        params: {
          id,
        },
      });

      return result.data;
    },
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["sending-methods"] });
    },
  });

  return (
    <div className="flex justify-between items-center border m-2 p-2 rounded shadow hover:bg-blue-50">
      <div className="m-2">
        <div>
          <span className="text-lg">{farsiTitle}</span>
        </div>
        <div>
          <span className="text-xs text-gray-500">
            {Number(baseCost).toLocaleString("fa")} تومان
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setOpenModal(true);
          }}
          className="hover:text-blue-500 text-gray-500"
        >
          <Edit size={20} />
        </button>
        <DeleteConfirm
          onConfirm={() => {
            deleteMethod();
          }}
        />
      </div>

      <Modal
        onClose={() => {
          setOpenModal(false);
        }}
        open={openModal}
        hideActions
        title="روش ارسال"
      >
        <AddSendingMethodsForm
          defaultValues={{
            baseCost,
            englishTitle,
            farsiTitle,
            id,
          }}
          onCancel={() => {
            setOpenModal(false);
          }}
          closeModal={() => {
            setOpenModal(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default SendingMethodItem;
