import { ServerError } from "@/utils/errors";
import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      take: 20,
    });

    const url = new URL(request.url);

    const searchParams = url.searchParams;

    console.log(searchParams);

    return NextResponse.json(
      {
        products,
        message: "محصولات با موفقیت دریافت شدند",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return ServerError();
  }
}
