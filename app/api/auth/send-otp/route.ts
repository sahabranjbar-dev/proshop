import { convertToEnglishDigits, mobileValidation } from "@/utils/common";
import { ServerError } from "@/utils/errors";
import prisma from "@/utils/prisma";
import bcrypt from "bcryptjs";
import { randomInt } from "crypto";
import { NextRequest, NextResponse } from "next/server";

// زمان‌بندی‌ها
const RESEND_DELAY = 60 * 1000; // 60 ثانیه تا درخواست مجدد
const EXPIRE_TIME = 2 * 60 * 1000; // 2 دقیقه انقضای کد OTP

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ۱. استانداردسازی و اعتبارسنجی شماره تلفن
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

    // ۲. بررسی Rate Limiting (محدودیت نرخ ارسال)
    const lastOtp = await prisma.otpCode.findUnique({
      where: { phone },
    });

    if (lastOtp) {
      const timeSinceLastRequest =
        new Date().getTime() - lastOtp.createdAt.getTime();

      if (timeSinceLastRequest < RESEND_DELAY) {
        const remainingTimeSeconds = Math.ceil(
          (RESEND_DELAY - timeSinceLastRequest) / 1000
        );

        return NextResponse.json(
          {
            error: `لطفاً ${remainingTimeSeconds} ثانیه برای دریافت مجدد کد صبر کنید.`,
          },
          { status: 429 } // Too Many Requests
        );
      }
    }

    // ۳. پاک‌سازی کدهای منقضی شده (بهتر است این کار توسط Cron Job انجام شود، اما در اینجا موقتاً انجام می‌شود)
    // پاک کردن تمام کدهایی که زمان انقضایشان (expiresAt) گذشته است
    await prisma.otpCode.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    // ۴. تولید و هش کردن کد
    const code = randomInt(100_000, 999_999).toString();
    const hashedCode = bcrypt.hashSync(code, 10);
    const expirationDate = new Date(Date.now() + EXPIRE_TIME);

    // ۵. ذخیره یا به‌روزرسانی کد در دیتابیس (Upsert)
    await prisma.otpCode.upsert({
      where: { phone },
      update: {
        code: hashedCode,
        expiresAt: expirationDate,
        createdAt: new Date(), // زمان درخواست را آپدیت می‌کنیم تا Rate Limit مجدداً محاسبه شود
      },
      create: {
        phone,
        code: hashedCode,
        expiresAt: expirationDate,
        createdAt: new Date(),
      },
    });

    // ۶. ارسال پیامک (این قسمت نیاز به پیاده‌سازی سرویس پیامکی شما دارد)
    // await sendSMS(phone, code);
    console.log(`[OTP] Code for ${phone}: ${code}`);

    return NextResponse.json({ success: true, mobile: phone });
  } catch (error) {
    console.error(error);
    return ServerError();
  }
}
