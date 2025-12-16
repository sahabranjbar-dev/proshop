// components/admin/orders-table.tsx
"use client";

interface Order {
  id: string;
  customer: string;
  product: string;
  status: string;
}

interface OrdersTableProps {
  data: Order[];
}

export function OrdersTable({ data }: OrdersTableProps) {
  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">مشتری</th>
          <th className="border p-2">محصول</th>
          <th className="border p-2">وضعیت</th>
        </tr>
      </thead>
      <tbody>
        {data.map((o) => (
          <tr key={o.id}>
            <td className="border p-2">{o.id}</td>
            <td className="border p-2">{o.customer}</td>
            <td className="border p-2">{o.product}</td>
            <td className="border p-2">{o.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
