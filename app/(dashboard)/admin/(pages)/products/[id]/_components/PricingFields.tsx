import BaseField from "@/components/BaseField/BaseField";
import { TextCore } from "@/components/TextCore/TextCore";
import { mustBetween } from "@/utils/common";
import React from "react";

const PricingFields = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <BaseField
        name="price"
        component={TextCore}
        required
        label="قیمت فروش"
        number
        formatter
        validate={mustBetween(1_000, 100_000_000, "قیمت فروش")}
      />
      <BaseField
        name="comparePrice"
        component={TextCore}
        label="قیمت قبل از تخفیف"
        number
        formatter
      />
      <BaseField
        name="costPrice"
        component={TextCore}
        label="قیمت تمام شده (برای محاسبه سود)"
        number
        formatter
      />
      <BaseField
        name="stockQuantity"
        component={TextCore}
        label="موجودی انبار"
        required
        number
        formatter
        validate={mustBetween(0, 10_000_000, "موجودی انبار")}
      />

      <BaseField
        name="lowStockThreshold"
        component={TextCore}
        label="آستانه هشدار کمبود موجودی"
        number
        formatter
        validate={mustBetween(1, 100, "آستانه هشدار کمبود موجودی")}
      />

      <BaseField
        name="sku"
        component={TextCore}
        label="کد کالا (منحصربفرد)"
        required
      />
      <BaseField name="barcode" component={TextCore} label="بارکد محصول" />

      <BaseField
        name="taxRate"
        component={TextCore}
        label="درصد مالیات بر ارزش افزوده"
        number
        formatter
        validate={mustBetween(0, 100, "درصد مالیات بر ارزش افزوده")}
      />
    </div>
  );
};

export default PricingFields;
