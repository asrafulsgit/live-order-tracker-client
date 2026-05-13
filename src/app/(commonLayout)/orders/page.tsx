"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
  getFoodById,
  getOrdersByStatus,
  NewOrder,
  Order,
  ORDERS,
  OrderStatus,
  STATUS_LABEL,
} from "@/constants/data";
import OrderProgress from "./ProgressBar";

function OrdersPage() {
  //   const cancel = useMutation({
  //     mutationFn: async (orderId: string) => {
  //       const { error } = await supabase
  //         .from("orders")
  //         .update({ status: "cancelled" as OrderStatus })
  //         .eq("id", orderId);
  //       if (error) throw error;
  //     },
  //     onSuccess: () => {
  //       toast.success("Order cancelled");
  //       qc.invalidateQueries({ queryKey: ["my-orders"] });
  //     },
  //     onError: (e: Error) => toast.error(e.message),
  //   });
  const isLoading = false;
  //   const [status, setStatus] = useState<OrderStatus>("ordered");
  //   const data: NewOrder[] = getOrdersByStatus(status);
  const data: NewOrder[] = ORDERS.reduce<NewOrder[]>((result, order) => {
    const food = getFoodById(order.food_id);
    if (!food) return result;

    result.push({
      ...order,
      food,
    });

    return result;
  }, []);
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            My Orders
          </h1>
          <p className="mt-2 text-muted-foreground">
            Track your meals from kitchen to door.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/">Browse menu</Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-44 w-full rounded-2xl" />
          ))}
        </div>
      ) : data && data.length > 0 ? (
        <div className="space-y-4">
          {data.map((o) => (
            <Card key={o.id} className="overflow-hidden p-0">
              <div className="flex flex-col gap-4 p-5 sm:flex-row">
                <img
                  src={o.food?.image_url}
                  alt={o.food?.name}
                  className="h-24 w-24 flex-0 rounded-xl object-cover"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold">{o.food?.name}</h3>
                    <span className="text-base font-semibold text-primary">
                      ${Number(o.total).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Qty {o.quantity} &middot;{" "}
                    {new Date(o.created_at).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    To: {o.address}
                  </p>
                </div>
              </div>
              <div className="border-t border-border bg-muted/30 px-5 py-4">
                <OrderProgress status={o.status as OrderStatus} />
              </div>
              {o.status !== "completed" &&
                o.status !== "cancelled" &&
                o.status !== "delivery" && (
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
              {(o.status === "completed" || o.status === "cancelled") && (
                <div className="border-t border-border bg-card px-5 py-3 text-xs text-muted-foreground">
                  {STATUS_LABEL[o.status as OrderStatus]} on{" "}
                  {new Date(o.updated_at).toLocaleString()}
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center gap-3 p-12 text-center">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          <h3 className="text-lg font-semibold">No orders yet</h3>
          <p className="text-sm text-muted-foreground">
            When you order, you'll see it here.
          </p>
          <Button asChild className="mt-2">
            <Link href="/">Browse menu</Link>
          </Button>
        </Card>
      )}
    </main>
  );
}

export default OrdersPage;
