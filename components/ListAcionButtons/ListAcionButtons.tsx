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

function ListAcionButtons({ editHref, deleteUrl, id }: IListAcionButtons) {
  const { fetch } = useList();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const response = await api.delete(deleteUrl, {
        params: {
          id,
        },
      });
      return response.data;
    },
    onSuccess: (data: { success: boolean }) => {
      if (!data.success) return;
      toast.success("آیتم با موفقیت حذف شد");
      fetch();
    },
  });
  return (
    <div className="flex justify-center items-center gap-2">
      <Link href={editHref}>
        <SquarePen
          className="cursor-pointer hover:bg-gray-300 p-1 text-blue-500"
          size={30}
        />
      </Link>

      <Modal
        open={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal((prev) => !prev);
        }}
        title="آیا مطمئن هستید؟"
        modalTrigger={
          <Trash2
            className="cursor-pointer hover:bg-gray-300 p-1 text-red-500"
            size={30}
          />
        }
        onAction={() => {
          mutateAsync();
        }}
      >
        در صورت حذف آیتم دیگر قابل بازگشت نیست
      </Modal>
    </div>
  );
}

export default ListAcionButtons;
