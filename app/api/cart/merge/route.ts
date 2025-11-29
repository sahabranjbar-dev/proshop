import { authOptions } from "@/lib/authOptions";
import { ServerError } from "@/utils/errors";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

// 1. اصلاح Schema: تعریف صحیح آرایه‌ای از آبجکت‌ها
const mergeSchema = z.object({
  cartItems: z.array(
    z.object({
      productId: z.string({
        error: "آیدی محصول باید رشته باشد",
      }),
      quantity: z
        .number({
          error: "تعداد باید عدد باشد",
        })
        .int("تعداد باید صحیح باشد")
        .min(1, "تعداد باید حداقل ۱ باشد"),
    })
  ),
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

    // بررسی و اعتبارسنجی بدنه درخواست
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "داده‌های ارسالی نامعتبر است" },
        { status: 400 }
      );
    }

    const validationResult = mergeSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "داده‌های ورودی نامعتبر",
          details: validationResult.error.message,
        },
        { status: 400 }
      );
    }

    const localCartItems = validationResult.data.cartItems;

    // استفاده از تراکنش برای اطمینان از اتمیک بودن عملیات ادغام
    await prisma.$transaction(async (tx) => {
      // 2. پیدا کردن یا ایجاد سبد خرید دیتابیس برای کاربر
      let userCart = await tx.cart.findUnique({
        where: { userId },
        include: { items: true },
      });

      if (!userCart) {
        userCart = await tx.cart.create({
          data: { userId },
          include: { items: true },
        });
      }

      const cartId = userCart.id;
      const dbItemsMap = new Map(
        userCart.items.map((item) => [item.productId, item])
      );

      // 3. حلقه برای ادغام آیتم‌های سبد خرید محلی
      for (const localItem of localCartItems) {
        const existingDbItem = dbItemsMap.get(localItem.productId);

        if (existingDbItem) {
          // الف. محصول وجود دارد: افزایش تعداد
          await tx.cartItem.update({
            where: { id: existingDbItem.id },
            data: { quantity: { increment: localItem.quantity } },
          });
        } else {
          // ب. محصول جدید است: ایجاد آیتم جدید
          // *توجه: بهتر است ابتدا وجود محصول در جدول Product بررسی شود.*

          // *--- (اختیاری) بررسی وجود Product: ---*
          const productExists = await tx.product.findUnique({
            where: { id: localItem.productId },
            select: { id: true },
          });

          if (!productExists) {
            // می‌توانید در اینجا skip کنید یا یک خطا برگردانید (بسته به سیاست برنامه)
            console.warn(
              `Product ID ${localItem.productId} not found. Skipping.`
            );
            continue;
          }
          // *------------------------------------*

          await tx.cartItem.create({
            data: {
              cartId: cartId,
              productId: localItem.productId,
              quantity: localItem.quantity,
            },
          });
        }
      }
    });

    // 4. دریافت مجدد سبد خرید به‌روز شده برای پاسخ
    const updatedCart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    const totalPrice = updatedCart?.items.reduce(
      (prev, cur) => prev + cur.quantity * Number(cur?.product?.price),
      0 // مقدار اولیه 0 برای اطمینان از محاسبات صحیح
    );
    return NextResponse.json({
      success: true,
      userCart: { ...updatedCart, totalPrice },
      message: "سبد خرید محلی با موفقیت ادغام شد",
    });
  } catch (error) {
    console.error("Error merging carts:", error);
    // فرض بر این است که ServerError یک NextResponse مناسب برمی‌گرداند
    return ServerError();
  }
}
