"use client";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="bg-white">
      <Image src={"/images/logo.png"} alt="logo" width={80} height={80} />
    </div>
  );
};

export default Logo;
