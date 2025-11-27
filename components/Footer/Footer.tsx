"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();
  if (
    pathname.startsWith("/auth") ||
    pathname.startsWith("/customer") ||
    pathname.startsWith("/admin")
  )
    return;
  return <div>Footer</div>;
};

export default Footer;
