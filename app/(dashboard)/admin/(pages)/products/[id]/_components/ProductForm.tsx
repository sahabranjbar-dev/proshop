"use client";

import { useState } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import Form from "@/components/Form/Form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import MainFields from "./MainFields";
import PricingFields from "./PricingFields";
import ClassificationFields from "./ClassificationFields";
import TechnicalSpecifications from "./TechnicalSpecifications";
import VehicleCompatibility from "./VehicleCompatibility";

interface ProductFormProps {
  id?: string;
  initialData?: Record<string, any>;
}

type FormStep = {
  id: number;
  title: string;
  description: string;
  component: React.ReactNode;
};

const ProductForm = ({ id, initialData }: ProductFormProps) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const formSteps: FormStep[] = [
    {
      id: 1,
      title: "اطلاعات اصلی محصول",
      description: "لطفا اطلاعات پایه و مشخصات کلیدی محصول را وارد نمایید.",
      component: <MainFields />,
    },
    {
      id: 2,
      title: "قیمت‌گذاری و موجودی",
      description: "تعیین قیمت، تخفیف‌ها و تنظیمات مرتبط با موجودی انبار.",
      component: <PricingFields />,
    },
    {
      id: 3,
      title: "طبقه‌بندی محصول",
      description:
        "انتخاب دسته‌بندی‌ها، برچسب‌ها و ویژگی‌های محصول برای سازماندهی بهتر.",
      component: <ClassificationFields />,
    },
    {
      id: 4,
      title: "مشخصات فنی",
      description: "",
      component: <TechnicalSpecifications />,
    },
    {
      id: 5,
      title: "سازگاری خودرو",
      description: "",
      component: <VehicleCompatibility />,
    },
  ];

  const isLastStep = currentStep === formSteps.length - 1;
  const currentStepConfig = formSteps[currentStep];

  const handleFormSubmit = (formData: Record<string, any>) => {
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // ارسال نهایی داده‌های فرم
      console.log("فرم نهایی:", formData);
      // TODO: ارسال به API یا پردازش نهایی
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Form onSubmit={handleFormSubmit} defaultValues={initialData}>
      <Card className="shadow-lg border-border/40">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-primary">
              {currentStepConfig.title}
            </CardTitle>
            <div className="text-sm font-medium text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
              مرحله {currentStep + 1} از {formSteps.length}
            </div>
          </div>
          <CardDescription className="text-base leading-relaxed">
            {currentStepConfig.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="animate-fade-in">{currentStepConfig.component}</div>
        </CardContent>

        <CardFooter className="border-t pt-6 flex justify-between items-center">
          <div className="flex-1">
            {currentStep > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePreviousStep}
                className="gap-2 font-semibold hover:bg-secondary/80 transition-all"
              >
                <ArrowBigRight className="h-5 w-5" />
                بازگشت
              </Button>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="px-8 font-bold min-w-[120px] transition-all hover:scale-[1.02]"
            leftIcon={isLastStep ? null : <ArrowBigLeft className="h-5 w-5" />}
          >
            {isLastStep ? "تکمیل و ثبت محصول" : "ادامه"}
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
};

export default ProductForm;
