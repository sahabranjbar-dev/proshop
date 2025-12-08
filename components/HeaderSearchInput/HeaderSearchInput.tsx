import { Input } from "../ui/input";
import { Search } from "lucide-react";

const HeaderSearchInput = () => {
  return (
    <div className="hidden md:flex min-w-[50%] relative">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        size={20}
      />
      <Input
        placeholder="جست‌وجو..."
        className="pl-12 py-5 bg-gray-100 border border-gray-300 rounded-xl focus-visible:ring-primary"
      />
    </div>
  );
};

export default HeaderSearchInput;
