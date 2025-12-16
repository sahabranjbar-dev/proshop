"use client";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductsTableProps {
  data: Product[];
}

export function ProductsTable({ data }: ProductsTableProps) {
  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">نام محصول</th>
          <th className="border p-2">قیمت</th>
        </tr>
      </thead>
      <tbody>
        {data.map((p) => (
          <tr key={p.id}>
            <td className="border p-2">{p.id}</td>
            <td className="border p-2">{p.name}</td>
            <td className="border p-2">{p.price.toLocaleString()} تومان</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
