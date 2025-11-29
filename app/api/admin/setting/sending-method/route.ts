import { authOptions } from "@/lib/authOptions";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

/* ----------------------------- Validation ----------------------------- */

const sendingMethodSchema = z.object({
  farsiTitle: z.string().min(1, "عنوان فارسی اجباری است"),
  englishTitle: z.string().min(1, "عنوان انگلیسی اجباری است"),
  baseCost: z
    .number()
    .min(1, "هزینه پایه اجباری است")
    .max(10_000_000, "عدد باید کمتر از ۱۰،۰۰۰،۰۰۰")
    .refine((val) => !isNaN(Number(val)), "هزینه باید عدد باشد"),
});

/* ----------------------------- Auth Helper ----------------------------- */

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      error: true,
      res: NextResponse.json({ error: "نیاز به ورود دارید" }, { status: 401 }),
    };
  }
  return { error: false };
}

/* -------------------------------- GET -------------------------------- */
export async function GET() {
  try {
    const sendingMethods = await prisma.sendingMethod.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      { success: true, sendingMethods },
      { status: 200 }
    );
  } catch (e) {
    console.error("GET SendingMethod error:", e);
    return NextResponse.json(
      { error: "خطای سرور در دریافت روش‌های ارسال" },
      { status: 500 }
    );
  }
}

/* -------------------------------- POST -------------------------------- */
export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.res;

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "داده‌های نامعتبر" }, { status: 400 });
    }

    const parsed = sendingMethodSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: JSON.parse(parsed.error.message)[0]?.message },
        { status: 400 }
      );
    }

    const { farsiTitle, englishTitle, baseCost } = parsed.data;

    // جلوگیری از ثبت روش ارسال تکراری
    const exists = await prisma.sendingMethod.findFirst({
      where: {
        OR: [{ farsiTitle }, { englishTitle }],
      },
    });

    if (exists) {
      return NextResponse.json(
        { error: "این روش ارسال قبلاً ثبت شده است" },
        { status: 409 }
      );
    }

    const newMethod = await prisma.sendingMethod.create({
      data: {
        farsiTitle,
        englishTitle,
        baseCost,
      },
    });

    return NextResponse.json(
      { success: true, sendingMethod: newMethod, message: "روش ارسال ثبت شد" },
      { status: 201 }
    );
  } catch (e) {
    console.error("POST SendingMethod error:", e);
    return NextResponse.json(
      { error: "خطای سرور در ثبت روش ارسال" },
      { status: 500 }
    );
  }
}

/* -------------------------------- PUT -------------------------------- */
export async function PUT(request: NextRequest) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.res;

    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "شناسه روش ارسال الزامی است" },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "داده‌های نامعتبر" }, { status: 400 });
    }

    const parsed = sendingMethodSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "اطلاعات ورودی نامعتبر", details: parsed.error.message },
        { status: 400 }
      );
    }

    const { farsiTitle, englishTitle, baseCost } = parsed.data;

    const exists = await prisma.sendingMethod.findUnique({ where: { id } });
    if (!exists) {
      return NextResponse.json(
        { error: "روش ارسال یافت نشد" },
        { status: 404 }
      );
    }

    // جلوگیری از تکراری شدن هنگام آپدیت
    const duplicate = await prisma.sendingMethod.findFirst({
      where: {
        AND: [
          { id: { not: id } },
          {
            OR: [{ farsiTitle }, { englishTitle }],
          },
        ],
      },
    });

    if (duplicate) {
      return NextResponse.json(
        { error: "روش ارسال دیگری با این عنوان وجود دارد" },
        { status: 409 }
      );
    }

    const updated = await prisma.sendingMethod.update({
      where: { id },
      data: { farsiTitle, englishTitle, baseCost },
    });

    return NextResponse.json(
      { success: true, sendingMethod: updated, message: "روش ارسال ویرایش شد" },
      { status: 200 }
    );
  } catch (e) {
    console.error("PUT SendingMethod error:", e);
    return NextResponse.json(
      { error: "خطای سرور در ویرایش روش ارسال" },
      { status: 500 }
    );
  }
}

/* ------------------------------- DELETE ------------------------------- */
export async function DELETE(request: NextRequest) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.res;

    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "شناسه روش ارسال الزامی است" },
        { status: 400 }
      );
    }

    const exists = await prisma.sendingMethod.findUnique({ where: { id } });
    if (!exists) {
      return NextResponse.json(
        { error: "روش ارسال یافت نشد" },
        { status: 404 }
      );
    }

    // جلوگیری از حذف روش ارسال در صورت وجود سفارش
    const hasOrders = await prisma.order.count({
      where: { shippingMethodId: id },
    });

    if (hasOrders > 0) {
      return NextResponse.json(
        { error: "این روش ارسال به سفارش‌هایی متصل است و قابل حذف نیست" },
        { status: 409 }
      );
    }

    await prisma.sendingMethod.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: "روش ارسال حذف شد" },
      { status: 200 }
    );
  } catch (e) {
    console.error("DELETE SendingMethod error:", e);
    return NextResponse.json(
      { error: "خطای سرور در حذف روش ارسال" },
      { status: 500 }
    );
  }
}
