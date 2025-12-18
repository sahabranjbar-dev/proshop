import BaseField from "@/components/BaseField/BaseField";
import Combobox from "@/components/Combobox/Combobox";
import MultiselectCombobox from "@/components/MultiselectCombobox/MultiselectCombobox";
import ComboboxItemDataGetter from "@/container/ComboboxItemDataGetter/ComboboxItemDataGetter";
import React from "react";
import { useFormContext } from "react-hook-form";

const VehicleCompatibility = () => {
  const { watch, setValue } = useFormContext();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ComboboxItemDataGetter
        queryKey={["car-brand"]}
        url="/admin/products/car-brand"
      >
        <BaseField
          name="carBrandId"
          component={Combobox}
          label="برند خودرو"
          required
          getLabel={(data: { name: string }) => data?.name}
          onChange={() => {
            if (!watch("carModelId")) return;
            setValue("carModelId", null);
          }}
        />
      </ComboboxItemDataGetter>
      <ComboboxItemDataGetter
        queryKey={["car-model", watch("carBrandId")]}
        url={`/admin/products/car-model/${watch("carBrandId")}`}
        enabled={!!watch("carBrandId")}
      >
        <BaseField
          name="carModelIds"
          component={MultiselectCombobox}
          label="مدل خودرو"
          required
          getLabel={(data: { name: string }) => data?.name}
          disabled={!watch("carBrandId")}
        />
      </ComboboxItemDataGetter>
    </div>
  );
};

export default VehicleCompatibility;
