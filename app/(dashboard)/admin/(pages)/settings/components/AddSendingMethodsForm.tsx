"use client";
import BaseField from "@/components/BaseField/BaseField";
import Form from "@/components/Form/Form";
import FormButtons from "@/components/FormButtons/FormButtons";
import { TextCore } from "@/components/TextCore/TextCore";
import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DefaultValues } from "react-hook-form";
import { toast } from "sonner";

interface IFormValues {
  id?: string;
  farsiTitle: string;
  englishTitle: string;
  baseCost: string | number;
}

interface Props<TFieldValues = IFormValues> {
  onCancel?: () => void;
  closeModal?: () => void;
  defaultValues?: DefaultValues<TFieldValues>;
}

const AddSendingMethodsForm = ({
  onCancel,
  closeModal,
  defaultValues,
}: Props) => {
  const id = defaultValues?.id;
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (data: IFormValues) => {
      const result = await api("/admin/setting/sending-method", {
        method: !!id ? "put" : "post",
        data,
        params: {
          id,
        },
      });
      return result.data;
    },
    onSuccess(data) {
      if (!data?.success) return;
      closeModal?.();
      queryClient.invalidateQueries({
        queryKey: ["sending-methods"],
      });
    },
    onError(error: AxiosError<{ error: string }>) {
      toast.error(error.response?.data.error);
    },
  });
  const onSubmit = ({ baseCost, englishTitle, farsiTitle }: IFormValues) => {
    mutateAsync({
      baseCost: Number(baseCost),
      englishTitle,
      farsiTitle,
    });
  };
  return (
    <div className="max-h-[94vh]">
      <Form<IFormValues>
        className="space-y-4"
        onSubmit={onSubmit}
        defaultValues={defaultValues}
      >
        <BaseField
          component={TextCore}
          name="farsiTitle"
          label="نام فارسی روش ارسال"
          required
        />
        <BaseField
          component={TextCore}
          name="englishTitle"
          label="نام انگلیسی روش ارسال"
          required
        />

        <BaseField
          component={TextCore}
          name="baseCost"
          label="هزینه ارسال (تومان)"
          required
          number
          formatter
        />

        <FormButtons
          onCancel={() => {
            onCancel?.();
            closeModal?.();
          }}
        />
      </Form>
    </div>
  );
};

export default AddSendingMethodsForm;
