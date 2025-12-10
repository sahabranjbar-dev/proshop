import { brands } from "@/constants/globals";
import Image from "next/image";
import SectionTitle from "../SectionTitle/SectionTitle";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const BrandsLogo = () => {
  return (
    <div>
      <SectionTitle title="برند‌ها" />

      <div className="flex justify-evenly items-center">
        {brands.map(({ id, src, title }) => (
          <Tooltip key={id}>
            <TooltipContent>{title}</TooltipContent>
            <TooltipTrigger>
              <Image
                className="hover:-translate-y-1.5 transition-transform duration-300"
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
