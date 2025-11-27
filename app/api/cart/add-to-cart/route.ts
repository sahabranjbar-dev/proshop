import { authOptions } from "@/lib/authOptions";
import { ServerError } from "@/utils/errors";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const addToCartSchema = z.object({
  productId: z.string({
    error: "آیدی محصول الزامی است",
  }),
  quantity: z
    .number()
    .int("تعداد باید یک عدد صحیح باشد")
    .min(1, "تعداد باید حداقل ۱ باشد")
    .default(1)
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

    const validationResult = addToCartSchema.safeParse(body);
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

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "محصول یافت نشد" }, { status: 404 });
    }

    let userCart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!userCart) {
      userCart = await prisma.cart.create({
        data: { userId },
      });
    }

    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productId: productId,
      },
    });

    let cartItem;
    if (existingCartItem) {
      cartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: { increment: quantity } },
        include: { product: true },
      });
    } else {
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productId: productId,
          quantity: quantity,
        },
        include: {
          product: true,
        },
      });
    }

    return NextResponse.json({
      success: true,
      cartItem,
      message: "محصول با موفقیت به سبد خریدتان اضافه شد",
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return ServerError();
  }
}
