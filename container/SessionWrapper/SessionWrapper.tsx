"use client";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

const SessionWrapper = ({
  children,
  session,
}: PropsWithChildren<{ session: any }>) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionWrapper;
