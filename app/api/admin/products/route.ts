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

    const products = await prisma.product.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { [sortBy]: sortOrder },
      where,
      select: {
        id: true,
        price: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        files: {
          select: {
            id: true,
            url: true,
            key: true,
          },
        },
      },
    });

    const productsData = products.map((product, index) => ({
      ...product,
      rowNumber: (page - 1) * pageSize + index + 1,
    }));

    const totalItems = await prisma.product.count({
      where,
    });

    return NextResponse.json({
      resultList: productsData,
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

const productSchema = z.object({
  title: z.string({
    error: "نام محصول اجباری می‌باشد",
  }),
  price: z.number({
    error: "ثیمت محصول اجباری می‌باشد",
  }),
});

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await isRequestByAdmin();

    if (!isAdmin) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const body = await request.json();

    const parsedBody = productSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: parsedBody.error.format() },
        { status: 400 }
      );
    }

    const { title, price } = parsedBody.data;

    // سپس محصول را ایجاد می‌کنیم و فایل‌ها را وصل می‌کنیم
    const product = await prisma.product.create({
      data: { price, title },
    });

    return NextResponse.json(
      { success: true, product, message: "محصول با موفقیت ایجاد شد" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return ServerError();
  }
}

const productUpdateSchema = z.object({
  id: z.string({
    error: "آیدی اجباری می‌باشد",
  }),
});
export async function PUT(request: NextRequest) {
  try {
    const isAdmin = await isRequestByAdmin();

    if (!isAdmin) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const body = await request.json();

    const parsedBody = productUpdateSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: parsedBody.error.message },
        { status: 400 }
      );
    }

    const { id } = parsedBody.data;
    const product = await prisma.product.update({
      data: {},
      where: {
        id,
      },
    });

    return NextResponse.json(
      { success: true, product, message: "محصول با موفقیت ویرایش شد" },
      { status: 200 }
    );
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

    // گرفتن فیلترها
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 401 });
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      { success: true, message: "محصول با موفقیت ویرایش شد" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return ServerError();
  }
}
