import { ShieldAlert } from "lucide-react";
import React from "react";

interface Props {
  error?: any;
}

const ErrorPage = ({}: Props) => {
  return (
    <div className="flex-1 mt-60">
      <div className="flex justify-center items-center gap-2 h-full">
        <ShieldAlert className="text-red-500" />
        <h2 className="text-md text-red-500 text-center">
          مشکلی در دریافت محصولات رخ داده است.
        </h2>
      </div>
    </div>
  );
};

export default ErrorPage;
