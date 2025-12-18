import { isRequestByAdmin } from "@/utils/errors";
import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await isRequestByAdmin();
    if (!isAdmin) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }
    const params = await context.params;

    const id = params.id;

    if (!id) {
      return NextResponse.json(
        {
          message: "آیدی الزامی است",
        },
        { status: 401 }
      );
    }

    const carModel = await prisma.carModel.findUnique({
      where: { id },
    });

    return NextResponse.json(carModel);
  } catch (error) {}
}
