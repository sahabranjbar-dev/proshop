"use client";
import BaseField from "@/components/BaseField/BaseField";
import Combobox from "@/components/Combobox/Combobox";
import MultiselectCombobox from "@/components/MultiselectCombobox/MultiselectCombobox";
import SwitchComponent from "@/components/SwitchComponent/SwitchComponent";
import TagInput from "@/components/TagInput/TagInput";
import { Checkbox } from "@/components/ui/checkbox";
import { sparkPlugTypeOptions } from "@/constants/spark-plug";
import ComboboxItemDataGetter from "@/container/ComboboxItemDataGetter/ComboboxItemDataGetter";

const ClassificationFields = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <BaseField
        name="sparkPlugType"
        component={Combobox}
        label="نوع شمع"
        options={sparkPlugTypeOptions}
        required
      />

      <ComboboxItemDataGetter
        queryKey={["brand", "product"]}
        url="/admin/brands"
      >
        <BaseField name="brandId" component={Combobox} label="برند" required />
      </ComboboxItemDataGetter>

      <ComboboxItemDataGetter
        queryKey={["categories", "product"]}
        url="/admin/products/categories"
      >
        <BaseField
          name="categoriesIds"
          component={MultiselectCombobox}
          label="دسته‌بندی‌"
          keyField="id"
          required
        />
      </ComboboxItemDataGetter>

      <BaseField
        component={TagInput}
        name="tags"
        label="کلمات کلیدی برای جستجو"
        description="برای افزودن کلمات کلیدی، Enter یا Return را فشار دهید"
      />

      <BaseField
        component={SwitchComponent}
        name="isOEM"
        text="آیا قطعه اصلی کارخانه است؟"
      />
      <BaseField
        component={SwitchComponent}
        name="isOriginal"
        text="اصل/تقلبی"
        defaultValue={true}
      />
      <BaseField component={Checkbox} name="isBestSeller" text="نشان پرفروش" />
      <BaseField
        component={Checkbox}
        name="isFeatured"
        text="محصول ویژه (نمایش در صفحه اول)"
      />
    </div>
  );
};

export default ClassificationFields;
