"use client";

import { JSX, useState } from "react";
import SendCodeForm from "./SendCodeForm";
import VerifyCodeForm from "./VerifyCodeForm";

export type LoginFormType = "sendCode" | "verify";

const LoginForm = (): JSX.Element => {
  const [loginFormType, setLoginFormType] = useState<LoginFormType>("sendCode");
  const [mobile, setMobile] = useState<string | null>(null);
  return loginFormType === "sendCode" ? (
    <SendCodeForm
      setLoginFormType={setLoginFormType}
      setMobile={setMobile}
      mobile={mobile}
    />
  ) : (
    <VerifyCodeForm setLoginFormType={setLoginFormType} mobile={mobile} />
  );
};

export default LoginForm;
