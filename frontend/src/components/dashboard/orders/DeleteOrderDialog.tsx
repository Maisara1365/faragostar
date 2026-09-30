// src/components/dashboard/orders/DeleteOrderDialog.tsx

import { useState } from "react";
import { deleteCustomerOrder } from "@/services/orders";
import Button from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import type { Order } from "@/types/order";
import { useLanguage } from "@/hooks/use-language";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onClose: () => void;
  order: Order | null;
  onDeleted: () => void;
}

export function DeleteOrderDialog({ open, onClose, order, onDeleted }: Props) {
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  async function handleDelete() {
    if (!order) return;

    try {
      setLoading(true);
      await deleteCustomerOrder(order.id);
      onDeleted();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        {/* Warning Icon */}
        <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-red-100 dark:bg-red-900/20">
          <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
        </div>

        <DialogHeader>
          <DialogTitle className="text-center">
            {t.dashboard.orders.delete.title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t.dashboard.orders.delete.message}
          </DialogDescription>
        </DialogHeader>

        {order && (
          <div className="mt-2 rounded-md bg-slate-100 dark:bg-slate-800 p-3 text-center">
            <span className="text-sm font-medium">
              #{order.order_number}
            </span>
          </div>
        )}

        <DialogFooter
          className="mt-6 flex-col-reverse gap-3 sm:flex-row"
          style={{
            padding: "8px 12px",
          }}
        >
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            style={{
              padding: "10px 22px",
              margin: "4px",
              borderRadius: "9999px",
              fontSize: "16px",
              fontWeight: 500,
              minHeight: "42px",
            }}
          >
            {t.dashboard.orders.delete.cancel}
          </Button>

          <Button
            variant="outline"
            loading={loading}
            onClick={handleDelete}
            style={{
              padding: "10px 22px",
              margin: "4px",
              borderRadius: "9999px",
              fontSize: "16px",
              fontWeight: 500,
              minHeight: "42px",
              color: "#dc2626",
              border: "1px solid #dc2626",
              backgroundColor: "transparent",
            }}
          >
            {t.dashboard.orders.delete.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}