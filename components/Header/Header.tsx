"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginButton from "../LoginButton/LoginButton";
import { Skeleton } from "../ui/skeleton";
import Logo from "../Logo/Logo";
import HeaderSearchInput from "../HeaderSearchInput/HeaderSearchInput";
import Navbar from "../Navbar/Navbar";
import Menu from "../Menu/Menu";

const CartButtonContainer = dynamic(
  () => import("../CartButton/CartButtonContainer"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-8 w-8" />,
  }
);
const Header = () => {
  const pathname = usePathname();

  const isAuthenticated = true;

  if (
    pathname.startsWith("/auth") ||
    pathname.startsWith("/customer") ||
    pathname.startsWith("/admin")
  )
    return;
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="container mx-auto shadow rounded-lg px-10 py-2 ">
        <div className="flex justify-between items-center">
          <Logo />

          <HeaderSearchInput />

          <div className="hidden md:flex justify-center items-center gap-2 min-w-[10%] ">
            <CartButtonContainer />
            <div>
              <LoginButton />
            </div>
          </div>

          <Menu />
        </div>

        <nav className="mt-2 hidden md:block">
          <Navbar />
        </nav>
      </div>
    </header>
  );
};

export default Header;
