import React from "react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

interface Props {
  text?: string;
  onChange?: (checked: boolean) => void;
  name: string;
}

const SwitchComponent = ({ text, onChange, name, ...res }: Props) => {
  return (
    <div className="flex justify-between items-center w-full border rounded-2xl p-4">
      <Label className="p-2 w-full flex-1 cursor-pointer" htmlFor={name}>
        {text}
      </Label>
      <Switch {...res} dir="ltr" onCheckedChange={onChange} id={name} />
    </div>
  );
};

export default SwitchComponent;
