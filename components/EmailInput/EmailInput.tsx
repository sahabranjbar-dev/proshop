import { MailIcon } from "lucide-react";
import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

const EmailInput = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<"input"> & { disabled?: boolean }) => {
  return (
    <InputGroup className="max-w-full">
      <InputGroupInput
        type="email"
        placeholder={"ایمیل خود را وارد کنید"}
        className={className}
        disabled={disabled}
        {...props}
      />
      <InputGroupAddon className="mr-4">
        <MailIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default EmailInput;
