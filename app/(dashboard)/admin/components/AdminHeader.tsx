import { SidebarTrigger } from "@/components/ui/sidebar";

export function AdminHeader() {
  return (
    <header className="h-16 border-b flex items-center justify-between px-4 bg-gray-200">
      <SidebarTrigger />
    </header>
  );
}
