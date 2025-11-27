"use client";
import { Menu, User } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

const CartButton = dynamic(() => import("../CartButton/CartButton"), {
  ssr: false,
  loading: () => <Skeleton className="h-8 w-8" />,
});
const Header = () => {
  // این مقادیر باید از state سراسری (مثل Redux, Zustand, یا Context) یا hookهای Next.js واکشی شوند

  const isAuthenticated = true; // مثال برای وضعیت ورود کاربر

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
          <Link
            href={isAuthenticated ? "/account/profile" : "/account/login"}
            className="text-gray-600 hover:text-indigo-600 relative p-2 rounded-full hover:bg-gray-100 transition duration-150"
          >
            <User size={20} />
            {/* در حالت ورود، شاید نام کوچک کاربر نمایش داده شود */}
          </Link>

          {/* دکمه سبد خرید */}
          <CartButton />

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
