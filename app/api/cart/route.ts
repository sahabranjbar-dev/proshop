import { authOptions } from "@/lib/authOptions";
import { ServerError } from "@/utils/errors";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "شما باید وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }
    const userId = session.user.id;
    const userCart = await prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    const totalPrice = userCart?.items.reduce(
      (prev, cur) => prev + cur.quantity * Number(cur?.product?.price),
      0 // مقدار اولیه 0 برای اطمینان از محاسبات صحیح
    );
    return NextResponse.json({
      success: true,
      userCart: {
        ...userCart,
        totalPrice,
      },
      message: "سبد خرید با موفقیت دریافت شد",
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return ServerError();
  }
}
