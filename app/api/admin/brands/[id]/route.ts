import { isRequestByAdmin, ServerError } from "@/utils/errors";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: any,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const isAdmin = await isRequestByAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const brand = await prisma.brand.findUnique({
      where: { id },
    });

    if (!brand) {
      return NextResponse.json(
        { error: "برند مورد نظر یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(brand);
  } catch (error) {
    console.error(error);
    return ServerError();
  }
}
