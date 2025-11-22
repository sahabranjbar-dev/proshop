import { ReactNode } from "react";
import { AdminHeader } from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-white">
        {/* Sidebar */}
        <AdminSidebar />
      </aside>

      <main className="flex-1">
        {/* Header */}
        <AdminHeader />

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
