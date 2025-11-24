import { NextResponse } from "next/server";
import { s3Client } from "@/lib/s3/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { nanoid } from "nanoid";
import prisma from "@/utils/prisma";

export async function POST(req: Request) {
  try {
    const { filename, contentType, folder = "uploads" } = await req.json();

    if (!filename || !contentType) {
      return NextResponse.json(
        { error: "filename & contentType required" },
        { status: 400 }
      );
    }

    // ساختن key منحصربه‌فرد (می‌تونی از userId هم استفاده کنی)
    const key = `${folder}/${nanoid()}-${filename.replace(/\s+/g, "-")}`;

    const command = new PutObjectCommand({
      Bucket: process.env.STORAGE_BUCKET,
      Key: key,
      ContentType: contentType,
      // ACL: "public-read", // نکته: در بسیاری سرویس‌ها ACL پیش‌فرض است یا باید policy رو تنظیم کنی
    });

    // signed url (مثلاً 5 دقیقه اعتبار)
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });

    // public URL ساختن — قالبش به provider بستگی داره
    // برای لیارا غالبا: https://storage.iran.liara.ir/<bucket>/<key>
    const publicUrl = `${(process.env.STORAGE_ENDPOINT || "").replace(
      /\/$/,
      ""
    )}/${process.env.STORAGE_BUCKET}/${key}`;

    const files = await prisma.file.create({
      data: {
        key,
        url: publicUrl,
      },
    });

    if (!files) {
      return NextResponse.json(
        { error: "در آپلود فایل مشکلی ایجاد شد" },
        { status: 402 }
      );
    }

    return NextResponse.json(
      { signedUrl, publicUrl, key, fileId: files.id },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
