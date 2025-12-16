"use client";

import React, { useMemo, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Upload, X } from "lucide-react";

import { formatFileSize, getFilePreview } from "@/utils/common";
import { useUpload } from "@/hooks/useUpload";
import { IFileUpload } from "./meta/types";

type FileItem = {
  file?: File;
  fileId?: string;
  url?: string;
  key?: string;
};

const FileUpload = ({
  value,
  onChange,
  onUploaded,
  multiple = false,
  savedFolderName = "products",
  ...rest
}: IFileUpload) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { uploadFile, progress, loading, setProgress } = useUpload();

  const files: FileItem[] = useMemo(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const openPicker = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onChange?.(multiple ? newFiles : null);
    setProgress(0);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;

    for (const file of selectedFiles) {
      try {
        const { publicUrl, fileId, key } = await uploadFile(
          file,
          savedFolderName
        );

        const fileItem: FileItem = {
          file,
          fileId,
          url: publicUrl,
          key,
        };

        onUploaded?.(publicUrl, fileId, key);

        onChange?.(multiple ? [...files, fileItem] : fileItem);
      } catch (err) {
        console.error(err);
        alert("آپلود با خطا مواجه شد");
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      onClick={openPicker}
      className={clsx(
        "border-2 border-dashed rounded-xl p-4 cursor-pointer transition relative min-h-[130px]",
        files.length
          ? "border-green-500 bg-green-50"
          : "border-gray-300 bg-gray-50 hover:bg-gray-100"
      )}
    >
      {/* Input */}
      <input
        {...rest}
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Empty State */}
      {!files.length && (
        <div className="flex flex-col items-center gap-2 text-gray-600">
          <Upload size={28} />
          <p className="text-sm">
            {multiple
              ? "برای آپلود تصاویر کلیک کنید"
              : "برای آپلود تصویر کلیک کنید"}
          </p>
        </div>
      )}

      {/* Preview List */}
      {!!files.length && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {files.map((item, index) => {
            const previewUrl = getFilePreview(
              item.file || { publicUrl: item.url }
            );

            return (
              <div
                key={item.key || index}
                className="relative rounded-lg border bg-white p-2"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="absolute top-1 left-1 bg-white rounded-full shadow p-1"
                >
                  <X size={14} />
                </button>

                {previewUrl && (
                  <Image
                    src={previewUrl}
                    alt="preview"
                    width={120}
                    height={120}
                    className="rounded-md object-cover w-full h-24"
                  />
                )}

                <div className="mt-1 text-xs truncate">{item.file?.name}</div>
                {item.file && (
                  <div className="text-[10px] text-gray-400">
                    {formatFileSize(item.file.size)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Progress */}
      {loading && (
        <div className="mt-3">
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-full bg-blue-500 rounded transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-center mt-1">{progress}%</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
