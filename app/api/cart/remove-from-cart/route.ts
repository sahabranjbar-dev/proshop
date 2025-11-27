import { authOptions } from "@/lib/authOptions";
import { ServerError } from "@/utils/errors";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const removeFromCartSchema = z.object({
  productId: z.string({
    error: "آیدی محصول الزامی است",
  }),
  quantity: z
    .number()
    .int("تعداد باید یک عدد صحیح باشد")
    .min(1, "تعداد باید حداقل ۱ باشد")
    .optional(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "شما باید وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "داده‌های ارسالی نامعتبر است" },
        { status: 400 }
      );
    }

    const validationResult = removeFromCartSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "داده‌های ورودی نامعتبر",
          details: validationResult.error.message,
        },
        { status: 400 }
      );
    }

    const { productId, quantity = 1 } = validationResult.data;

    const userCart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!userCart) {
      // اگر سبد خریدی وجود نداشت، به معنی این است که آیتم در سبد نیست.
      return NextResponse.json(
        { message: "سبد خرید شما خالی است" },
        { status: 404 }
      );
    }

    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productId: productId,
      },
    });

    if (!existingCartItem) {
      return NextResponse.json(
        { error: "این محصول در سبد خرید شما نیست" },
        { status: 404 }
      );
    }

    // 1. اگر تعداد موجود در سبد مساوی یا کمتر از تعداد درخواستی برای حذف باشد، یا کاربر عمداً تعداد زیادی برای حذف فرستاده باشد، کل آیتم حذف می‌شود.
    if (existingCartItem.quantity <= quantity) {
      await prisma.cartItem.delete({
        where: { id: existingCartItem.id },
      });
      return NextResponse.json({
        success: true,
        removed: true,
        message: "محصول با موفقیت از سبد خرید حذف شد",
      });
    }

    // 2. در غیر این صورت، تعداد کم می‌شود.
    const cartItem = await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: { decrement: quantity } },
      include: { product: true },
    });

    return NextResponse.json({
      success: true,
      cartItem,
      message: `${quantity} محصول از سبد خرید با موفقیت کاسته شد`,
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return ServerError();
  }
}
