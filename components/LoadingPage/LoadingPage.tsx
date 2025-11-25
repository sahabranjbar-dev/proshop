import { Loader2 } from "lucide-react";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default LoadingPage;
