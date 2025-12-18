import { z } from "zod";

export const productFormSchema = z.object({
  basicInfo: z.object({
    persianTitle: z
      .string()
      .min(3, "عنوان فارسی باید حداقل ۳ کاراکتر باشد")
      .max(200, "عنوان فارسی نباید بیشتر از ۲۰۰ کاراکتر باشد")
      .regex(
        /^[\u0600-\u06FF\s0-9\-.,()]+$/,
        "فقط حروف فارسی، عدد و علائم نگارشی مجاز است"
      ),

    englishTitle: z
      .string()
      .max(200, "عنوان انگلیسی نباید بیشتر از ۲۰۰ کاراکتر باشد")
      .optional(),

    shortDescription: z
      .string()
      .min(10, "توضیح کوتاه باید حداقل ۱۰ کاراکتر باشد")
      .max(500, "توضیح کوتاه نباید بیشتر از ۵۰۰ کاراکتر باشد"),

    fullDescription: z
      .string()
      .min(50, "توضیحات کامل باید حداقل ۵۰ کاراکتر باشد")
      .max(10000, "توضیحات کامل نباید بیشتر از ۱۰۰۰۰ کاراکتر باشد"),
  }),

  pricing: z.object({
    price: z
      .number()
      .min(1000, "قیمت باید حداقل ۱,۰۰۰ ریال باشد")
      .max(100000000, "قیمت نمی‌تواند بیشتر از ۱۰۰,۰۰۰,۰۰۰ ریال باشد"),

    comparePrice: z
      .number()
      .optional()
      .refine((val) => !val || val > 0, "قیمت مقایسه باید مثبت باشد"),

    stockQuantity: z
      .number()
      .int("موجودی باید عدد صحیح باشد")
      .min(0, "موجودی نمی‌تواند منفی باشد"),

    sku: z
      .string()
      .min(3, "SKU باید حداقل ۳ کاراکتر باشد")
      .max(50, "SKU نمی‌تواند بیشتر از ۵۰ کاراکتر باشد")
      .regex(
        /^[A-Z0-9\-_]+$/,
        "SKU فقط می‌تواند شامل حروف بزرگ انگلیسی، عدد و خط تیره باشد"
      ),

    taxRate: z
      .number()
      .min(0, "درصد مالیات نمی‌تواند منفی باشد")
      .max(100, "درصد مالیات نمی‌تواند بیشتر از ۱۰۰ باشد"),
  }),

  classification: z.object({
    sparkPlugType: z.enum([
      "COPPER",
      "IRIDIUM",
      "PLATINUM",
      "DOUBLE_PLATINUM",
      "SILVER",
      "V_POWER",
      "LASER_IRIDIUM",
    ]),
    brandId: z.string().uuid("شناسه برند نامعتبر است"),
    categoryIds: z
      .array(z.string().uuid())
      .min(1, "حداقل یک دسته‌بندی انتخاب کنید"),
  }),

  technicalSpecs: z.object({
    threadDiameter: z
      .string()
      .min(1, "قطر رزوه الزامی است")
      .regex(
        /^M\d+(x\d+\.?\d*)?$/,
        "فرمت قطر رزوه نامعتبر است (مثال: M14x1.25)"
      ),

    electrodeGap: z
      .number()
      .min(0.4, "فاصله الکترود باید حداقل ۰.۴ میلی‌متر باشد")
      .max(2.0, "فاصله الکترود نمی‌تواند بیشتر از ۲ میلی‌متر باشد")
      .step(0.05, "فاصله الکترود باید مضرب ۰.۰۵ باشد"),

    heatRange: z.enum(["4", "5", "6", "7", "8", "9", "10"]),

    torqueSpec: z
      .string()
      .regex(
        /^\d+-\d+\s*(N\.m|Nm)$/,
        "فرمت گشتاور نامعتبر است (مثال: 20-25 N.m)"
      ),
  }),

  compatibility: z.object({
    vehicleCompatibility: z
      .array(
        z.object({
          carBrandId: z.string().uuid("شناسه برند خودرو نامعتبر است"),
          carModelId: z.string().uuid("شناسه مدل خودرو نامعتبر است"),
        })
      )
      .min(1, "حداقل یک خودرو برای سازگاری انتخاب کنید"),
  }),

  media: z.object({
    images: z
      .array(
        z.object({
          file: z.any(),
          isMain: z.boolean(),
          altText: z.string().min(3, "متن جایگزین عکس الزامی است"),
        })
      )
      .min(1, "حداقل یک عکس آپلود کنید")
      .max(10, "حداکثر ۱۰ عکس می‌توانید آپلود کنید"),
  }),

  seo: z.object({
    isPublished: z.boolean(),
  }),
});
