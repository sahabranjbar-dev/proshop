import { authOptions } from "@/lib/authOptions";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const setAsDefaultSchema = z.object({
  addressId: z.string().min(1, "آیدی آدرس اجباری است"),
});

export async function PUT(request: NextRequest) {
  try {
    /* ------------------------- Auth Check ------------------------- */
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "شما باید وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }
    const userId = session.user.id;

    /* ------------------------- Body Parse ------------------------- */
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "داده‌های ارسالی نامعتبر است" },
        { status: 400 }
      );
    }

    const parsed = setAsDefaultSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "داده‌های ورودی نامعتبر",
          details: parsed.error.message,
        },
        { status: 400 }
      );
    }

    const { addressId } = parsed.data;

    /* ------------------------- Ownership Check ------------------------- */
    const targetAddress = await prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!targetAddress || targetAddress.userId !== userId) {
      return NextResponse.json(
        { error: "شما اجازه تغییر این آدرس را ندارید" },
        { status: 403 }
      );
    }

    /* ------------------------- Get Current Default ------------------------- */
    const currentDefault = await prisma.address.findFirst({
      where: { userId, isDefault: true },
    });

    /* ------------------------- Transaction ------------------------- */
    await prisma.$transaction(async (tx) => {
      // remove previous default
      if (currentDefault && currentDefault.id !== addressId) {
        await tx.address.update({
          where: { id: currentDefault.id },
          data: { isDefault: false },
        });
      }

      // set new default
      await tx.address.update({
        where: { id: addressId },
        data: { isDefault: true },
      });
    });

    return NextResponse.json(
      {
        success: true,
        message: "آدرس پیش‌فرض با موفقیت تغییر کرد",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error setting default address:", error);
    return NextResponse.json(
      { error: "خطایی در سرور رخ داد" },
      { status: 500 }
    );
  }
}
