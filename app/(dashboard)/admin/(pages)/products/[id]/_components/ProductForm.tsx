"use client";

import Form from "@/components/Form/Form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ArrowBigLeft, ArrowBigRight, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import ClassificationFields from "./ClassificationFields";
import MainFields from "./MainFields";
import PricingFields from "./PricingFields";
import ProductFiles from "./ProductFiles";
import TechnicalSpecifications from "./TechnicalSpecifications";
import VehicleCompatibility from "./VehicleCompatibility";

interface ProductFormProps {
  id?: string;
  initialData?: Record<string, any>;
  step?: number;
}

type FormStep = {
  id: number;
  title: string;
  description: string;
  component: React.ReactNode;
};
const formSteps: FormStep[] = [
  {
    id: 1,
    title: "اطلاعات اصلی محصول",
    description: "لطفا اطلاعات پایه و مشخصات کلیدی محصول را وارد نمایید.",
    component: <MainFields />,
  },
  {
    id: 2,
    title: "آپلود تصاویر",
    description: "",
    component: <ProductFiles />,
  },
  {
    id: 3,
    title: "قیمت‌گذاری و موجودی",
    description: "تعیین قیمت، تخفیف‌ها و تنظیمات مرتبط با موجودی انبار.",
    component: <PricingFields />,
  },
  {
    id: 4,
    title: "طبقه‌بندی محصول",
    description:
      "انتخاب دسته‌بندی‌ها، برچسب‌ها و ویژگی‌های محصول برای سازماندهی بهتر.",
    component: <ClassificationFields />,
  },
  {
    id: 5,
    title: "مشخصات فنی",
    description: "",
    component: <TechnicalSpecifications />,
  },
  {
    id: 6,
    title: "سازگاری خودرو",
    description: "",
    component: <VehicleCompatibility />,
  },
];

const ProductForm = ({
  id,
  initialData,
  step: draftStep = 1,
}: ProductFormProps) => {
  const { push, replace } = useRouter();
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step")
    ? Number(searchParams.get("step"))
    : 1;

  // const [currentStep, setCurrentStep] = useState<number>(initialStep);

  const isLastStep = currentStep === formSteps.length;
  const currentStepConfig = formSteps[currentStep - 1];

  const { mutateAsync: setDraft, isPending: draftLoading } = useMutation({
    mutationFn: async (data: Record<string, any>) => {
      const res = await api.put("/admin/products/draft", data);

      return res.data;
    },
    onError: (error: AxiosError<any>) => {
      error.response?.data.errors.forEach((error: any) => {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error(error);
        }
      });
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (data: Record<string, any>) => {
      const res = await api({
        url: "/admin/products",
        method: id ? "PUT" : "POST",
        data,
      });

      return res.data;
    },
  });

  const createDraft = async (formData: Record<string, any>) => {
    if (id) return;
    await setDraft({
      data: JSON.stringify(formData),
      step: draftStep >= formSteps.length ? draftStep : draftStep + 1,
    }).then(async (data) => {
      if (data?.success) {
        if (!isLastStep) {
          push(`?step=${currentStep + 1}`);

          return;
        }
      }
    });
  };

  const handleFormSubmit = async (formData: Record<string, any>) => {
    await createDraft(formData);

    if (!isLastStep) {
      push(`?step=${currentStep + 1}`);
      return;
    }
    await mutateAsync({
      ...formData,
      price: +formData?.price,
      comparePrice: +formData?.comparePrice,
      tags: Array.isArray(formData?.tags) ? formData?.tags : [],
      files: Array.isArray(formData?.files)
        ? formData?.files?.map((item: { fileId: string }) => item.fileId)
        : [],
    })
      .then((data) => {
        if (!data?.success) return;

        toast.success(data?.message);

        replace(`/admin/products/${data?.product?.id}?step=${currentStep}`);
      })
      .catch((error: AxiosError<{ errors: { message: string }[] }>) => {
        const errorData = error.response?.data;

        errorData?.errors.forEach((err) => {
          toast.error(err.message);
        });
      });
  };

  const handlePreviousStep = () => {
    push(`?step=${currentStep - 1}`);
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
              مرحله {currentStep} از {formSteps.length}
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
          <div className="flex-1 flex justify-start items-center gap-2">
            {currentStep > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePreviousStep}
                rightIcon={<ArrowBigRight />}
                className="hover:bg-secondary/80 transition-all"
              >
                بازگشت
              </Button>
            )}

            <Button
              onClick={() => {
                push("/admin/products");
              }}
              variant={"destructive"}
              type="button"
              rightIcon={<X />}
            >
              انصراف
            </Button>
          </div>

          <Button
            type="submit"
            size="lg"
            leftIcon={isLastStep ? null : <ArrowBigLeft />}
            loading={draftLoading}
          >
            {isLastStep ? `تکمیل و ${id ? "ویرایش" : "ثبت"} محصول` : "ادامه"}
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
};

export default ProductForm;
