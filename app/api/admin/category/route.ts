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

    const title = searchParams.get("title") || "";
    const fromPrice = searchParams.get("fromPrice");
    const toPrice = searchParams.get("toPrice");

    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;

    const sortBy = searchParams.get("sortField") || "createdAt";
    const sortOrder =
      searchParams.get("sortDirection") === "asc" ? "asc" : "desc";

    const where: any = {};

    if (title) {
      where.title = {
        contains: title,
        mode: "insensitive",
      };
    }

    if (fromPrice || toPrice) {
      where.price = {
        gte: fromPrice ? Number(fromPrice) : undefined,
        lte: toPrice ? Number(toPrice) : undefined,
      };
    }

    const categories = await prisma.category.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { [sortBy]: sortOrder },
      where,
      include: {
        children: true,
        parent: true,
        campaigns: true,
        products: true,
      },
    });

    const resolvedCategories = categories.map((item, index) => ({
      ...item,
      rowNumber: (page - 1) * pageSize + index + 1,
    }));

    const totalItems = await prisma.category.count({
      where,
    });

    return NextResponse.json({
      resultList: resolvedCategories,
      totalItems,
      page,
      pageSize,
      totalPages: Math.ceil(totalItems / pageSize),
    });
  } catch (error) {
    console.error(error);
    return ServerError();
  }
}

const categorySchema = z.object({
  name: z.string().min(2, "نام دسته‌بندی الزامی است"),
  slug: z.string().min(2, "اسلاگ الزامی است"),
  description: z.string().nullable().optional(),
  parentId: z.string().cuid().optional().nullable(),
});

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await isRequestByAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const body = await request.json();
    const data = categorySchema.parse(body);

    const exists = await prisma.category.findUnique({
      where: { slug: data.slug },
    });

    if (exists) {
      return NextResponse.json({ error: "اسلاگ تکراری است." }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        parentId: data.parentId || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "دسته‌بندی با موفقیت ایجاد شد",
        result: category,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return ServerError();
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAdmin = await isRequestByAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const body = await request.json();
    const data = categorySchema.parse(body);

    const category = await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        parentId: data.parentId || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "دسته‌بندی با موفقیت ویرایش شد",
      result: category,
    });
  } catch (error) {
    console.error(error);

    return ServerError();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const isAdmin = await isRequestByAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const hasChildren = await prisma.category.findFirst({
      where: { parentId: id },
    });

    if (hasChildren) {
      return NextResponse.json(
        { error: "Category has children" },
        { status: 400 }
      );
    }

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "دسته‌بندی با موفقیت حذف شد",
    });
  } catch (error) {
    console.error(error);
    return ServerError();
  }
}
