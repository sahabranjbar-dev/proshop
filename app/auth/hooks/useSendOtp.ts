import { authApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export function useSendOtp() {
  return useMutation({
    mutationKey: ["send-otp"],
    mutationFn: async (phone: string) => {
      const response = await authApi.post("/send-otp", { phone });
      return response.data;
    },
  });
}
