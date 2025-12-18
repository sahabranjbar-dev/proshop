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

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        children: true,
        parent: true,
        campaigns: true,
        products: true,
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "دسته‌بندی مورد نظر یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return ServerError();
  }
}
