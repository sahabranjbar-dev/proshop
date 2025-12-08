"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface Props {
  className?: string;
  href?: string;
}

const Logo = ({ className, href = "/" }: Props) => {
  return (
    <Link href={href} className={clsx("bg-white", className)}>
      <Image src={"/images/logo.png"} alt="logo" width={80} height={80} />
    </Link>
  );
};

export default Logo;
