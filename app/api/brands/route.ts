import { ServerError } from "@/utils/errors";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        farsiTitle: true,
        englishTitle: true,
        slug: true,
        website: true,
      },
    });

    return NextResponse.json({
      result: brands,
      message: "Brands fetched successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching brands:", error);
    return ServerError();
  }
}
