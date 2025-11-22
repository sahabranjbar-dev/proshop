import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { AdminHeader } from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="flex-1 min-h-screen bg-gray-100">
        <AdminHeader />
        <div className="p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
