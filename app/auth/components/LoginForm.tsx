"use client";

import { JSX, useState } from "react";
import SendCodeForm from "./SendCodeForm";
import VerifyCodeForm from "./VerifyCodeForm";
import { SignInResponse } from "next-auth/react";

export type LoginFormType = "sendCode" | "verify";

interface Props {
  onLoginSuccess?: (data: SignInResponse | undefined) => void;
}

const LoginForm = ({ onLoginSuccess }: Props): JSX.Element => {
  const [loginFormType, setLoginFormType] = useState<LoginFormType | null>(
    null
  );
  const [mobile, setMobile] = useState<string>("");

  return loginFormType === null || loginFormType === "sendCode" ? (
    <SendCodeForm
      setLoginFormType={setLoginFormType}
      setMobile={setMobile}
      mobile={mobile}
    />
  ) : (
    <VerifyCodeForm
      setLoginFormType={setLoginFormType}
      mobile={mobile}
      onLoginSuccess={onLoginSuccess}
    />
  );
};

export default LoginForm;
