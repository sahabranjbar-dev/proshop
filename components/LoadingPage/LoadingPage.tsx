"use client";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
}

const LoadingPage = ({ className }: Props) => {
  return (
    <div
      className={clsx(
        "flex justify-center items-center w-full h-screen",
        className
      )}
    >
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default LoadingPage;
