import { isRequestByAdmin, requireAuth, ServerError } from "@/utils/errors";
import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import z, { string } from "zod";
import { getSlug } from "./utils";
import { SparkPlugType } from "@/constants/spark-plug";

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

  slug: z.string({
    error: "اسلاگ الزامی است",
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

  comparePrice: z.number().optional().nullable(),

  stock: z.number().int().min(0, "موجودی نمی‌تواند منفی باشد").default(0),

  sku: z.string().max(50, "SKU حداکثر ۵۰ کاراکتر است").optional(),

  isPublished: z.boolean().default(true),

  sparkPlugType: z.enum(SparkPlugType),

  isOEM: z.boolean().default(true),

  oemNumber: z.string().nullable().optional(),

  brandId: z.string({
    error: "آیدی برند اجباری می‌باشد",
  }),

  tags: z.array(z.string()),

  isOriginal: z.boolean().optional(),

  isBestSeller: z.boolean().optional(),

  isFeatured: z.boolean().optional(),

  categoryIds: z.array(z.string()).optional(),

  files: z.array(z.string()).optional(),

  electrodeGap: z.number().nullable().optional(),

  heatRange: z.string().nullable().optional(),

  hexSize: z.string().nullable().optional(),

  threadDiameter: z.string().nullable().optional(),

  threadLength: z.string().nullable().optional(),

  centerElectrodeMaterial: z.string().nullable().optional(),

  carModelIds: z.array(
    z.string({
      error: "مدل خودرو الزامی است",
    })
  ),
});

export async function POST(request: NextRequest) {
  try {
    // 1️⃣ بررسی ادمین
    const isAdmin = await isRequestByAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 403 });
    }

    const { session } = await requireAuth();

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
      files = [],
      brandId,
      isOEM,
      isPublished,
      sparkPlugType,
      stock,
      tags,
      comparePrice,
      content,
      description,
      isBestSeller,
      isFeatured,
      isOriginal,
      oemNumber,
      sku,
      electrodeGap,
      heatRange,
      hexSize,
      threadDiameter,
      threadLength,
      centerElectrodeMaterial,
      carModelIds,
    } = parsed.data;

    // 3️⃣ ساخت slug
    const slug = inputSlug || getSlug(title);

    // 4️⃣ بررسی تکراری بودن slug
    const existsSlug = await prisma.product.findUnique({
      where: { slug },
    });

    if (existsSlug) {
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
    const existsSku = await prisma.product.findUnique({
      where: { sku },
    });

    if (existsSku) {
      return NextResponse.json(
        {
          errors: [
            {
              path: "slug",
              message: "این کد کالا قبلاً استفاده شده است",
            },
          ],
        },
        { status: 409 }
      );
    }

    // 5️⃣ ساخت محصول (Transaction برای امنیت)
    const product = await prisma.product.create({
      data: {
        price,
        slug,
        title,
        files: {
          connect: files.map((id) => ({ id })),
        },
        brandId,
        comparePrice,
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },
        content,
        description,
        isBestSeller,
        isFeatured,
        isOEM,
        isOriginal,
        isPublished,
        oemNumber,
        sku,
        stock,
        tags,
        sparkPlugType,
        specifications: {
          create: {
            electrodeGap,
            electrodeMaterial: centerElectrodeMaterial,
            heatRange,
            hexSize,
            threadDiameter,
            threadLength,
          },
        },
        vehicleCompatibility: {
          create: carModelIds.map((carModelId) => ({
            carModelId,
          })),
        },
      },
    });

    const userDraftProduct = await prisma.productDraft.findFirst({
      where: {
        userId: session?.user?.userId,
      },
    });

    await prisma.productDraft.update({
      data: {
        status: "SUBMITTED",
        product: {
          connect: {
            id: product.id,
          },
        },
      },
      where: {
        id: userDraftProduct?.id,
      },
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

export async function PUT(request: NextRequest) {
  try {
    const isAdmin = await isRequestByAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const { id, ...body } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "شناسه محصول الزامی است" },
        { status: 400 }
      );
    }

    const parsedBody = productSchema.safeParse(body);
    if (!parsedBody.success) {
      const errors = parsedBody.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      return NextResponse.json({ errors }, { status: 400 });
    }

    const {
      title,
      price,
      slug,
      categoryIds = [],
      files = [],
      brandId,
      isOEM,
      isPublished,
      sparkPlugType,
      stock,
      tags,
      comparePrice,
      content,
      description,
      isBestSeller,
      isFeatured,
      isOriginal,
      oemNumber,
      sku,
      electrodeGap,
      heatRange,
      hexSize,
      threadDiameter,
      threadLength,
      centerElectrodeMaterial,
      carModelIds,
    } = parsedBody.data;

    const product = await prisma.product.update({
      where: { id },
      data: {
        title,
        price,
        slug,
        brandId,
        comparePrice,
        content,
        description,
        isBestSeller,
        isFeatured,
        isOEM,
        isOriginal,
        isPublished,
        oemNumber,
        sku,
        stock,
        tags,
        sparkPlugType,

        // روابط چندبه‌چند (جایگزینی کامل)
        files: {
          set: files.map((id) => ({ id })),
        },
        categories: {
          set: categoryIds.map((id) => ({ id })),
        },

        // one-to-one → upsert
        specifications: {
          upsert: {
            create: {
              electrodeGap,
              electrodeMaterial: centerElectrodeMaterial,
              heatRange,
              hexSize,
              threadDiameter,
              threadLength,
            },
            update: {
              electrodeGap,
              electrodeMaterial: centerElectrodeMaterial,
              heatRange,
              hexSize,
              threadDiameter,
              threadLength,
            },
          },
        },

        vehicleCompatibility: {
          deleteMany: {}, // حذف همه قبلی‌ها
          create: carModelIds.map((carModelId) => ({
            carModelId,
          })),
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        product,
        message: "محصول با موفقیت ویرایش شد",
      },
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
