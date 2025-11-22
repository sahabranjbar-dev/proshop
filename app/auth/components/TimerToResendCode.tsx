"use client";
import { Button } from "@/components/ui/button";
import { useMutation, useMutationState } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { ITimerToResendCode } from "../meta/types";
import { useSendOtp } from "../hooks/useSendOtp";

const TimerToResendCode = ({
  seconds: initialSeconds,
  mobile,
}: ITimerToResendCode) => {
  const [timer, setTimer] = useState(initialSeconds);
  const intervalRef = useRef<any>(null);

  const sendOtp = useSendOtp();

  useEffect(() => {
    if (timer <= 0) return;

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [timer]);

  const formatTime = (totalSeconds: number) => {
    if (totalSeconds <= 0) return "00:00";

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const resendCodeHandler = async () => {
    // Refetch the query using QueryClient API instead of calling refetch on the Query object
    sendOtp.mutateAsync(mobile ?? "");
    setTimer(initialSeconds);

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="mt-3 select-none">
      <div className="flex justify-start items-center gap-2">
        <Button
          variant={"link"}
          disabled={timer > 0}
          className={clsx(
            timer > 0 ? "text-gray-400 cursor-not-allowed " : "text-blue-500"
          )}
          onClick={resendCodeHandler}
        >
          ارسال مجدد کد
        </Button>

        {timer > 0 && (
          <span className="text-neutral-700">({formatTime(timer)})</span>
        )}
      </div>
    </div>
  );
};

export default TimerToResendCode;
