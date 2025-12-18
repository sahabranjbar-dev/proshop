import BaseField from "@/components/BaseField/BaseField";
import SwitchComponent from "@/components/SwitchComponent/SwitchComponent";
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
        name="stock"
        component={TextCore}
        label="موجودی انبار"
        required
        number
        formatter
        validate={mustBetween(0, 10_000_000, "موجودی انبار")}
      />

      <BaseField
        name="sku"
        component={TextCore}
        label="کد کالا (منحصربفرد)"
        required
      />

      <BaseField
        component={SwitchComponent}
        name="isPublished"
        text="وضعیت انتشار"
        defaultValue={true}
      />
    </div>
  );
};

export default PricingFields;
