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
import { DialogTrigger } from "@radix-ui/react-dialog";
import { JSX } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  actionLabel?: string;
  actionLoading?: boolean;
  onAction?: () => void;
  hideActions?: boolean;
  width?: string;
  modalTrigger: JSX.Element;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  actionLabel = "تایید",
  actionLoading,
  onAction,
  hideActions,
  width = "max-w-lg",
  modalTrigger: ModalTrigger,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTrigger>{ModalTrigger}</DialogTrigger>
      <DialogContent className={width}>
        {title && (
          <DialogHeader className="m-4">
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        <div className="py-2">{children}</div>

        {!hideActions && (
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              انصراف
            </Button>
            <Button onClick={onAction} loading={actionLoading}>
              {actionLabel}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
