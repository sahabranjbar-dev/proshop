"use client";
import { useList } from "@/container/ListContainer/ListContainer";
import { api } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Edit, Loader2, Trash2 } from "lucide-react";
import { ReactElement, useState } from "react";
import { toast } from "sonner";
import { Modal } from "../Modal/Modal";

interface IActionsButtons<T = any> {
  editForm: (initialData: T) => ReactElement;
  title: string;
  id: string;
  url: string;
  queryKey: string;
}

const ActionsButtons = ({
  url,
  editForm: Form,
  title,
  queryKey,
  id,
}: IActionsButtons) => {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const { fetch } = useList();

  const { data: initialData, isLoading } = useQuery({
    queryKey: [queryKey, id],
    queryFn: async () => {
      const response = await api.get(url + `/${id}`);
      return response.data;
    },
    enabled: editModal,
  });

  const onEditClick = () => {
    setEditModal(true);
  };
  const onDeleteClick = () => {
    setDeleteModal(true);
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const response = await api.delete(url, {
        params: {
          id,
        },
      });
      return response.data;
    },
    onError(error: AxiosError<{ message: string }>) {
      const message = error.response?.data.message;
      toast.error(message);
    },
    onSuccess: (data: { success: boolean; message: string }) => {
      if (!data.success) return;
      toast.success(data.message || "آیتم با موفقیت حذف شد");
      fetch();
    },
  });
  const onDeleteHandler = async () => {
    await mutateAsync();
    setDeleteModal(false);
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <Edit
        className="cursor-pointer text-blue-500 hover:bg-blue-100 rounded p-2"
        size={40}
        onClick={onEditClick}
      />
      <Modal
        title={title}
        hideActions
        onOpenChange={setEditModal}
        open={editModal}
      >
        {isLoading ? (
          <div className="p-4 flex justify-center items-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <Form
            initialData={initialData}
            onCancel={() => setEditModal(false)}
          />
        )}
      </Modal>

      <Trash2
        className="cursor-pointer text-red-500 hover:bg-red-100 rounded p-2"
        size={40}
        onClick={onDeleteClick}
      />
      <Modal
        onOpenChange={setDeleteModal}
        open={deleteModal}
        title={title || "حذف آیتم"}
        actionLabel="حذف"
        onAction={onDeleteHandler}
        actionLoading={isPending}
        hideActions
      >
        <div>{`آیا از حذف این ${title || "آیتم"} اطمینان دارید؟`}</div>
      </Modal>
    </div>
  );
};

export default ActionsButtons;
