"use client";

import React, { useMemo, useRef } from "react";
import { X, Upload } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";
import { formatFileSize, getFilePreview } from "@/utils/common";
import { IFileUpload } from "./meta/types";
import { useUpload } from "@/hooks/useUpload";

const FileUpload = ({
  value,
  onChange,
  onUploaded,
  savedFolderName = "products",
  ...rest
}: IFileUpload) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { uploadFile, progress, loading, setProgress } = useUpload();

  const previewUrl = useMemo(() => {
    if (!value) return "";
    return getFilePreview(value?.file);
  }, [value]);

  const fileSize = useMemo(() => {
    if (!value) return "";
    return formatFileSize(value?.file?.size);
  }, [value]);

  const openPicker = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const removeFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setProgress(0);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      onChange?.({ file });

      try {
        const { publicUrl, fileId, key } = await uploadFile(
          file,
          savedFolderName
        );

        onUploaded?.(publicUrl, fileId, key);
      } catch (err) {
        console.error(err);
        alert("آپلود با خطا مواجه شد");
      } finally {
        // reset input so same file can be selected again if needed
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div
      onClick={openPicker}
      className={clsx(
        "border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative overflow-hidden min-h-[130px] w-full",
        value
          ? "border-green-500 bg-green-50 hover:bg-green-100"
          : "border-gray-300 bg-gray-50 hover:bg-gray-100"
      )}
    >
      {/* Hidden Input */}
      <input
        {...rest}
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Remove Button */}
      {value && (
        <button
          type="button"
          onClick={removeFile}
          className="absolute top-2 left-2 p-1 rounded-full bg-white shadow hover:bg-gray-100 transition"
        >
          <X className="text-gray-600" size={18} />
        </button>
      )}

      {/* Content */}
      {!value ? (
        <div className="flex flex-col items-center gap-2 text-gray-600">
          <Upload size={28} />
          <p className="text-sm">برای آپلود کلیک کنید</p>
          {rest.accept && (
            <p className="text-xs text-gray-400 mt-1">
              فرمت‌های مجاز: {rest.accept}
            </p>
          )}
        </div>
      ) : (
        <div className="flex justify-start items-center gap-2 w-full p-4">
          {previewUrl && (
            <Image
              src={previewUrl}
              alt="preview"
              width={70}
              height={70}
              className="rounded-md object-cover shadow max-h-20"
            />
          )}

          <div>
            <div className="text-sm text-gray-700" dir="ltr">
              {value?.file?.name}
            </div>
            <p className="text-xs text-gray-500">{fileSize}</p>
          </div>
        </div>
      )}

      {/* use progress in shadcn */}
      {progress > 0 && (
        <>
          <div
            style={{
              width: 200,
              height: 8,
              background: "#eee",
              borderRadius: 4,
              marginTop: 8,
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "#3b82f6",
                borderRadius: 4,
                transition: "width .2s",
              }}
            />
          </div>
          <div>{loading ? `${progress}%` : ""}</div>
        </>
      )}
    </div>
  );
};

export default FileUpload;
