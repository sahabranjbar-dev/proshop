import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { ServerError } from "@/utils/errors";

export async function GET() {
  try {
    const result = await prisma.product.aggregate({
      _min: {
        price: true,
      },
      _max: {
        price: true,
      },
    });

    return NextResponse.json({
      minPrice: result._min.price ?? 0,
      maxPrice: result._max.price ?? 0,
    });
  } catch (error) {
    console.error(error);
    return ServerError();
  }
}
