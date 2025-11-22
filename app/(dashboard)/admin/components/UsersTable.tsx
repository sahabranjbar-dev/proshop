// components/admin/users-table.tsx
"use client";

import React from "react";

interface User {
  id: string;
  phone: string;
  role: string;
}

interface UsersTableProps {
  data: User[];
}

export function UsersTable({ data }: UsersTableProps) {
  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">شماره موبایل</th>
          <th className="border p-2">نقش</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td className="border p-2">{user.id}</td>
            <td className="border p-2">{user.phone}</td>
            <td className="border p-2">{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
