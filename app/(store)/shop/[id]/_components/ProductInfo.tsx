import React from "react";
import ProductImageGallery from "./ProductImageGallery";

interface Props {
  files: {
    id: string;
    url: string;
    altText?: string | null | undefined;
  }[];
}

const ProductInfo = ({ files }: Props) => {
  return (
    <div className="md:flex justify-start items-start gap-2">
      <ProductImageGallery files={files} />
      <div className="flex-1 border">
        <div>title</div>

        <div>for cars</div>

        <div>garranty info</div>
      </div>
    </div>
  );
};

export default ProductInfo;
