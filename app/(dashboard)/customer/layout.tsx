import { ReactNode } from "react";
import CustomerHeader from "./components/CustomerHeader";
import CustomerSidebar from "./components/CustomerSidebar";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-white">
        {/* Sidebar */}
        <CustomerSidebar />
      </aside>

      <main className="flex-1">
        <header className="h-16 border-b flex items-center px-4">
          {/* Header */}
          <CustomerHeader />
        </header>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
