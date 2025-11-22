import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import CustomerDashboardHeader from "./components/CustomerHeader";
import CustomerSidebar from "./components/CustomerSidebar";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <CustomerSidebar />
      <main className="flex-1">
        <CustomerDashboardHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}
