import React, { PropsWithChildren } from "react";

interface Props {
  title: string;
}

const ProductCardContainer = ({
  children,
  title,
}: PropsWithChildren<Props>) => {
  return (
    <div className="md:flex justify-start items-center md:gap-2 p-2">
      <div className="bg-primary text-white md:h-[380px] min-w-44 flex flex-col justify-center items-center p-10 rounded-tr-[70px] md:rounded-br-2xl rounded-tl-2xl">
        <h2 className="font-semibold text-2xl text-wrap text-center">
          {title}
        </h2>
      </div>

      <div className="overflow-scroll md:border md:rounded p-2 bg-primary md:bg-white">
        {children}
      </div>
    </div>
  );
};

export default ProductCardContainer;
