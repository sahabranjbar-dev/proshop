// app/dashboard/products/create/types.ts
export type SparkPlugType =
  | "COPPER" // مس
  | "IRIDIUM" // ایریدیوم
  | "PLATINUM" // پلاتینیوم
  | "DOUBLE_PLATINUM" // دو پلاتینیوم
  | "SILVER" // نقره
  | "V_POWER" // V-Power مخصوص NGK
  | "LASER_IRIDIUM"; // Laser Iridium مخصوص Denso

export type ResistorType =
  | "RESISTOR" // مقاومت دار
  | "NON_RESISTOR" // بدون مقاومت
  | "RFI_SUPPRESSED"; // کاهش دهنده نویز RFI

export type HeatRange = "4" | "5" | "6" | "7" | "8" | "9" | "10";

export interface ProductImage {
  id?: string;
  file: File | string; // File جدید یا URL موجود
  isMain: boolean;
  order: number;
  altText: string;
}

export interface VehicleCompatibility {
  carBrandId: string;
  carModelId: string;
  yearRange?: {
    from: number; // مثلا 1390
    to: number; // مثلا 1395
  };
  engineCode?: string; // مثلا TU5JP4
  isExactMatch: boolean;
  notes?: string;
}

export interface OEMNumber {
  number: string;
  description?: string;
  carBrandId?: string;
}

export interface CrossReference {
  targetProductId: string;
  referenceType: "EXACT" | "UPGRADE" | "COMPATIBLE" | "ALTERNATIVE";
  compatibilityLevel: number; // 0-100
  notes?: string;
}

export interface TechnicalSpecification {
  // ابعاد
  threadDiameter: string; // M14x1.25 - حیاتی!
  threadLength: string; // 19mm
  hexSize: string; // 16mm
  seatType?: string; // Tapered Seat, Gasket Seat
  reach?: string; // طول کلی

  // الکترود
  electrodeGap: number; // 0.8 (میلی‌متر)
  centerElectrodeMaterial: string; // Iridium, Platinum, Copper
  groundElectrodeMaterial?: string;
  electrodeDesign?: string; // Fine Wire, V-Groove, U-Groove

  // مشخصات الکتریکی
  heatRange: HeatRange;
  resistorType: ResistorType;
  ignitionVoltage?: string; // ولتاژ مورد نیاز

  // ساختار
  construction: string; // Standard, Iridium IX, Laser Iridium
  insulatorMaterial?: string; // آلومینا سرامیک
  sealType?: string; // Glass Seal, Compound Seal

  // گارانتی و عمر
  warrantyKm?: number; // کیلومتر گارانتی
  expectedLifetimeKm?: number; // عمر مفید
  torqueSpec: string; // 20-25 N.m

  // استانداردها
  standards?: string[]; // ISO, DIN, JIS
}

export interface CreateProductFormData {
  // بخش ۱: اطلاعات پایه
  basicInfo: {
    persianTitle: string; // شمع ایریدیوم NGK BPR6EIX
    englishTitle?: string; // NGK Iridium IX Spark Plug
    slug?: string; // ngk-bpr6eix-iridium-spark-plug
    shortDescription: string; // توضیح ۱-۲ خطی
    fullDescription: string; // توضیحات کامل HTML
  };

  // بخش ۲: قیمت و موجودی
  pricing: {
    price: number; // قیمت به ریال
    comparePrice?: number; // قیمت قبل از تخفیف
    costPrice?: number; // قیمت تمام شده
    stockQuantity: number; // تعداد موجود
    lowStockThreshold: number; // آستانه کمبود موجودی
    sku: string; // NGK-BPR6EIX-4PK
    barcode?: string; // بارکد
    taxRate: number; // درصد مالیات (مثلا ۹)
  };

  // بخش ۳: نوع و برند
  classification: {
    sparkPlugType: SparkPlugType;
    isOEM: boolean;
    isOriginal: boolean; // اصل/تقلبی
    isBestSeller: boolean;
    isFeatured: boolean; // محصول ویژه
    brandId: string;
    categoryIds: string[];
    tags: string[]; // ['ایریدیوم', 'پرفروش', 'گارانتی دار']
  };

  // بخش ۴: مشخصات فنی
  technicalSpecs: TechnicalSpecification;

  // بخش ۵: سازگاری با خودرو
  compatibility: {
    vehicleCompatibility: VehicleCompatibility[];
    universalNotes?: string; // توضیحات کلی سازگاری
    installationNotes?: string; // نکات نصب
  };

  // بخش ۶: OEM و ارجاعات
  references: {
    oemNumbers: OEMNumber[];
    crossReferences: CrossReference[];
    alternativeNumbers?: string[]; // شماره‌های جایگزین
  };

  // بخش ۷: رسانه
  media: {
    images: ProductImage[];
    videoUrl?: string; // لینک ویدیو نصب یا معرفی
    documents?: File[]; // کاتالوگ، دفترچه راهنما
  };

  // بخش ۸: سئو و انتشار
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    canonicalUrl?: string;
    isPublished: boolean;
    publishDate?: Date;
  };

  // بخش ۹: حمل و نقل
  shipping: {
    weight: number; // وزن به گرم
    dimensions: {
      length: number; // سانتی‌متر
      width: number;
      height: number;
    };
    isFragile: boolean;
    shippingClass?: string; // کلاس حمل و نقل
  };
}

// نوع برای فرم React Hook Form
export type ProductFormValues = CreateProductFormData;
