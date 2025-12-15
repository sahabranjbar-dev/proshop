"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import clsx from "clsx";
import React from "react";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  actionLabel?: string;
  actionLoading?: boolean;
  onAction?: () => void;
  hideActions?: boolean;
  width?: string;
  className?: string;
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  actionLabel = "تایید",
  actionLoading = false,
  onAction,
  hideActions = false,
  width = "max-w-lg",
  className,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={clsx(width, className)}>
        {(title || description) && (
          <DialogHeader>
            {title && (
              <DialogTitle className="text-center">{title}</DialogTitle>
            )}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        <div className="py-2">{children}</div>

        {!hideActions && (
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              انصراف
            </Button>

            {onAction && (
              <Button onClick={onAction} loading={actionLoading}>
                {actionLabel}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
