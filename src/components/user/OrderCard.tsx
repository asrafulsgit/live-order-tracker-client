import { OrderStatus, STATUS_LABEL } from "@/constants/data";
import Image from "next/image";
import { Card } from "../ui/card";
import OrderProgress from "@/components/user/ProgressBar";
import { Button } from "../ui/button";
import { Order } from "./MyOrders";

const OrderCard = ({ order }: { order: Order }) => {
  return (
    <Card className="overflow-hidden p-0 gap-3">
      <div className=" flex flex-col  gap-2 p-5 sm:flex-row">
        <div className="h-24 w-24 relative">
          <Image
            src={order.food?.image_url || "https://i.ibb.co.com/qYbBkbcg/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.webp"}
            alt={order.food?.name}
            fill
            className=" flex-0 rounded-xl object-cover"
          />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-semibold">{order.food?.name}</h3>
            <span className="text-base font-semibold text-primary">
              ${Number(order.total).toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Qty {order.quantity} &middot;{" "}
            {new Date(order.created_at).toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">To: {order.address}</p>
        </div>
      </div>
      <div className="border-t border-border bg-muted/30 px-5 py-4">
        <OrderProgress status={order.status as OrderStatus} />
      </div>
      {order.status !== "COMPLETED" &&
        order.status !== "CANCELLED" &&
        order.status !== "DELIVERY" && (
          <div className="flex justify-end border-t border-border bg-card px-5 py-3">
            <Button
              size="sm"
              variant="ghost"
              //   onClick={() => cancel.mutate(o.id)}
              //   disabled={cancel.isPending}
              className="text-destructive hover:text-destructive"
            >
              Cancel order
            </Button>
          </div>
        )}
      {(order.status === "COMPLETED" || order.status === "CANCELLED") && (
        <div className="border-t border-border bg-card px-5 py-3 text-xs text-muted-foreground">
          {STATUS_LABEL[order.status as OrderStatus]} on{" "}
          {new Date(order.updated_at).toLocaleString()}
        </div>
      )}
    </Card>
  );
};

export default OrderCard;
