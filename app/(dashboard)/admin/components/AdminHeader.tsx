import SignoutButton from "@/components/SignoutButton/SignoutButton";

export function AdminHeader() {
  return (
    <header className="h-16 border-b flex items-center justify-between px-4">
      <div>
        <h1 className="font-semibold">پنل مدیریت</h1>
      </div>

      <div>
        <SignoutButton />
      </div>
    </header>
  );
}
