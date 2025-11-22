import * as zod from "zod";

// نقشه‌ی تبدیل ارقام فارسی و عربی به انگلیسی
const FARSI_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

// تبدیل‌کننده‌ی واحد
export const convertToEnglishDigits = (input: string): string => {
  return input.replace(/[۰-۹٠-٩]/g, (char) => {
    const fIndex = FARSI_DIGITS.indexOf(char);
    if (fIndex !== -1) return String(fIndex);

    const aIndex = ARABIC_DIGITS.indexOf(char);
    if (aIndex !== -1) return String(aIndex);

    return char;
  });
};

// اسکیما با خوانایی بهتر
export const mobileValidation = () =>
  zod.object({
    phone: zod
      .string()
      .trim()
      .transform(convertToEnglishDigits)
      .pipe(
        zod
          .string()
          .min(1, "شماره موبایل الزامی است.")
          .length(11, "شماره موبایل باید دقیقاً ۱۱ رقم باشد.")
          .regex(/^09\d{9}$/, "شماره موبایل باید با ۰۹ شروع شود.")
      ),
  });
