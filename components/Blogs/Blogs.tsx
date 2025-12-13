import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import BlogCard from "../BlogCard/BlogCard";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const blogs = [
  {
    id: "1",
    title: `رکوردشکنی ایران در گوگل؛ رتبه‌ی دوم اخبار جهانی به نام ایران ثبت شد
`,
    src: "/images/landing/blog.png",
  },
  {
    id: "2",
    title: `رکوردشکنی ایران در گوگل؛ رتبه‌ی دوم اخبار جهانی به نام ایران ثبت شد
`,
    src: "/images/landing/blog.png",
  },
  {
    id: "3",
    title: `رکوردشکنی ایران در گوگل؛ رتبه‌ی دوم اخبار جهانی به نام ایران ثبت شد
`,
    src: "/images/landing/blog.png",
  },
  {
    id: "4",
    title: `رکوردشکنی ایران در گوگل؛ رتبه‌ی دوم اخبار جهانی به نام ایران ثبت شد
`,
    src: "/images/landing/blog.png",
  },
  {
    id: "5",
    title: `رکوردشکنی ایران در گوگل؛ رتبه‌ی دوم اخبار جهانی به نام ایران ثبت شد
`,
    src: "/images/landing/blog.png",
  },
  {
    id: "6",
    title: `رکوردشکنی ایران در گوگل؛ رتبه‌ی دوم اخبار جهانی به نام ایران ثبت شد
`,
    src: "/images/landing/blog.png",
  },
  {
    id: "7",
    title: `رکوردشکنی ایران در گوگل؛ رتبه‌ی دوم اخبار جهانی به نام ایران ثبت شد
`,
    src: "/images/landing/blog.png",
  },
];

const Blogs = () => {
  return (
    <div className="m-2 p-2">
      <SectionTitle title="مقالات" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {blogs.slice(0, 4).map(({ id, src, title }) => (
          <BlogCard key={id} title={title} imageSrc={src} id={id} />
        ))}
      </div>

      <div className="flex justify-end items-center p-2 mt-4 ">
        <Link
          href={"/blogs"}
          className="text-xs text-primary-700 bg-primary-100 p-2 rounded-lg hover:shadow flex justify-center items-center"
        >
          مشاهده‌ی مقالات
          <ChevronLeft size={16} />
        </Link>
      </div>
    </div>
  );
};

export default Blogs;
