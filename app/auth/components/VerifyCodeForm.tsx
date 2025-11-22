import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useMutation } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Loader2, PenLine, RotateCcw, ShieldCheck } from "lucide-react";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoginFormType } from "./LoginForm";
import TimerToResendCode from "./TimerToResendCode";

interface IVerifyForm {
  setLoginFormType: Dispatch<SetStateAction<LoginFormType>>;
  mobile: string | null;
}

const VerifyCodeForm = ({ setLoginFormType, mobile }: IVerifyForm) => {
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (code: string) => {
      const response = await signIn("credentials", {
        redirect: false,
        code,
        phone: mobile,
      });
      return response;
    },
    mutationKey: ["verify-otp"],
    async onSuccess(data) {
      if (data?.ok) {
        const session = await getSession();
        toast("با موفقیت وارد شدید");
        if (session?.user.role === "ADMIN") {
          router.push("/admin");
        } else if (session?.user.role === "USER") {
          router.push("/customer");
        }
      } else {
        toast(data?.error);
      }
    },
  });

  const { control, handleSubmit, watch } = useForm<{ otp: string }>();

  const onSubmit = (data: { otp: string }) => {
    mutateAsync(data.otp);
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const otpValue = watch("otp");

  const changeNumberHandler = () => {
    setLoginFormType("sendCode");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          تایید شماره موبایل
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          کد تایید به شماره{" "}
          <span
            onClick={changeNumberHandler}
            className="text-blue-500 inline-flex justify-center items-center gap-1 group cursor-pointer hover:underline font-medium"
          >
            {mobile}
            <PenLine size={14} className="group-hover:inline transition-all" />
          </span>{" "}
          ارسال شد
        </p>
      </div>

      {/* فرم OTP */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <div className="flex justify-center">
                <InputOTP
                  dir="ltr"
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  {...field}
                >
                  <InputOTPGroup dir="ltr" className="flex">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            )}
          />

          {/* تایمر ارسال مجدد */}
          <div className="text-center">
            <TimerToResendCode seconds={120} mobile={mobile} />
          </div>
        </div>

        {/* دکمه تایید */}
        <button
          type="submit"
          disabled={isPending || !otpValue || otpValue.length !== 6}
          className="w-full bg-linear-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>در حال تایید...</span>
            </>
          ) : (
            <>
              <ShieldCheck size={18} />
              <span>تایید و ورود</span>
            </>
          )}
        </button>
      </form>

      {/* راهنما و اطلاعات */}
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-start gap-3">
            <RotateCcw className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
            <div className="text-right">
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>دریافت نکردید؟</strong> پس از اتمام تایمر می‌توانید
                درخواست ارسال مجدد کنید
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCodeForm;
