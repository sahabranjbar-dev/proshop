import { authApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function useSendOtp() {
  return useMutation({
    mutationKey: ["send-otp"],
    mutationFn: async (phone: string) => {
      const response = await authApi.post("/send-otp", { phone });
      return response.data;
    },
    onError: (error: AxiosError<{ error: string }>) => {
      console.log({ error });
      toast.error(error.response?.data.error);
    },
  });
}
