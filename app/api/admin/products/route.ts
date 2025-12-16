import { isRequestByAdmin, ServerError } from "@/utils/errors";
import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { getSlug } from "./utils";

export async function GET(request: NextRequest) {
  try {
    const isAdmin = await isRequestByAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") || "";
    const fromPrice = searchParams.get("fromPrice");
    const toPrice = searchParams.get("toPrice");

    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;

    const sortBy = searchParams.get("sortField") || "createdAt";
    const sortOrder =
      searchParams.get("sortDirection") === "asc" ? "asc" : "desc";

    const where: any = {};

    if (title) {
      where.title = {
        contains: title,
        mode: "insensitive",
      };
    }

    if (fromPrice || toPrice) {
      where.price = {
        gte: fromPrice ? Number(fromPrice) : undefined,
        lte: toPrice ? Number(toPrice) : undefined,
      };
    }

    const products = await prisma.product.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { [sortBy]: sortOrder },
      where,
      select: {
        id: true,
        price: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        files: {
          select: {
            id: true,
            url: true,
            key: true,
          },
        },
      },
    });

    const productsData = products.map((product, index) => ({
      ...product,
      rowNumber: (page - 1) * pageSize + index + 1,
    }));

    const totalItems = await prisma.product.count({
      where,
    });

    return NextResponse.json({
      resultList: productsData,
      totalItems,
      page,
      pageSize,
      totalPages: Math.ceil(totalItems / pageSize),
    });
  } catch (error) {
    console.error(error);
    return ServerError();
  }
}

const productSchema = z.object({
  title: z
    .string({
      error: "نام محصول (Title) اجباری می‌باشد",
    })
    .min(3, "نام محصول حداقل باید ۳ کاراکتر باشد"),

  slug: z.string().optional(),
  brandId: z.string({
    error: "آیدی برند اجباری می‌باشد",
  }),
  description: z
    .string()
    .max(500, "توضیحات کوتاه حداکثر ۵۰۰ کاراکتر است")
    .optional(),

  content: z.string().optional(),

  price: z
    .number({
      error: "قیمت فروش اجباری می‌باشد",
    })
    .positive("قیمت باید بزرگتر از صفر باشد"),

  comparePrice: z.number().optional().nullable(), // قیمت خط خورده

  stock: z.number().int().min(0, "موجودی نمی‌تواند منفی باشد").default(0),

  sku: z.string().max(50, "SKU حداکثر ۵۰ کاراکتر است").optional(),

  isPublished: z.boolean().default(true),

  // روابط (IDs)
  categoryIds: z.array(z.string()).optional(), // آرایه‌ای از ID دسته‌بندی‌ها
  fileIds: z.array(z.string()).optional(), // آرایه‌ای از ID فایل‌های آپلود شده
});

export async function POST(request: NextRequest) {
  try {
    // 1️⃣ بررسی ادمین
    const isAdmin = await isRequestByAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 403 });
    }

    const body = await request.json();

    // 2️⃣ اعتبارسنجی
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));

      return NextResponse.json({ errors }, { status: 400 });
    }

    const {
      title,
      price,
      slug: inputSlug,
      categoryIds = [],
      fileIds = [],
      brandId,
      ...rest
    } = parsed.data;

    // 3️⃣ ساخت slug
    const slug = inputSlug || getSlug(title);

    // 4️⃣ بررسی تکراری بودن slug
    const exists = await prisma.product.findUnique({
      where: { slug },
    });

    if (exists) {
      return NextResponse.json(
        {
          errors: [
            {
              path: "slug",
              message: "این اسلاگ قبلاً استفاده شده است",
            },
          ],
        },
        { status: 409 }
      );
    }

    // 5️⃣ ساخت محصول (Transaction برای امنیت)
    const product = await prisma.$transaction(async (tx) => {
      return tx.product.create({
        data: {
          title,
          price,
          slug,
          ...rest,

          brand: {
            connect: { id: brandId },
          },

          // many-to-many categories
          categories: {
            connect: categoryIds.map((id) => ({ id })),
          },

          // one-to-many files (چند تصویر)
          files: {
            connect: fileIds.map((id) => ({ id })),
          },
        },
        include: {
          files: true,
          categories: true,
          brand: true,
        },
      });
    });

    // 6️⃣ پاسخ موفق
    return NextResponse.json(
      {
        success: true,
        product,
        message: "محصول با موفقیت ایجاد شد",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[CREATE_PRODUCT_ERROR]", error);
    return ServerError();
  }
}

const productUpdateSchema = z.object({
  id: z.string({
    error: "آیدی اجباری می‌باشد",
  }),
});
export async function PUT(request: NextRequest) {
  try {
    const isAdmin = await isRequestByAdmin();

    if (!isAdmin) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const body = await request.json();

    const parsedBody = productUpdateSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: parsedBody.error.message },
        { status: 400 }
      );
    }

    const { id } = parsedBody.data;
    const product = await prisma.product.update({
      data: {},
      where: {
        id,
      },
    });

    return NextResponse.json(
      { success: true, product, message: "محصول با موفقیت ویرایش شد" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return ServerError();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const isAdmin = await isRequestByAdmin();

    if (!isAdmin) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }
    const { searchParams } = new URL(request.url);

    // گرفتن فیلترها
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 401 });
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      { success: true, message: "محصول با موفقیت ویرایش شد" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return ServerError();
  }
}
