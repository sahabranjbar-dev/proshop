import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { isRequestByAdmin } from "@/utils/errors";
import { z } from "zod";

const carBrandSchema = z.object({
  name: z.string().min(2, "نام برند اجباری است"),
  slug: z.string().min(2, "اسلاگ اجباری است"),
  logo: z.string().url().optional(),
});

/**
 * 📌 ایجاد برند خودرو
 */
export async function POST(request: NextRequest) {
  try {
    const isAdmin = await isRequestByAdmin();
    if (!isAdmin) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }

    const body = await request.json();
    const data = carBrandSchema.parse(body);

    const exists = await prisma.carBrand.findUnique({
      where: { slug: data.slug },
    });

    if (exists) {
      return NextResponse.json(
        { message: "برندی با این اسلاگ قبلاً ثبت شده است" },
        { status: 409 }
      );
    }

    const brand = await prisma.carBrand.create({
      data,
    });

    return NextResponse.json(
      { message: "برند با موفقیت ایجاد شد", data: brand },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "خطای سرور" },
      { status: 400 }
    );
  }
}

/**
 * 📌 دریافت لیست برندها
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;

    const brands = await prisma.carBrand.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        models: true,
      },
    });

    const resultList = brands.map((brand, index) => ({
      ...brand,
      rowNumber: (page - 1) * pageSize + index + 1,
    }));

    const totalItems = await prisma.carBrand.count();

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
  } catch {
    return NextResponse.json(
      { message: "خطا در دریافت برندها" },
      { status: 500 }
    );
  }
}

/**
 * 🗑️ حذف برند
 */
export async function DELETE(request: NextRequest) {
  try {
    const isAdmin = await isRequestByAdmin();
    if (!isAdmin) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }

    const url = new URL(request.url);

    const searchParams = url.searchParams;

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          message: "آیدی الزامی است",
        },
        {
          status: 402,
        }
      );
    }
    await prisma.carBrand.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "برند با موفقیت حذف شد",
    });
  } catch {
    return NextResponse.json(
      { message: "امکان حذف برند وجود ندارد" },
      { status: 400 }
    );
  }
}
