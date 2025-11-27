// 💡 Generics <T> به TypeScript اجازه می‌دهد نوع داده بازگشتی را بداند
export const getLocal = <T>(key: string): T | null => {
  if (typeof window === "undefined") {
    // جلوگیری از اجرا در محیط SSR
    return null;
  }

  try {
    const rawData = localStorage.getItem(key);

    // اگر داده‌ای وجود نداشت یا رشته خالی بود، null برمی‌گردد
    if (!rawData) {
      return null;
    }

    // JSON.parse داده را به نوع T تبدیل می‌کند
    const localData: T = JSON.parse(rawData);
    return localData;
  } catch (error) {
    console.error(
      `خطا در بازیابی داده از localStorage برای کلید: ${key}`,
      error
    );
    // بهتر است در صورت خطا null برگردانده شود تا برنامه Crash نکند
    return null;
  }
};

// 💡 Generics <T> به TypeScript اجازه می‌دهد نوع داده ورودی را بداند
export const setLocal = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") {
    // جلوگیری از اجرا در محیط SSR
    return;
  }

  try {
    const stringifyValue = JSON.stringify(value);
    localStorage.setItem(key, stringifyValue);
  } catch (error) {
    console.error(`خطا در ذخیره داده در localStorage برای کلید: ${key}`, error);
    // می‌توان به جای throw کردن، فقط خطا را log کرد.
  }
};
