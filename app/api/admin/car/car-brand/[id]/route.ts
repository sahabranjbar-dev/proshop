import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { isRequestByAdmin } from "@/utils/errors";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(2, "نام برند اجباری است").optional(),
  slug: z.string().min(2, "اسلاگ معتبر نیست").optional(),
  logo: z.string().url("آدرس لوگو معتبر نیست").optional().nullable(),
});

/**
 * 📌 دریافت برند تکی
 */
export async function GET(
  _req: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const isAdmin = await isRequestByAdmin();
    if (!isAdmin) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }
    const params = await context.params;

    const { id } = params;

    const brand = await prisma.carBrand.findUnique({
      where: { id },
      include: {
        models: true,
        oemNumbers: true,
      },
    });

    if (!brand) {
      return NextResponse.json({ message: "برند یافت نشد" }, { status: 404 });
    }

    return NextResponse.json(brand);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "خطا در دریافت اطلاعات برند" },
      { status: 500 }
    );
  }
}

/**
 * ✏️ ویرایش برند
 */
export async function PUT(
  request: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const isAdmin = await isRequestByAdmin();
    if (!isAdmin) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }

    const params = await context.params;

    const { id } = params;
    const body = await request.json();
    const data = updateSchema.parse(body);

    const updated = await prisma.carBrand.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      message: "برند با موفقیت ویرایش شد",
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "خطا در ویرایش برند" },
      { status: 400 }
    );
  }
}
