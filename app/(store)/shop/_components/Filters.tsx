"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BrandItem from "./BrandItem";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import PriceLimit from "./PriceLimit";
import ElectrodeType from "./ElectrodeType";

const filterItem = [
  { id: 1, value: "brand", title: "برند", component: BrandItem },
  { id: 2, value: "price-limit", title: "محدودیت قیمت", component: PriceLimit },
  {
    id: 3,
    value: "electrode-type",
    title: "نوع الکترود",
    component: ElectrodeType,
  },
];

const Filters = () => {
  return (
    <div>
      <Accordion type="multiple">
        {filterItem.map(({ id, component: Comp, title, value }) => (
          <AccordionItem key={id} value={value}>
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent>
              <Comp />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="exist-products" className="flex-1 cursor-pointer">
            فقط کالا‌های موجود
          </Label>
          <Switch id="exist-products" dir="ltr" />
        </div>
      </div>
    </div>
  );
};

export default Filters;
