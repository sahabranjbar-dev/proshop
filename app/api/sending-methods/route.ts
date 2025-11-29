import { requireAuth, ServerError } from "@/utils/errors";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.res;

    const sendingMethods = await prisma.sendingMethod.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    return NextResponse.json({
      success: true,
      meessage: "روش‌های ارسال دریافت شد",
      sendingMethods,
    });
  } catch (error) {
    console.error(error);
    return ServerError();
  }
}
