import { convertToEnglishDigits, mobileValidation } from "@/utils/common";
import { ServerError } from "@/utils/errors";
import prisma from "@/utils/prisma";
import bcrypt from "bcryptjs";
import { randomInt } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.phone) {
      body.phone = convertToEnglishDigits(body.phone);
    }

    const validation = mobileValidation().safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: validation.error?.message || "اطلاعات نامعتبر است.",
        },
        { status: 400 }
      );
    }

    const phone = validation.data.phone;

    await prisma.otpCode.deleteMany({
      where: {
        createdAt: {
          lt: new Date(Date.now() - 5 * 60 * 1000),
        },
      },
    });

    const code = randomInt(100_000, 999_999).toString();

    const hashedCode = bcrypt.hashSync(code, 10);

    await prisma.otpCode.upsert({
      where: { phone },
      update: { code: hashedCode, createdAt: new Date() },
      create: { phone, code: hashedCode },
    });

    // await sendSMS(phone, code);
    console.log({ code });

    return NextResponse.json({ success: true, mobile: phone });
  } catch (error) {
    console.error(error);
    return ServerError();
  }
}
