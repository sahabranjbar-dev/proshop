"use client";
import { Menu } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginButton from "../LoginButton/LoginButton";
import { Skeleton } from "../ui/skeleton";
import Logo from "../Logo/Logo";
import HeaderSearchInput from "../HeaderSearchInput/HeaderSearchInput";

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
      <div className="container mx-auto shadow rounded-lg mt-1 px-4 py-4 flex justify-between items-center">
        <Logo />

        <HeaderSearchInput />

        <div className="hidden md:flex justify-center items-center gap-2 min-w-[10%] ">
          <CartButtonContainer />
          <div>
            <LoginButton />
          </div>
        </div>

        <button className="md:hidden text-gray-600 p-2 rounded-full hover:bg-gray-100 transition duration-150">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
