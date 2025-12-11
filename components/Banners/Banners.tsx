import Image from "next/image";
import React from "react";

interface Props {
  images?: { src: string; alt: string }[];
}

const Banners = ({ images }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center w-full">
      {images?.map(({ alt, src }, index) => (
        <div key={index} className="relative w-full h-32 md:h-40 lg:h-60">
          <Image
            alt={alt}
            src={src}
            fill
            className="object-contain contain-content rounded-md"
          />
        </div>
      ))}
    </div>
  );
};

export default Banners;
