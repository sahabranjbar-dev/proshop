"use client";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";

interface Props
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "name" | "value"
  > {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
}

const TagInput = ({
  disabled,
  placeholder,
  className,
  name,
  onChange,
  value = "",
  ...rest
}: Props) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const { setValue } = useFormContext();

  const addTag = () => {
    const tag = value.trim();
    if (!tag || tags.includes(tag)) return;

    const nextTags = [...tags, tag];
    setTags(nextTags);
    setValue(name, nextTags, { shouldValidate: true });
    setInputValue("");
  };

  const removeTag = (tag: string) => {
    const nextTags = tags.filter((t) => t !== tag);
    setTags(nextTags);
    setValue(name, nextTags, { shouldValidate: true });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="relative w-full space-y-2">
      <Input
        {...rest}
        className={cn(className)}
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
          onChange?.(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={disabled ? "" : placeholder}
        dir="rtl"
      />

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 border p-2 rounded-2xl bg-accent/50x">
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-2 rounded-2xl border bg-primary-50 px-3 py-1"
            >
              <span className="text-sm text-gray-700">{tag}</span>
              <X
                size={14}
                className="cursor-pointer rounded-full hover:bg-gray-200"
                onClick={() => removeTag(tag)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;
