import { Button } from "@/components/ui/button";
import clsx from "clsx";
import React from "react";
import { IResendCode } from "../meta/types";
import { FilePenLine, MessageSquareText } from "lucide-react";
import { useTimer } from "@/hooks/useTimer";
import { useSendOtp } from "../hooks/useSendOtp";

const ResendCode = ({
  setLoginFormType,
  mobile,
  resetOtpInputs,
}: IResendCode) => {
  const { isFinished, minutes, seconds, reset: resetTimer } = useTimer();
  const { mutateAsync } = useSendOtp();
  const resendCodeHandler = () => {
    if (!isFinished) return;
    mutateAsync(mobile);
    resetOtpInputs({
      otp: "",
    });
    resetTimer();
  };

  const changeNumberHandler = () => {
    if (!isFinished) return;
    setLoginFormType("sendCode");
  };
  return (
    <div className="mt-3">
      <div className="flex flex-col justify-start items-start gap-2">
        <div className="flex justify-start items-center gap-2">
          <Button
            type="button"
            variant={"link"}
            disabled={!isFinished}
            className={clsx(
              isFinished ? "text-blue-500" : "text-gray-500 cursor-not-allowed "
            )}
            onClick={resendCodeHandler}
            rightIcon={<MessageSquareText />}
          >
            ارسال مجدد کد
          </Button>

          {!isFinished && (
            <span className="text-neutral-700">
              ({minutes}:{seconds})
            </span>
          )}
        </div>

        <Button
          type="button"
          variant={"link"}
          disabled={!isFinished}
          className={clsx(
            isFinished ? "text-blue-500" : "text-gray-500 cursor-not-allowed "
          )}
          onClick={changeNumberHandler}
          rightIcon={<FilePenLine />}
        >
          ویرایش شماره موبایل
        </Button>
      </div>
    </div>
  );
};

export default ResendCode;
