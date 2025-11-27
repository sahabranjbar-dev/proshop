"use client";
import { Menu } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginButton from "../LoginButton/LoginButton";
import { Skeleton } from "../ui/skeleton";

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
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* ۱. لوگو و نام فروشگاه */}
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition duration-150"
          >
            فروشگاه
          </Link>

          {/* ۲. ناوبری اصلی (فقط در صفحات بزرگ) */}
          <nav className="hidden md:flex space-x-6 text-gray-600 font-medium">
            <Link href="/products" className="hover:text-indigo-600">
              محصولات
            </Link>
            <Link href="/categories" className="hover:text-indigo-600">
              دسته‌بندی‌ها
            </Link>
            <Link href="/contact" className="hover:text-indigo-600">
              تماس با ما
            </Link>
          </nav>
        </div>

        {/* ۳. دکمه‌های کنترلی (Account, Cart, Menu) */}
        <div className="flex items-center justify-start space-x-4">
          {/* دکمه حساب کاربری / ورود */}
          <LoginButton />

          {/* دکمه سبد خرید */}
          <CartButtonContainer />

          {/* دکمه منوی همبرگری (فقط در صفحات کوچک) */}
          <button className="md:hidden text-gray-600 p-2 rounded-full hover:bg-gray-100 transition duration-150">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
