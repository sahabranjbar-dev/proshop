import ListHeader from "@/components/ListHeader/ListHeader";
import CategoryCreateButton from "./CategoryCreateButton";

const CategoriesHeader = () => {
  return <ListHeader createButton={<CategoryCreateButton />} />;
};

export default CategoriesHeader;
