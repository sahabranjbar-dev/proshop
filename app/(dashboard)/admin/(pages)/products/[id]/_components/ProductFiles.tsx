import BaseField from "@/components/BaseField/BaseField";
import FileUpload from "@/components/FileUpload/FileUpload";
import React from "react";

const ProductFiles = () => {
  return (
    <div className="w-full">
      <BaseField component={FileUpload} name="files" multiple />
    </div>
  );
};

export default ProductFiles;
