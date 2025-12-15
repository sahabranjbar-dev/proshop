import { ReactNode } from "react";
import ShopFilters from "./_components/ShopFilters";

interface Props {
  children: ReactNode;
}

const ShopLayout = ({ children }: Props) => {
  return (
    <div className="container mx-auto m-4 p-4">
      <div className="md:flex justify-start items-start gap-2">
        <ShopFilters />
        {children}
      </div>
    </div>
  );
};

export default ShopLayout;
