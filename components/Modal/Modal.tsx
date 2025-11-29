"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import clsx from "clsx";

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
  triggerElement?: React.ReactNode; // optional
  className?: string;
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
  triggerElement,
  className,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      {triggerElement && (
        <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      )}

      <DialogContent className={clsx(className, width)}>
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

        <div className="p-2">{children}</div>

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
