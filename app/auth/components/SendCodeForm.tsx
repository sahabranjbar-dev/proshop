"use client";
import BaseField from "@/components/BaseField/BaseField";
import Form from "@/components/Form/Form";
import { Input } from "@/components/ui/input";
import { mobileValidation } from "@/utils/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, ShieldCheck } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useSendOtp } from "../hooks/useSendOtp";
import { LoginFormType } from "./LoginForm";

interface IFormValue {
  phone: string;
}

interface ISendCodeForm {
  setLoginFormType: Dispatch<SetStateAction<LoginFormType | null>>;
  setMobile: Dispatch<SetStateAction<string>>;
  mobile: string | null;
}

const SendCodeForm = ({
  setLoginFormType,
  setMobile,
  mobile,
}: ISendCodeForm) => {
  const sendOtp = useSendOtp();

  const { isPending, mutateAsync } = sendOtp;

  const handleSubmit = async (data: IFormValue) => {
    await mutateAsync(data.phone).then((data: any) => {
      if (data.success) {
        setLoginFormType("verify");
        setMobile(data.mobile);
      }
    });
  };

  return (
    <Form<IFormValue>
      onSubmit={handleSubmit}
      className="space-y-6"
      resolver={zodResolver(mobileValidation())}
      values={{
        phone: mobile ?? "",
      }}
    >
      {({ watch }) => {
        return (
          <>
            {/* هدر */}
            <div className="text-center mb-10">
              <p className="text-gray-500 text-sm leading-relaxed">
                لطفا شماره موبایل خود را وارد کنید
              </p>
            </div>

            {/* فیلد شماره موبایل */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                شماره موبایل
              </label>
              <BaseField
                component={Input}
                type="tel"
                name="phone"
                className="text-left w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                placeholder="09*********"
                required
                dir="ltr"
              />
            </div>

            {/* دکمه ارسال کد */}
            <button
              type="submit"
              disabled={!watch("phone") || isPending}
              className="w-full bg-blue-500  text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>در حال ارسال کد...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>ارسال کد تایید</span>
                </>
              )}
            </button>

            {/* اطلاعات اضافی */}
            <div className="text-center space-y-3">
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                <p className="text-xs text-blue-700 leading-relaxed flex justify-start items-center gap-2">
                  <ShieldCheck />
                  کد تایید به شماره وارد شده پیامک خواهد شد
                </p>
              </div>

              <p className="text-xs text-gray-400">
                با ادامه، موافقت می‌کنید با{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 underline transition-colors"
                >
                  شرایط استفاده
                </a>{" "}
                و{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 underline transition-colors"
                >
                  حریم خصوصی
                </a>
              </p>
            </div>
          </>
        );
      }}
    </Form>
  );
};

export default SendCodeForm;
