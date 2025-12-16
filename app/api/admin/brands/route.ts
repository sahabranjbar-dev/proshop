import { isRequestByAdmin, ServerError } from "@/utils/errors";
import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET() {
  try {
    const isAdmin = await isRequestByAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const brands = await prisma.brand.findMany({
      where: {
        id: { not: "" },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const resolvedBrands = brands.map((item, index) => ({
      ...item,
      rowNumber: index + 1,
    }));

    return NextResponse.json({ resultList: resolvedBrands }, { status: 200 });
  } catch (error) {
    console.error(error);
    return ServerError();
  }
}

export const brandSchema = z.object({
  farsiTitle: z.string().min(2, "نام فارسی باید حداقل ۲ کاراکتر باشد").max(100),

  englishTitle: z
    .string()
    .min(2, "نام انگلیسی باید حداقل ۲ کاراکتر باشد")
    .max(100),

  slug: z.string(),
  description: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await isRequestByAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = brandSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: JSON.parse(parsed.error.message) },
        { status: 400 }
      );
    }

    const { slug, englishTitle, farsiTitle, description, isActive, website } =
      parsed.data;

    const exists = await prisma.brand.findUnique({ where: { slug } });
    if (exists) {
      return NextResponse.json(
        { error: "برند با این نام قبلاً ثبت شده است" },
        { status: 409 }
      );
    }

    const brand = await prisma.brand.create({
      data: {
        englishTitle,
        farsiTitle,
        slug,
        description,
        isActive,
        website,
      },
    });

    return NextResponse.json(
      { result: brand, message: "برند با موفقیت ثبت شد" },
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

    const url = new URL(request.url);

    const searchParams = url.searchParams;

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          error: "آیدی الزامی است",
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const parsed = brandSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: JSON.parse(parsed.error.message) },
        { status: 400 }
      );
    }

    const { slug, englishTitle, farsiTitle, description, isActive, website } =
      parsed.data;

    const brand = await prisma.brand.update({
      where: {
        id,
      },
      data: {
        englishTitle,
        farsiTitle,
        slug,
        description,
        isActive,
        website,
      },
    });

    return NextResponse.json(
      { result: brand, message: "برند با موفقیت ویرایش شد" },
      { status: 201 }
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

    const url = new URL(request.url);

    const searchParams = url.searchParams;

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        error: "آیدی الزامی است",
      });
    }
    await prisma.brand.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "برند با موفقیت حذف شد",
    });
  } catch (error) {
    console.error(error);
    return ServerError();
  }
}
