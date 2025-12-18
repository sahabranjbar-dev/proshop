import BaseField from "@/components/BaseField/BaseField";
import Combobox from "@/components/Combobox/Combobox";
import { TextCore } from "@/components/TextCore/TextCore";
import { Separator } from "@/components/ui/separator";
import { sparkPlugTypeOptions, thermalRange } from "@/constants/spark-plug";
import React from "react";

const TechnicalSpecifications = () => {
  return (
    <div className="flex flex-col justify-start items-start gap-10 w-full">
      <div className="w-full">
        <h2 className="text-lg font-semibold">ابعاد</h2>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BaseField
            name="threadDiameter"
            component={TextCore}
            label="قطر رزوه"
            required
          />
          <BaseField
            name="threadLength"
            component={TextCore}
            label="طول رزوه"
          />
          <BaseField name="hexSize" component={TextCore} label="سایز آچار" />
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-lg font-semibold">الکترود</h2>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BaseField
            name="electrodeGap"
            component={TextCore}
            label="فاصله الکترود"
            number
          />

          <BaseField
            component={Combobox}
            name="centerElectrodeMaterial"
            label="جنس الکترود مرکزی"
            options={sparkPlugTypeOptions}
          />

          <BaseField
            name="heatRange"
            component={Combobox}
            label="رنج حرارتی"
            options={thermalRange}
          />
        </div>
      </div>
    </div>
  );
};

export default TechnicalSpecifications;
