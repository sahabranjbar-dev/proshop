import Image from "next/image";
import React from "react";

const EmptyCart = () => {
  return (
    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-white shadow-sm flex justify-center items-center">
      <div>
        <p className="text-2xl font-semibold text-center text-gray-600">
          سبد خرید شما خالی است.
        </p>
        <p className="text-md text-center text-gray-500 mt-2">
          محصولات مورد علاقه خود را اضافه کنید!
        </p>

        <Image src={"/svg/empty.svg"} alt="empty" width={480} height={480} />
      </div>
    </div>
  );
};

export default EmptyCart;
