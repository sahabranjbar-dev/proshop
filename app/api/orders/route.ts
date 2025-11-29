import { authOptions } from "@/lib/authOptions";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// --- اعتبارسنجی ورودی ---
const createOrderSchema = z.object({
  sendingMethodId: z.string().min(1, "شناسه روش ارسال اجباری است"),
  addressId: z.string().optional(),
  couponCode: z.string().optional(),
});

export async function POST(request: NextRequest) {
  // 1. بررسی احراز هویت
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "برای ثبت سفارش باید وارد شوید" },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  try {
    // 2. اعتبارسنجی بدنه درخواست
    const body = await request.json().catch(() => null);
    if (!body)
      return NextResponse.json({ error: "داده‌های نامعتبر" }, { status: 400 });

    const parsed = createOrderSchema.safeParse(body);
    if (!parsed.success) {
      const errorMessage = "خطای اعتبارسنجی ورودی";
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const { sendingMethodId, addressId, couponCode } = parsed.data;

    // 3. اجرای تراکنش
    const order = await prisma.$transaction(async (tx) => {
      // الف. دریافت روش ارسال
      const shipping = await tx.sendingMethod.findUnique({
        where: { id: sendingMethodId },
      });
      if (!shipping) throw new Error("روش ارسال نامعتبر است");

      // ب. دریافت آدرس (شناسه یا آدرس پیش‌فرض)
      const address = await tx.address.findFirst({
        where: {
          userId,
          ...(addressId ? { id: addressId } : { isDefault: true }),
        },
      });
      if (!address) throw new Error("آدرس ارسال نامعتبر است");

      // پ. دریافت سبد خرید
      const cart = await tx.cart.findFirst({
        where: { userId },
        include: {
          items: {
            include: {
              product: { select: { id: true, price: true, stock: true } },
            },
          },
        },
      });
      if (!cart || cart.items.length === 0)
        throw new Error("سبد خرید شما خالی است");

      // جمع کل محصولات و بررسی موجودی
      let totalAmount = 0;
      const orderItemsData = cart.items.map((item) => {
        if (item.quantity > item.product.stock)
          throw new Error(`موجودی محصول کافی نیست: ${item.product.id}`);

        const finalPrice = Number(item.product.price); // می‌تونی اینجا تخفیف کمپین یا کوپن رو اعمال کنی
        totalAmount += finalPrice * item.quantity;

        return {
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
          finalPrice,
        };
      });

      // اعمال کوپن
      let discountAmount = 0;
      let coupon = null;
      if (couponCode) {
        coupon = await tx.coupon.findFirst({
          where: { code: couponCode, isActive: true },
        });
        if (!coupon) throw new Error("کوپن نامعتبر یا غیرفعال است");

        // محاسبه تخفیف
        if (coupon.type === "PERCENTAGE")
          discountAmount = (totalAmount * Number(coupon.value)) / 100;
        else discountAmount = Number(coupon.value);

        // بروزرسانی تعداد استفاده
        await tx.coupon.update({
          where: { id: coupon.id },
          data: { usedCount: { increment: 1 } },
        });
      }

      // ت. ایجاد سفارش
      const newOrder = await tx.order.create({
        data: {
          userId,
          addressId: address.id,
          shippingMethodId: shipping.id,
          shippingCost: shipping.baseCost,
          totalAmount,
          discountAmount,
          status: "PENDING",
          orderItems: { create: orderItemsData },
        },
        include: { orderItems: true },
      });

      // کاهش موجودی محصولات
      for (const item of cart.items) {
        await tx.product.update({
          where: { id: item.product.id },
          data: { stock: { decrement: item.quantity } },
        });
      }

      // حذف سبد خرید
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
      await tx.cart.delete({ where: { id: cart.id } });

      return newOrder;
    });

    // 4. پاسخ موفق
    return NextResponse.json(
      { message: "سفارش با موفقیت ثبت شد", order },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: error.message || "خطای ناشناخته در ثبت سفارش" },
      { status: 500 }
    );
  }
}
