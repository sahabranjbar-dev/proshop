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

export function formatPrice(value: string) {
  if (!value) return "";
  const number = Number(value.replace(/,/g, ""));
  if (Number.isNaN(number)) return "";
  return number.toLocaleString("fa-IR");
}

export function unFormatPrice(value: string) {
  if (!value) return "";
  return value.replace(/,/g, "");
}

export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const getFilePreview = (file: File | any) => {
  if (file.publicUrl) return file.publicUrl;
  return URL.createObjectURL(file);
};
