import { authOptions } from "@/lib/authOptions";
import { Role } from "@/types/common";
import { isRequestByAdmin, ServerError } from "@/utils/errors";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const isAdmin = session?.user.role === Role.ADMIN;

    if (!isAdmin) {
      return NextResponse.json({ error: "not Allowed" }, { status: 403 });
    }
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

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const isAdmin = session?.user.role === Role.ADMIN;

    if (!isAdmin) {
      return NextResponse.json({ error: "not Allowed" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);

    // گرفتن فیلترها
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 401 });
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
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
