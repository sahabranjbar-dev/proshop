"use client";

import { Modal } from "@/components/Modal/Modal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

interface FileItem {
  id: string;
  url: string;
  altText?: string | null;
}

interface Props {
  files: FileItem[];
}

const PLACEHOLDER_IMAGE = "/images/placeholder.png";

const ProductImageGallery = ({ files }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeImage = files[activeIndex] || null;
  const modalImage = files[modalIndex] || null;

  const getImageSrc = (file?: FileItem | null) =>
    file?.url || PLACEHOLDER_IMAGE;
  const getAltText = (file?: FileItem | null) =>
    file?.altText || "Product Image";

  const displayedThumbnails = files.slice(0, 3);
  const hasMoreImages = files.length > 3;

  return (
    <div className="flex-1 w-full">
      {/* Main image container - Responsive */}
      <div className="relative border rounded-2xl overflow-hidden bg-gray-50 shadow-md aspect-square w-full max-w-2xl mx-auto">
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <Image
            src={getImageSrc(activeImage)}
            alt={getAltText(activeImage)}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-4"
            priority
          />
        </div>
      </div>

      {/* Thumbnails grid - Responsive */}
      <div className="mt-4 px-1">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 max-w-2xl mx-auto">
          {/* Displayed thumbnails */}
          {displayedThumbnails.map((file, index) => (
            <Thumbnail
              key={file.id}
              file={file}
              isActive={activeIndex === index}
              onClick={() => setActiveIndex(index)}
            />
          ))}

          {/* More images button */}
          {hasMoreImages && (
            <div className="flex items-center justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-600 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200 w-full aspect-square min-h-0"
                    aria-label={`View all ${files.length} images`}
                  >
                    <div className="text-center p-2">
                      <div className="text-center mb-1">
                        {files.length - 3}+
                      </div>
                      <div className="text-xs">بیشتر</div>
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  مشاهده همه تصاویر ({files.length})
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
      </div>

      {/* Modal for all images */}
      <Modal
        title={`همه تصاویر (${files.length})`}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        hideActions
      >
        <div className="space-y-6 p-1">
          {/* Main modal image */}
          <div className="relative bg-gray-50 rounded-xl overflow-hidden aspect-square w-full max-w-md mx-auto">
            <div className="relative w-full h-full flex items-center justify-center p-6">
              <Image
                src={getImageSrc(modalImage)}
                alt={getAltText(modalImage)}
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 70vw, 50vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Modal thumbnails grid */}
          <div className="overflow-y-auto max-h-80">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 p-2">
              {files.map((file, index) => (
                <button
                  key={file.id}
                  type="button"
                  onClick={() => {
                    setModalIndex(index);
                    setActiveIndex(index);
                  }}
                  className={clsx(
                    "relative overflow-hidden rounded-lg border-2 bg-gray-50 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                    "aspect-square w-full",
                    modalIndex === index
                      ? "border-primary-500 ring-2 ring-primary-500 ring-offset-1"
                      : "border-gray-200"
                  )}
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={getImageSrc(file)}
                    alt={getAltText(file)}
                    fill
                    sizes="(max-width: 768px) 20vw, (max-width: 1024px) 15vw, 10vw"
                    className="object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                    {index + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductImageGallery;

/* ---------- Thumbnail Component ---------- */

interface ThumbnailProps {
  file: FileItem;
  isActive: boolean;
  onClick: () => void;
}

const Thumbnail = ({ file, isActive, onClick }: ThumbnailProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "relative overflow-hidden rounded-xl border-2 bg-gray-50 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        "aspect-square w-full",
        isActive
          ? "border-primary-500 ring-2 ring-primary-500 ring-offset-1"
          : "border-gray-200 hover:border-primary-300"
      )}
      aria-label={`Select image ${file.altText || ""}`}
      aria-pressed={isActive}
    >
      <Image
        src={file.url || PLACEHOLDER_IMAGE}
        alt={file.altText || "Product thumbnail"}
        fill
        sizes="(max-width: 768px) 20vw, (max-width: 1024px) 15vw, 10vw"
        className="object-cover p-1"
      />
    </button>
  );
};
