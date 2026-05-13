import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AdminOrder, STATUS_LABEL } from "@/constants/data";

function OrderDetailsDialog({
  order,
  onClose,
}: {
  order: AdminOrder | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!order} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        {order && (
          <>
            <DialogHeader>
              <DialogTitle>Order #{order.id.slice(0, 8)}</DialogTitle>
              <DialogDescription>
                Placed {new Date(order.created_at).toLocaleString()}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex gap-4 rounded-xl border border-border p-3">
                <img
                  src={order.food?.image_url}
                  alt={order.food?.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <Badge variant="secondary" className="text-[10px] uppercase">
                    {order.food?.category}
                  </Badge>
                  <h4 className="mt-1 font-semibold">{order.food?.name}</h4>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {order.food?.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <Field
                  label="Customer"
                  value={order.customer?.full_name ?? "—"}
                />
                <Field label="Email" value={order.customer?.email ?? "—"} />
                <Field label="Quantity" value={String(order.quantity)} />
                <Field
                  label="Total"
                  value={`$${Number(order.total).toFixed(2)}`}
                />
                <Field label="Status" value={STATUS_LABEL[order.status]} />
                <Field
                  label="Updated"
                  value={new Date(order.updated_at).toLocaleString()}
                />
              </div>

              <Field label="Delivery address" value={order.address} />
              {order.notes && <Field label="Notes" value={order.notes} />}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default OrderDetailsDialog;

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 text-sm font-medium">{value}</div>
    </div>
  );
}
