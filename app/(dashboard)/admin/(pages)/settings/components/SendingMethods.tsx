"use client";
import { Modal } from "@/components/Modal/Modal";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Package2, Plus } from "lucide-react";
import React, { useState } from "react";
import AddSendingMethodsForm from "./AddSendingMethodsForm";
import SendingMethodItem from "./SendingMethodItem";

interface sendingMethods {
  id: string;
  farsiTitle: string;
  englishTitle: string;
  baseCost: number;
  createdAt: string;
  updatedAt: string;
}

const SendingMethods = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { data, isLoading, isFetching, isError } = useQuery<{
    success: boolean;
    sendingMethods: sendingMethods[];
  }>({
    queryKey: ["sending-methods"],
    queryFn: async () => {
      const result = await api("/admin/setting/sending-method");

      return result.data;
    },
  });

  const loading = isLoading || isFetching;

  const addMethodHandler = () => {
    setOpenModal(true);
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">روش‌های ارسال</h2>
        <button
          onClick={addMethodHandler}
          className="group flex justify-center items-center gap-2 bg-blue-100 border border-blue-400 p-2 rounded-2xl text-blue-700 transition-all duration-300 hover:w-auto"
        >
          <span className="hidden group-hover:flex items-center group-hover:mr-2">
            ایجاد روش ارسال جدید
          </span>
          <Plus />
        </button>
      </div>
      <div className="m-2 p-4">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : isError ? (
          <div>
            <p className="text-red-500 text-center">خطایی رخ داده است</p>
          </div>
        ) : (
          <div>
            {data?.sendingMethods.length ? (
              data?.sendingMethods?.map(
                ({ baseCost, englishTitle, farsiTitle, id }) => {
                  return (
                    <SendingMethodItem
                      baseCost={baseCost}
                      englishTitle={englishTitle}
                      farsiTitle={farsiTitle}
                      key={id}
                      id={id}
                    />
                  );
                }
              )
            ) : (
              <div className="text-center flex justify-center items-center gap-2">
                <p className="text-gray-600">روش پرداختی تعریف نشده است</p>
                <Package2 className="text-gray-500" size={16} />
              </div>
            )}
          </div>
        )}
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

export default SendingMethods;
