"use client";

import React, { useState } from "react";
import {
  Menu as MenuIcon,
  Home,
  ShoppingBag,
  TrendingUp,
  Tag,
  Layers,
  BookOpen,
  Info,
  Phone,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginButton from "../LoginButton/LoginButton";

// محتوای منو
const menuContent = [
  { id: 1, title: "خانه", url: "/", icon: <Home size={20} /> },
  { id: 2, title: "فروشگاه", url: "/shop", icon: <ShoppingBag size={20} /> },
  {
    id: 3,
    title: "پرفروش‌ترین‌ها",
    url: "/best-sellers",
    icon: <TrendingUp size={20} />,
  },
  { id: 4, title: "تخفیف‌ها", url: "/discounts", icon: <Tag size={20} /> },
  { id: 5, title: "برند‌ها", url: "/brands", icon: <Layers size={20} /> },
  { id: 6, title: "مقالات", url: "/blogs", icon: <BookOpen size={20} /> },
  { id: 7, title: "درباره ما", url: "/about-us", icon: <Info size={20} /> },
  { id: 8, title: "تماس با ما", url: "/contact-us", icon: <Phone size={20} /> },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden text-gray-600 p-3 rounded-lg bg-gray-100 transition-all duration-300 active:scale-95 relative group ml-10">
          <MenuIcon
            size={24}
            className="text-primary transition-colors duration-300"
          />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[85vw] max-w-md p-0 border-r-0 bg-linear-to-b from-white to-gray-50"
      >
        {/* هدر منو */}
        <div className="pt-6">
          <SheetHeader className="flex items-center justify-between mb-6 border border-transparent border-b-primary-300">
            <SheetTitle>
              <div className="flex items-center gap-3 p-3 bg-primary-600/10 rounded-xl backdrop-blur-sm mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold">👤</span>
                </div>
                <div>
                  <p className="font-semibold">خوش آمدید!</p>
                  <p className="text-xs">برای مشاهده حساب کاربری وارد شوید</p>
                </div>
              </div>
              <LoginButton className="w-full block" isModal={false} />
            </SheetTitle>
          </SheetHeader>
        </div>

        {/* محتوای منو */}
        <div className="px-6 overflow-scroll">
          {/* بخش اصلی منو */}
          <div className="space-y-2 mb-16">
            {menuContent.map((item) => {
              const isActive = pathname === item.url;
              return (
                <Link
                  key={item.id}
                  href={item.url}
                  onClick={handleClose}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${
                    isActive
                      ? "bg-primary/10 text-primary border-r-4 border-primary"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isActive
                          ? "bg-primary/20"
                          : "bg-gray-100 group-hover:bg-primary/10"
                      }`}
                    >
                      {React.cloneElement(item.icon, {
                        className: isActive
                          ? "text-primary"
                          : "text-gray-600 group-hover:text-primary",
                        size: 20,
                      })}
                    </div>
                    <span className="font-medium">{item.title}</span>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* دکمه‌های اقدام */}
          {/* <div className="absolute bottom-0 left-0 right-0 bg-white p-4">
            
          </div> */}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
