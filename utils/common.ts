import * as zod from "zod";

export const convertToEnglishDigits = (str: string) => {
  return str
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
};

export const mobileValidation = () => {
  const schema = zod.object({
    phone: zod
      .string({
        error: "شماره موبایل الزامی است.",
      })
      .min(11, { message: "شماره موبایل باید ۱۱ رقم باشد." })
      .max(11, { message: "شماره موبایل باید ۱۱ رقم باشد." })
      .regex(/^09[0-9]{9}$/, { message: "فرمت شماره موبایل صحیح نیست." }),
  });
  return schema;
};
