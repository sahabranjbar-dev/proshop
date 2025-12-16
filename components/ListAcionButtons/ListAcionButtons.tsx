"use client";
import { SquarePen, Trash2 } from "lucide-react";
import { IListAcionButtons } from "./meta/types";
import Link from "next/link";
import { Modal } from "../Modal/Modal";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useList } from "@/container/ListContainer/ListContainer";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

function ListAcionButtons({
  editHref,
  deleteUrl,
  id,
  modalContent = "پس از حذف امکان بازیابی وجود ندارد.",
}: IListAcionButtons) {
  const session = useSession();

  const userId = session.data?.user?.id;

  const { fetch } = useList();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const response = await api.delete(deleteUrl, {
        params: {
          id,
        },
      });
      return response.data;
    },
    onError(error: AxiosError<{ error: string }>) {
      const message = error.response?.data.error;
      toast.error(message);
    },
    onSuccess: (data: { success: boolean; message: string }) => {
      if (!data.success) return;
      toast.success(data.message || "آیتم با موفقیت حذف شد");
      fetch();
    },
  });

  const showDelete = userId !== id;

  return (
    <div className="flex justify-start items-center gap-2">
      <Link href={editHref}>
        <SquarePen
          className="cursor-pointer hover:bg-gray-300 p-1 text-blue-500"
          size={30}
        />
      </Link>

      {showDelete && (
        <>
          <Trash2
            className="cursor-pointer hover:bg-gray-300 p-1 text-red-500"
            size={30}
            onClick={() => {
              setOpenDeleteModal(true);
            }}
          />
          <Modal
            open={openDeleteModal}
            onOpenChange={setOpenDeleteModal}
            actionLoading={isPending}
            title="آیا از حذف این آیتم مطمئن هستید؟"
            onAction={() => {
              mutateAsync();
            }}
          >
            {modalContent}
          </Modal>
        </>
      )}
    </div>
  );
}

export default ListAcionButtons;
