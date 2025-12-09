"use client";

import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../Logo/Logo";

const footerData = [
  {
    title: "اطلاعات فروشگاه",
    items: [
      { id: 1, title: "درباره ما", url: "/about" },
      { id: 2, title: "هدف و تخصص فروشگاه", url: "/mission" },
      { id: 3, title: "تضمین اصالت کالا", url: "/authenticity-guarantee" },
      { id: 4, title: "شماره تماس و پشتیبانی", url: "/contact" },
    ],
  },
  {
    title: "خدمات مشتری",
    items: [
      { id: 1, title: "شرایط بازگشت کالا", url: "/return-policy" },
      { id: 2, title: "گارانتی کالا‌ها", url: "/warranty" },
      { id: 3, title: "پشتیبانی فنی", url: "/technical-support" },
      { id: 4, title: "پیگیری سفارش", url: "/track-order" },
    ],
  },
  {
    title: "راهنما",
    items: [
      { id: 1, title: "راهنمای خرید", url: "/shopping-guide" },
      {
        id: 2,
        title: "نحوه انتخاب شمع مناسب خودرو",
        url: "/spark-plug-selection",
      },
      { id: 3, title: "نحوه ارسال و زمان‌بندی", url: "/shipping" },
      { id: 4, title: "سوالات متداول (FAQ)", url: "/faq" },
    ],
  },
  {
    title: "قوانین و سیاست‌ها",
    items: [
      { id: 1, title: "قوانین و مقررات", url: "/terms" },
      { id: 2, title: "سیاست حریم خصوصی", url: "/privacy" },
      { id: 3, title: "شرایط استفاده از سایت", url: "/conditions" },
    ],
  },
];

const socialMediaIcon = [
  {
    id: 1,
    src: "/svg/whatsapp.svg",
    title: "واتساپ",
    url: "https://wa.me/your-number",
  },
  {
    id: 2,
    src: "/svg/telegram.svg",
    title: "تلگرام",
    url: "https://t.me/your-channel",
  },
  {
    id: 3,
    src: "/svg/instagram.svg",
    title: "اینستاگرام",
    url: "https://instagram.com/your-profile",
  },
];

const symbolsOfTrust = [
  {
    id: 1,
    src: "/images/symbolOfTrust/e-namad.png",
    title: "نماد اعتماد الکترونیکی",
  },
  { id: 2, src: "/images/symbolOfTrust/parsian.png", title: "بانک پارسیان" },
  { id: 3, src: "/images/symbolOfTrust/samandehi.png", title: "ساماندهی" },
];

const Footer = () => {
  const pathname = usePathname();

  const hiddenRoutes = ["/auth", "/customer", "/admin"];
  if (hiddenRoutes.some((r) => pathname.startsWith(r))) return null;

  return (
    <footer className="relative overflow-hidden bg-linear-to-b from-primary-700 to-primary-900 text-white">
      <div className="container relative mx-auto px-4">
        <div className="mx-auto my-10 pb-10 border-b border-primary-400/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <Logo className="rounded-full h-10 w-10 ml-2" />
                <h3 className="text-2xl font-bold bg-primary-50 bg-clip-text text-transparent">
                  Shayan Spark Plug
                </h3>
              </div>
              <p className="text-primary-100 text-sm mt-2">
                تخصصی‌ترین فروشگاه شمع خودرو در ایران
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {footerData.map((section, i) => (
            <div key={i} className="group">
              <div className="flex items-center mb-6">
                <h2 className="text-xl font-bold text-primary-50">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-4">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.url}
                      className="inline-flex items-center text-gray-300 hover:text-primary-50 transition-all duration-300 group/link"
                    >
                      <ChevronLeft className="w-0 group-hover/link:w-4 ml-2 transition-all duration-300" />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ستون آخر برای شبکه‌های اجتماعی و نمادها */}
          <div className="lg:col-span-5 mt-8 lg:mt-0 sm:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* شبکه‌های اجتماعی */}
              <div className="bg-linear-to-r from-gray-900/50 to-gray-900/20 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 shadow-2xl">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-12 h-0.5 bg-linear-to-r from-transparent via-primary-500 to-transparent"></div>
                  <h2 className="text-2xl font-bold mx-4 text-center text-primary-50">
                    همراه ما باشید
                  </h2>
                  <div className="w-12 h-0.5 bg-linear-to-r from-transparent via-primary-500 to-transparent"></div>
                </div>

                <div className="flex justify-center items-center gap-8 flex-wrap">
                  {socialMediaIcon.map(({ id, src, title, url }) => (
                    <a
                      key={id}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social relative"
                      title={title}
                    >
                      <div className="absolute -inset-3 bg-linear-to-br from-primary-500/20 to-transparent rounded-full blur-sm group-hover/social:blur-md transition-all duration-500"></div>
                      <div className="relative bg-linear-to-b from-gray-800 to-gray-900 p-4 rounded-2xl border border-gray-700/50 shadow-lg group-hover/social:scale-110 group-hover/social:border-primary-500/30 transition-all duration-300">
                        <Image
                          src={src}
                          alt={`${title} logo`}
                          width={36}
                          height={36}
                          className="filter group-hover/social:brightness-100 group-hover/social:invert-0 transition-all duration-300"
                        />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* نمادهای اعتماد */}
              <div className="bg-linear-to-r from-gray-900/50 to-gray-900/20 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 shadow-2xl">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-12 h-0.5 bg-linear-to-r from-transparent via-primary-500 to-transparent"></div>
                  <h2 className="text-2xl font-bold mx-4 text-center text-primary-50">
                    گواهی‌ها و نمادهای اعتماد
                  </h2>
                  <div className="w-12 h-0.5 bg-linear-to-r from-transparent via-primary-500 to-transparent"></div>
                </div>

                <div className="flex justify-center items-center gap-10 flex-wrap">
                  {symbolsOfTrust.map(({ id, src, title }) => (
                    <div key={id} className="group/symbol relative">
                      <div className="absolute -inset-3 bg-linear-to-br from-primary-500/10 to-transparent rounded-2xl blur-sm group-hover/symbol:blur transition-all duration-500"></div>
                      <div className="relative bg-white p-4 rounded-xl shadow-xl group-hover/symbol:scale-105 transition-all duration-300">
                        <Image
                          className="rounded-lg"
                          src={src}
                          alt={title}
                          width={100}
                          height={100}
                          title={title}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-10 mx-auto p-2">
        <p className="text-gray-500 text-sm mt-8 text-center flex justify-center items-center">
          طراحی و توسعه توسط{" "}
          <Link
            target="_blank"
            href={"https://www.sahabranjbar.dev"}
            className="mx-1 underline underline-offset-8"
          >
            سحاب
          </Link>{" "}
          برای علاقه‌مندان به صنعت خودرو
        </p>
      </div>
    </footer>
  );
};

export default Footer;
