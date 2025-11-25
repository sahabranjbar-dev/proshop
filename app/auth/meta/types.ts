import { Dispatch, SetStateAction } from "react";
import { LoginFormType } from "../components/LoginForm";
import { UseFormReset } from "react-hook-form";

export interface IResendCode {
  setLoginFormType: Dispatch<SetStateAction<LoginFormType>>;
  mobile: string;
  resetOtpInputs: UseFormReset<{ otp: string }>;
}
