import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authOptions } from "@/lib/authOptions";

import {
  ChartColumnStacked,
  ChevronUp,
  Home,
  ShieldBan,
  ShoppingCart,
  Store,
  User2,
  Users,
} from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

const items = [
  {
    title: "داشبورد",
    url: "",
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

const AdminSidebar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <Sidebar side="right">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>داشبورد ادمین</SidebarGroupLabel>
          <SidebarGroupContent>
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 />{" "}
                  {session?.user.name ||
                    session?.user.phone ||
                    session?.user.email ||
                    "کاربر میهمان"}
                  <ChevronUp className="mr-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] bg-white p-4"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
