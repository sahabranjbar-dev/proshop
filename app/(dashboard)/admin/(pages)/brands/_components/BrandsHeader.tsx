import ListHeader from "@/components/ListHeader/ListHeader";
import BrandsCreateButton from "./BrandsCreateButton";

const BrandsHeader = () => {
  return <ListHeader createButton={<BrandsCreateButton />} />;
};

export default BrandsHeader;
