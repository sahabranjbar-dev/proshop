import { SidebarTrigger } from "@/components/ui/sidebar";

const CustomerDashboardHeader = () => {
  return (
    <header className="h-16 border-b flex items-center justify-between px-4">
      <SidebarTrigger />
    </header>
  );
};

export default CustomerDashboardHeader;
