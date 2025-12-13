import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  imageSrc?: string;
  title: string;
  id: string;
}

const BlogCard = ({
  id,
  title,
  imageSrc = "/images/placeholder.png",
}: Props) => {
  return (
    <Link
      href={`/blogs/${id}`}
      className="max-w-sm border rounded-2xl overflow-hidden hover:shadow hover:scale-105 duration-300"
    >
      <div className="flex justify-center items-center mb-2 w-full">
        <Image src={imageSrc} alt={title} width={384} height={384} />
      </div>

      <div className="flex flex-col justify-start items-center m-2 p-2">
        <h3 className="font-bold">{title}</h3>
      </div>
    </Link>
  );
};

export default BlogCard;
