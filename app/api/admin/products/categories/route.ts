import { isRequestByAdmin, ServerError } from "@/utils/errors";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const isAdmin = await isRequestByAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const resolvedCategories = categories.map(({ id, name }) => ({
      farsiTitle: name,
      id,
    }));
    return NextResponse.json(
      { resultList: resolvedCategories },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return ServerError();
  }
}
