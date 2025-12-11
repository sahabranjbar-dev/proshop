import { brands } from "@/constants/globals";
import Image from "next/image";
import SectionTitle from "../SectionTitle/SectionTitle";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const BrandsLogo = () => {
  return (
    <div>
      <SectionTitle title="برند‌ها" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 justify-center items-center my-4 gap-4">
        {brands.map(({ id, src, title }) => (
          <Tooltip key={id}>
            <TooltipContent>{title}</TooltipContent>
            <TooltipTrigger>
              <Image
                className="hover:-translate-y-1.5 transition-transform duration-300 justify-self-center m-4"
                src={src}
                alt={title}
                width={100}
                height={100}
              />
            </TooltipTrigger>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default BrandsLogo;
