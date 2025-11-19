"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AppModalProps {
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
}

export function AppModal({
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
}: AppModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
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
