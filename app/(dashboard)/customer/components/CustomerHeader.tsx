import SignoutButton from "@/components/SignoutButton/SignoutButton";

const CustomerDashboardHeader = () => {
  return (
    <header className="h-16 border-b flex items-center justify-between px-4">
      <h1 className="font-semibold">پنل مشتری</h1>

      <div>
        <SignoutButton />
      </div>
    </header>
  );
};

export default CustomerDashboardHeader;
