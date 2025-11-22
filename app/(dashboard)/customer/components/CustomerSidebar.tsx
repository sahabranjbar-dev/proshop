import React from "react";
const menu = [
  { title: "داشبورد", href: "/customer" },
  { title: "سفارش‌ها", href: "/customer/orders" },
];
const CustomerSidebar = () => {
  return (
    <nav className="p-4 space-y-2">
      {menu.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="block px-3 py-2 rounded hover:bg-gray-100"
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
};

export default CustomerSidebar;
