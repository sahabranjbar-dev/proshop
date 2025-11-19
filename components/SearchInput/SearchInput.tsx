import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

const SearchInput = ({
  className,
  ...props
}: React.ComponentProps<"input">) => {
  return (
    <InputGroup className="max-w-full">
      <InputGroupInput
        placeholder="جستجو..."
        type="search"
        className={className}
        {...props}
      />
      <InputGroupAddon className="mr-4 ">
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchInput;
