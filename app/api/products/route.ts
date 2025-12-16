import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { ServerError } from "@/utils/errors";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    /* ---------------- Brand Filter ---------------- */
    const brandParam = searchParams.get("brand");
    const brands = brandParam ? brandParam.split(",").filter(Boolean) : [];

    /* ---------------- Price Filter ---------------- */
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");

    const minPrice = minPriceParam ? Number(minPriceParam) : undefined;
    const maxPrice = maxPriceParam ? Number(maxPriceParam) : undefined;

    /* ---------------- Build Where ---------------- */
    const where: any = {};

    if (brands.length) {
      where.brand = {
        slug: {
          in: brands,
        },
      };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {
        ...(minPrice !== undefined && { gte: minPrice }),
        ...(maxPrice !== undefined && { lte: maxPrice }),
      };
    }

    /* ---------------- Query ---------------- */
    const products = await prisma.product.findMany({
      take: 20,
      where: Object.keys(where).length ? where : undefined,
      include: {
        brand: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        products,
        message: "محصولات با موفقیت دریافت شدند",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[GET_PRODUCTS_ERROR]", error);
    return ServerError();
  }
}
