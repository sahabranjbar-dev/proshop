import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import Image from "next/image";

const advantagesContents = [
  {
    id: 1,
    src: "/svg/landing/consulting-rafiki.svg",
    title: "مشاوره تخصصی رایگان",
    description: "براساس مدل خودرو، بهترین گزینه را به شما معرفی می‌کنیم.",
  },
  {
    id: 2,
    src: "/svg/landing/select-rafiki.svg",
    title: "تخصص در یک محصول",
    description: "ما فقط شمع می‌فروشیم، بنابراین انتخاب اشتباه ندارید.",
  },
  {
    id: 3,
    src: "/svg/landing/product-quality-amico.svg",
    title: "اصالت کالا، تضمین واقعی",
    description: "همه شمع‌ها اصل و با ضمانت اصالت عرضه می‌شود.",
  },
  {
    id: 4,
    src: "/svg/landing/car-with-man.svg",
    title: "ارسال سریع و بسته‌بندی مطمئن",
    description: "تحویل فوری با امنیت کامل محصول.",
  },
];

const Advantages = () => {
  return (
    <div>
      <SectionTitle title="مزیت‌های ما" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-between items-center">
        {advantagesContents.map(({ description, id, src, title }) => (
          <div
            key={id}
            className="flex flex-col justify-start items-center flex-4 p-2 m-2"
          >
            <Image src={src} alt={title} width={200} height={200} />

            <div className="text-center">
              <h4 className="text-lg font-bold text-center text-primary-600">
                {title}
              </h4>
              <p className="text-center">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advantages;
