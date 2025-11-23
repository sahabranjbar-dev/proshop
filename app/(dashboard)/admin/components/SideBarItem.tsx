"use client";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ChartColumnStacked,
  Home,
  ShieldBan,
  ShoppingCart,
  Store,
  Users,
} from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "داشبورد",
    url: "/",
    icon: Home,
  },
  {
    title: "کاربران",
    url: "/users",
    icon: Users,
  },
  {
    title: "محصولات",
    url: "/products",
    icon: Store,
  },
  {
    title: "دسته‌بندی‌ها",
    url: "/categories",
    icon: ChartColumnStacked,
  },
  {
    title: "سفارش‌ها",
    url: "/orders",
    icon: ShoppingCart,
  },
  {
    title: "نقش‌ها و دسترسی‌ها",
    url: "/roles",
    icon: ShieldBan,
  },
];
const SideBarItem = () => {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link href={`/admin${item.url}`}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default SideBarItem;
