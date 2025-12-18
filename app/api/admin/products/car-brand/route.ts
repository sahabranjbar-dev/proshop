import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;

    const brands = await prisma.carBrand.findMany({
      orderBy: { createdAt: "desc" },
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
