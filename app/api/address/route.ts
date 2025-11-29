import { authOptions } from "@/lib/authOptions";
import { ServerError } from "@/utils/errors";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

/* ---------------------------------- GET ---------------------------------- */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "شما باید وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }

    const addresses = await prisma.address.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      { success: true, addresses, message: "آدرس‌ها با موفقیت دریافت شدند" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting addresses:", error);
    return ServerError();
  }
}

/* --------------------------- Address Schema --------------------------- */
const addressSchema = z.object({
  province: z.string().min(1, "استان اجباری می‌باشد"),
  city: z.string().min(1, "شهر اجباری می‌باشد"),
  address: z.string().min(1, "آدرس اجباری می‌باشد"),
  plaque: z.string().optional(),
  floor: z.string().optional(),
  postalCode: z.string().min(1, "کد پستی اجباری می‌باشد"),
  phone: z.string().optional(),
  recipientName: z.string().optional(),
  title: z.string().optional(),
});

/* ---------------------------------- POST ---------------------------------- */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "شما باید وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }
    const userId = session.user.id;

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "داده‌های ارسالی نامعتبر است" },
        { status: 400 }
      );
    }

    const result = addressSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "داده‌های ورودی نامعتبر", details: result.error.message },
        { status: 400 }
      );
    }

    const addressCount = await prisma.address.count({ where: { userId } });

    const newAddress = await prisma.address.create({
      data: {
        ...result.data,
        userId,
        isDefault: addressCount === 0,
      },
    });

    return NextResponse.json(
      {
        success: true,
        address: newAddress,
        message: "آدرس جدید با موفقیت ثبت شد",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating address:", error);
    return ServerError();
  }
}

/* ---------------------------------- PUT ---------------------------------- */
/*
  PUT باید 2 چیز بگیرد:
  1. id آدرس برای ویرایش → از query
  2. body → اطلاعات جدید
*/
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "شما باید وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }
    const userId = session.user.id;

    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "شناسه آدرس الزامی است" },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "داده‌های ارسالی نامعتبر است" },
        { status: 400 }
      );
    }

    const result = addressSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "داده‌های ورودی نامعتبر", details: result.error.message },
        { status: 400 }
      );
    }

    // چک مالکیت آدرس
    const existingAddress = await prisma.address.findUnique({ where: { id } });
    if (!existingAddress || existingAddress.userId !== userId) {
      return NextResponse.json(
        { error: "شما اجازه ویرایش این آدرس را ندارید" },
        { status: 403 }
      );
    }

    const updated = await prisma.address.update({
      where: { id },
      data: { ...result.data },
    });

    return NextResponse.json(
      {
        success: true,
        address: updated,
        message: "آدرس با موفقیت به‌روزرسانی شد",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating address:", error);
    return ServerError();
  }
}

/* -------------------------------- DELETE -------------------------------- */
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "شما باید وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }
    const userId = session.user.id;

    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "شناسه آدرس الزامی است" },
        { status: 400 }
      );
    }

    const address = await prisma.address.findUnique({ where: { id } });
    if (!address || address.userId !== userId) {
      return NextResponse.json(
        { error: "شما اجازه حذف این آدرس را ندارید" },
        { status: 403 }
      );
    }

    await prisma.address.delete({ where: { id } });

    return NextResponse.json(
      { success: true, message: "آدرس با موفقیت حذف شد" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting address:", error);
    return ServerError();
  }
}
