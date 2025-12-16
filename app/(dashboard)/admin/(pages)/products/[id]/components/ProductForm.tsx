"use client";
import BaseField from "@/components/BaseField/BaseField";
import Combobox from "@/components/Combobox/Combobox";
import FileUpload from "@/components/FileUpload/FileUpload";
import Form from "@/components/Form/Form";
import FormButtons from "@/components/FormButtons/FormButtons";
import { TextCore } from "@/components/TextCore/TextCore";
import { Textarea } from "@/components/ui/textarea";
import ComboboxItemDataGetter from "@/container/ComboboxItemDataGetter/ComboboxItemDataGetter";
import api from "@/lib/axios";
import { Checkbox } from "@radix-ui/react-checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// فرض می‌کنیم این رابط‌های داده‌ای برای دسته‌بندی‌ها و فایل‌ها هستند
interface Category {
  id: string;
  name: string;
}

interface ProductFormProps {
  id?: string; // اختیاری برای حالت ویرایش
  // اگر در حالت ویرایش هستیم، باید دیتای اولیه محصول را هم بگیریم
  initialData?: any;
  categoriesData?: Category[]; // دیتای دسته‌بندی‌ها برای فیلد Select
}

const ProductForm = ({
  id,
  initialData,
  categoriesData = [],
}: ProductFormProps) => {
  const { replace } = useRouter();

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    // از isPending برای دکمه لودینگ استفاده می‌کنیم
    mutationFn: async (data: any) => {
      // اگر در حالت ویرایش باشیم، id را به URL اضافه می‌کنیم
      const url = id ? `/admin/products/${id}` : "/admin/products";

      const response = await api({
        method: id ? "PUT" : "POST",
        url: url,
        data,
      });

      return response.data;
    },
    onError(error: AxiosError<{ error: string }>) {
      // ... مدیریت خطا ...
      const errors = JSON.parse(error.response?.data.error ?? "") as {
        message: string;
      }[];

      errors.forEach((item) => {
        toast.error(item.message);
      });
    },
    onSuccess: (data: { product: any; success: boolean; message: string }) => {
      if (data.success) {
        toast.success(data.message);

        queryClient.invalidateQueries({
          queryKey: ["products"],
        });

        // در حالت ساخت محصول جدید، به صفحه ویرایش جدید ریدایرکت می‌کنیم
        // if (!id) replace(`/admin/products/${data.product.id}`);
      }
    },
  });

  const onSubmit = (data: any) => {
    // تبدیل قیمت‌ها و موجودی به عدد قبل از ارسال به API
    const processedData = {
      ...data,
      price: parseFloat(data.price),
      comparePrice: data.comparePrice ? parseFloat(data.comparePrice) : null,
      stock: parseInt(data.stock, 10),
      fileIds: data?.files?.map((file: any) => file.fileId) || [],
    };

    mutateAsync(processedData);
  };

  // تبدیل دیتای دسته‌بندی‌ها برای فیلد Select
  const categoryOptions = [{}];

  return (
    <Form
      className="grid grid-cols-1 md:grid-cols-3 gap-6 border shadow bg-white p-4 rounded-lg"
      onSubmit={onSubmit}
      defaultValues={initialData} // برای حالت ویرایش
    >
      {/* ستون‌های ۱ و ۲ برای فیلدهای اصلی و متنی */}
      <div className="md:col-span-2 space-y-6">
        <h3 className="text-lg font-bold">اطلاعات اصلی محصول</h3>
        {/* 1. title */}
        <BaseField
          component={TextCore} // از input معمولی استفاده می‌کنیم
          name="title"
          label="نام محصول (Title)"
          required
        />
        {/* 2. slug (باید هنگام نوشتن title به صورت خودکار پیشنهاد شود) */}
        <BaseField
          component={TextCore}
          name="slug"
          label="اسلاگ (Slug - آدرس URL)"
        />

        <hr />

        {/* 3. description */}
        <BaseField
          component={Textarea}
          name="description"
          label="توضیحات"
          placeholder="خلاصه محصول برای نمایش در لیست‌ها و SEO"
        />

        <hr />

        <h3 className="text-lg font-bold">قیمت و موجودی</h3>
        <div className="grid grid-cols-3 gap-4">
          {/* 5. price */}
          <BaseField
            component={TextCore}
            name="price"
            label="قیمت فروش (تومان)"
            required
            formatter
          />
          {/* 6. comparePrice */}
          <BaseField
            component={TextCore}
            name="comparePrice"
            label="قیمت مقایسه (خط خورده)"
            number
            formatter
            disabled
          />
          {/* 7. stock */}
          <BaseField
            component={TextCore}
            name="stock"
            label="موجودی (عدد)"
            required
            number
            formatter={false}
          />
        </div>
        {/* 8. sku */}
        <BaseField
          component={TextCore}
          name="sku"
          label="کد انبار (SKU)"
          placeholder="اختیاری: کد منحصر به فرد داخلی برای انبارداری"
        />
      </div>

      {/* ستون ۳ برای روابط و متادیتا (Side panel) */}
      <div className="md:col-span-1 space-y-6">
        <h3 className="text-lg font-bold">تنظیمات و روابط</h3>

        {/* 9. isPublished */}
        <BaseField
          component={Checkbox}
          name="isPublished"
          label="وضعیت انتشار"
          defaultValue={true}
        />

        <hr />

        {/* 10. categories (رابطه Many-to-Many) */}
        {/* <BaseField
          component={Combobox}
          name="categoryIds" // نام فیلد را به صورت `categoryIds` برای ارسال آرایه‌ای از IDها تنظیم می‌کنیم
          label="دسته‌بندی‌ها"
          options={categoryOptions} // دیتای دسته‌بندی‌ها
          placeholder="یک یا چند دسته‌بندی را انتخاب کنید"
        /> */}

        <ComboboxItemDataGetter
          queryKey={["admin", "brand"]}
          url="/admin/brands"
        >
          <BaseField
            component={Combobox}
            name="brandId"
            label="برندها"
            placeholder="یک برند را انتخاب کنید"
            keyField="id"
          />
        </ComboboxItemDataGetter>

        {/* 11. files (رابطه File[]) */}
        <BaseField
          component={FileUpload}
          name="files" // باید قابلیت آپلود چند فایل را داشته باشد
          label="تصاویر/فایل‌های محصول"
          multiple
        />

        <hr />

        {/* دکمه‌های فرم */}
        <FormButtons
          cancelUrl="/admin/products"
          id={id}
          submitLoading={isPending}
        />
      </div>
    </Form>
  );
};

export default ProductForm;
