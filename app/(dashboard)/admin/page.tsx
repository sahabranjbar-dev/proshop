import React from "react";
import { UsersTable } from "./_components/UsersTable";
import { ProductsTable } from "./_components/ProductsTable";
import { OrdersTable } from "./_components/OrdersTable";

const dummyUsers = [
  { id: "1", phone: "09123456789", role: "ADMIN" },
  { id: "2", phone: "09123456788", role: "CUSTOMER" },
];

const dummyProducts = [
  { id: "p1", name: "کیک شکلاتی", price: 120000 },
  { id: "p2", name: "پای سیب", price: 90000 },
];

const dummyOrders = [
  {
    id: "o1",
    customer: "09123456788",
    product: "کیک شکلاتی",
    status: "پرداخت شده",
  },
  {
    id: "o2",
    customer: "09123456788",
    product: "پای سیب",
    status: "در حال پردازش",
  },
];

const AdminDashboardPage = () => {
  return (
    <div className="p-6 space-y-6">
      {/* کاردهای خلاصه */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold">کاربران</h3>
          <p className="text-2xl">{dummyUsers.length}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold">محصولات</h3>
          <p className="text-2xl">{dummyProducts.length}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold">سفارش‌ها</h3>
          <p className="text-2xl">{dummyOrders.length}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold">دسته‌بندی‌ها</h3>
          <p className="text-2xl">3</p>
        </div>
      </div>

      {/* خلاصه جدول کاربران */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-2">جدیدترین کاربران</h2>
        <UsersTable data={dummyUsers.slice(-5)} />
      </div>

      {/* خلاصه جدول محصولات */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-2">جدیدترین محصولات</h2>
        <ProductsTable data={dummyProducts.slice(-5)} />
      </div>

      {/* آخرین سفارشات */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-2">آخرین سفارشات</h2>
        <OrdersTable data={dummyOrders.slice(-5)} />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
