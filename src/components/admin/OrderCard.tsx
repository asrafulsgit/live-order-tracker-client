import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ORDER_STATUSES, OrderStatus, STATUS_LABEL } from "@/constants/data";
import { Order } from "../user/MyOrders";
import { orderServices } from "@/services/order.services";
import { toast } from "sonner";

function AdminOrderCard({
  order,
  onView,
  //   onStatusChange,
}: {
  order: Order;
  onView: () => void;
  //   onStatusChange: (s: OrderStatus) => void;
}) {
  const isFinal = order.status === "COMPLETED" || order.status === "CANCELLED";

  const onStatusChange = async (status: OrderStatus) => {
    try {
      const data = await orderServices.updateStatus(status, order.id); 
      toast.success(`Order status updated to ${data?.data?.status || status}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex gap-4">
        <img
          src={order.food?.image_url || ""}
          alt={order.food?.name}
          className="h-20 w-20 shrink-0 rounded-xl object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="truncate font-semibold">{order.food?.name}</h3>
            <span className="text-sm font-semibold text-primary">
              ${Number(order.total).toFixed(2)}
            </span>
          </div>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">
            Qty {order.quantity} &middot; {order.user?.email ?? "—"}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            #{order.id.slice(0, 8)} &middot;{" "}
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4">
        <Button size="sm" variant="outline" onClick={onView}>
          View details
        </Button>
        {!isFinal ? (
          <Select
            value={order.status}
            onValueChange={(v) => onStatusChange(v as OrderStatus)}
          >
            <SelectTrigger className="ml-auto w-42.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ORDER_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {STATUS_LABEL[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Badge variant="secondary" className="ml-auto">
            {STATUS_LABEL[order.status]}
          </Badge>
        )}
      </div>
    </Card>
  );
}

export default AdminOrderCard;
