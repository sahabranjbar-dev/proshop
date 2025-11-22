import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // گرفتن فیلترها
    const firstName = searchParams.get("firstName");
    const lastName = searchParams.get("lastName");
    const email = searchParams.get("email");
    const phone = searchParams.get("phone");
    const role = searchParams.get("role") as "ADMIN" | "USER" | undefined;

    // پجینیشن
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;

    // سورت
    const sortBy = searchParams.get("sortField") || "createdAt";
    const sortOrder =
      searchParams.get("sortDirection") === "asc" ? "asc" : "desc";

    const filters: any = {
      OR: [
        {
          firstName: {
            contains: firstName ?? "",
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: lastName ?? "",
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: email ?? "",
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: phone ?? "",
            mode: "insensitive",
          },
        },
      ],
    };

    // گرفتن تعداد کل
    const totalItems = await prisma.user.count({
      where: {
        ...filters,
        role: role ? role : undefined,
      },
    });

    // گرفتن دیتا
    const users = await prisma.user.findMany({
      where: {
        ...filters,
        role: role ? role : undefined,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { [sortBy]: sortOrder },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        phone: true,
        role: true,
        updatedAt: true,
      },
    });

    const usersData = users.map((user, index) => ({
      ...user,
      rowNumber: (page - 1) * pageSize + index + 1,
      fullName: [user.firstName, user.lastName].filter(Boolean).join(" "),
    }));

    return NextResponse.json({
      resultList: usersData,
      totalItems,
      page,
      pageSize,
      totalPages: Math.ceil(totalItems / pageSize),
    });
  } catch (error) {
    console.error("❌ Error in GET /dashboard/user:", error);
    return NextResponse.json(
      { message: "خطا در دریافت کاربران." },
      { status: 500 }
    );
  }
}
