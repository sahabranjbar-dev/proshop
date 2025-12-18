import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ brandId: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;

    const params = await context.params;

    const brandId = params.brandId;

    if (!brandId) {
      return NextResponse.json(
        {
          message: "آیدی برند الزامی است",
        },
        { status: 402 }
      );
    }

    const brands = await prisma.carModel.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        carBrandId: brandId,
      },
    });

    const totalItems = await prisma.carModel.count();

    return NextResponse.json(
      {
        resultList: brands,
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
