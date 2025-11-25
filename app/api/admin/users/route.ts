import { Role } from "@/types/common";
import { convertToEnglishDigits } from "@/utils/common";
import { isRequestByAdmin, ServerError } from "@/utils/errors";
import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET(request: NextRequest) {
  try {
    const isAdmin = await isRequestByAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);

    // Filters
    const firstName = searchParams.get("firstName")?.trim() || "";
    const lastName = searchParams.get("lastName")?.trim() || "";
    const email = searchParams.get("email")?.trim() || "";
    const phone = searchParams.get("phone")?.trim() || "";
    const role = searchParams.get("role") as "ADMIN" | "USER" | undefined;

    // Pagination
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;

    // Sorting
    const sortField = searchParams.get("sortField") || "createdAt";
    const sortDirection =
      searchParams.get("sortDirection") === "asc" ? "asc" : "desc";

    // Build OR filters only if values exist
    const OR: any[] = [];

    if (firstName) {
      OR.push({
        firstName: {
          contains: firstName,
          mode: "insensitive",
        },
      });
    }

    if (lastName) {
      OR.push({
        lastName: {
          contains: lastName,
          mode: "insensitive",
        },
      });
    }

    if (email) {
      OR.push({
        email: {
          contains: email,
          mode: "insensitive",
        },
      });
    }

    if (phone) {
      OR.push({
        phone: {
          contains: convertToEnglishDigits(phone),
          mode: "insensitive",
        },
      });
    }

    // Final where object
    const where: any = {
      ...(OR.length > 0 ? { OR } : {}),
      ...(role ? { role } : {}),
    };

    // Count total items
    const totalItems = await prisma.user.count({
      where,
    });

    // Fetch paginated result
    const users = await prisma.user.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        [sortField]: sortDirection,
      },
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

    // Add row number and full name
    const resultList = users.map((user, index) => ({
      ...user,
      rowNumber: (page - 1) * pageSize + index + 1,
      fullName: [user.firstName, user.lastName].filter(Boolean).join(" "),
    }));

    return NextResponse.json(
      {
        resultList,
        totalItems,
        page,
        pageSize,
        totalPages: Math.ceil(totalItems / pageSize),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error in GET /admin/users:", error);
    return NextResponse.json(
      { message: "خطا در دریافت کاربران." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const isAdmin = await isRequestByAdmin();

    if (!isAdmin) {
      return NextResponse.json({ error: "دسترسی ندارید" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);

    // گرفتن فیلترها
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "آیدی اجباری است" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (user?.role === "ADMIN") {
      return NextResponse.json(
        { error: "شما نمیتوانید کاربر با نقش ادمین را حذف کنید" },
        { status: 403 }
      );
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      { success: true, message: "کاربر با موفقیت حذف شد" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return ServerError();
  }
}

const putSchema = z.object({
  id: z.string({
    error: "آیدی الزامی است",
  }),
  email: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string({
    error: "موبایل الزامی است",
  }),
  role: z.enum([Role.ADMIN, Role.USER], {
    error: "نقش الزامی است",
  }),
});

export async function PUT(request: NextRequest) {
  try {
    const isAdmin = await isRequestByAdmin();

    if (!isAdmin) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const body = await request.json();
    const parsedBody = putSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: parsedBody.error.message },
        { status: 400 }
      );
    }

    const { id, email, firstName, lastName, phone, role } = parsedBody.data;

    const user = await prisma.user.update({
      where: { id },
      data: { email, firstName, lastName, phone, role },
    });

    return NextResponse.json(
      { success: true, user, message: "عملیات با موفقیت انجام شد" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return ServerError();
  }
}
