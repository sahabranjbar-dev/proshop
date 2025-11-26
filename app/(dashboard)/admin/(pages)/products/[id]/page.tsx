import { authOptions } from "@/lib/authOptions";
import { Role } from "@/types/common";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import ProductForm from "./components/ProductForm";
import { notFound } from "next/navigation";

const serializePrismaData = (product: any) => {
  if (!product) return null;

  const serializedProduct = { ...product };

  // 1. تبدیل قیمت‌ها به رشته (برای حفظ دقت مالی)
  if (serializedProduct.price) {
    serializedProduct.price = serializedProduct.price.toString();
  }
  if (serializedProduct.comparePrice) {
    // comparePrice اختیاری (Nullable) است
    serializedProduct.comparePrice = serializedProduct.comparePrice.toString();
  }

  // 2. آماده‌سازی روابط Many-to-Many برای فُرم (اختیاری اما مفید)
  // تبدیل لیست آبجکت‌های دسته‌بندی به آرایه‌ای از IDها
  if (serializedProduct.categories) {
    serializedProduct.categoryIds = serializedProduct.categories.map(
      (cat: { id: string }) => cat.id
    );
  }

  return serializedProduct;
};

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await getServerSession(authOptions);

  // ۱. بررسی دسترسی ادمین
  if (session?.user?.role !== Role.ADMIN) {
    return "شما دسترسی به این صفحه ندارید";
  }

  const resolvedParams = await params;

  const { id } = resolvedParams;

  // ۲. Fetch کردن تمام دسته‌بندی‌ها (برای فیلد Select در فُرم)
  const allCategories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
    // اگر از سلسله مراتبی استفاده می‌کنید، می‌توانید آن را هم در اینجا فچ کنید
  });

  // ۳. حالت ایجاد محصول جدید
  if (id === "new-product") {
    // در حالت ایجاد، فقط لیست کامل دسته‌بندی‌ها را می‌فرستیم
    return <ProductForm categoriesData={allCategories} />;
  }

  // ۴. حالت ویرایش محصول موجود
  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      // فیلدهای اصلی برای ویرایش
      id: true,
      title: true,
      slug: true,
      description: true,
      content: true,
      price: true,
      comparePrice: true,
      stock: true,
      sku: true,
      isPublished: true,

      // روابط مورد نیاز برای فُرم
      files: {
        select: {
          id: true,
          url: true, // برای نمایش تصاویر آپلود شده
          key: true,
        },
      },
      categories: {
        select: {
          id: true, // فقط ID و Name دسته‌بندی‌های انتخاب شده لازم است
          name: true,
        },
      },

      // فیلدهای تاریخ
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!product) {
    // اگر محصول پیدا نشد، خطای 404 نمایش داده شود
    return notFound();
  }

  const initialData = serializePrismaData(product);
  // ۵. پاس دادن داده‌ها به فُرم
  return (
    <ProductForm
      id={product.id}
      initialData={initialData} // شامل اطلاعات محصول و دسته‌بندی‌های انتخاب شده
      categoriesData={allCategories} // شامل لیست کامل دسته‌بندی‌ها
    />
  );
};

export default ProductPage;
