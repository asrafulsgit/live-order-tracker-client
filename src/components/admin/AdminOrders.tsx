"use client";
import {
  AdminOrder,
  ORDER_STATUSES,
  OrderStatus,
  STATUS_LABEL,
} from "@/constants/data";
import { CheckCircle2, Clock, Truck, Utensils, XCircle } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Card } from "../ui/card";
import OrderDetailsDialog from "@/components/admin/OrderDialog";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import AdminOrderCard from "@/components/admin/OrderCard";
import { Order } from "../user/MyOrders";
import { orderServices } from "@/services/order.services";
import { toast } from "sonner";
import { useSocketIO } from "@/hooks/useSocketIO";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
type FetchState = "idle" | "loading" | "error";
const AdminOrders = () => {
  const { on, isConnected } = useSocketIO();
  const [activeTab, setActiveTab] = useState<OrderStatus>("ORDERED");
  const [selected, setSelected] = useState<Order | null>(null);

  const [data, setData] = useState<Order[] | null>(null);
  const [fetchState, setFetchState] = useState<FetchState>("loading");
  const fetchOrders = useCallback(async () => {
    setFetchState("loading");
    try {
      const res = await orderServices.getAllOrders();
      setData(res.data);
      setFetchState("idle");
    } catch (error: any) {
      setFetchState("error");
      toast.error(error?.message ?? "Failed to load orders.");
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const counts = useMemo<Record<OrderStatus, number>>(() => {
    const base: Record<OrderStatus, number> = {
      ORDERED: 0,
      IN_PROGRESS: 0,
      DELIVERY: 0,
      COMPLETED: 0,
      CANCELLED: 0,
    };
    data?.forEach((o) => base[o.status]++);
    return base;
  }, [data]);

  useEffect(() => {
    if (!isConnected) return;

    const cleanup = on("order:created", (order: Order) => {
      setData((prev) => [order, ...(prev ?? [])]);
    });

    return cleanup;
  }, [isConnected, on]);

  useEffect(() => {
    if (!isConnected) return;

    const cleanup = on("order:status-updated", (order: Order) => {
      setData((prev) => {
        if (!prev) return [order];
        return prev.map((o) => (o.id === order.id ? order : o));
      });
    });

    return cleanup;
  }, [isConnected, on]);

  const filtered = useMemo(
    () => data?.filter((o) => o.status === activeTab) ?? [],
    [data, activeTab],
  );

  const handleCloseDialog = useCallback(() => setSelected(null), []);

  if (fetchState === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (fetchState === "error") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <p className="text-sm text-muted-foreground">
          Something went wrong loading orders.
        </p>
        <Button
          onClick={fetchOrders}
          variant={"destructive"}
          className={cn("", "cursor-pointer rounded-sm")}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* ── Tabs ─────────────────────────────────────────────────────────── */}
      <div className="mb-6 flex flex-wrap gap-2 rounded-2xl bg-muted/50 p-1.5">
        {ORDER_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setActiveTab(s)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === s
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {STATUS_LABEL[s]}
            <Badge
              variant={activeTab === s ? "default" : "secondary"}
              className="h-5 min-w-5 px-1.5"
            >
              {counts[s]}
            </Badge>
          </button>
        ))}
      </div>

      {/* ── Order grid ───────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <EmptyState status={activeTab} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((o) => (
            <AdminOrderCard
              key={o.id}
              order={o}
              onView={() => setSelected(o)}
            />
          ))}
        </div>
      )}

      <OrderDetailsDialog order={selected} onClose={handleCloseDialog} />
    </>
  );
};

export default AdminOrders;

function EmptyState({ status }: { status: OrderStatus }) {
  const map: Record<OrderStatus, Record<string, any>> = {
    ORDERED: {
      Icon: Clock,
      title: "No new orders",
      desc: "Fresh orders will appear here as they come in.",
    },
    IN_PROGRESS: {
      Icon: Utensils,
      title: "Nothing in the kitchen",
      desc: "Orders being prepared will show up here.",
    },
    DELIVERY: {
      Icon: Truck,
      title: "No deliveries in transit",
      desc: "Orders out for delivery will appear here.",
    },
    COMPLETED: {
      Icon: CheckCircle2,
      title: "No completed orders yet",
      desc: "Successfully delivered orders will be archived here.",
    },
    CANCELLED: {
      Icon: XCircle,
      title: "No cancelled orders",
      desc: "Cancelled orders will be listed here for your records.",
    },
  } as const;
  const { Icon, title, desc } = map[status];
  return (
    <Card className="flex flex-col items-center gap-3 p-12 text-center">
      <Icon className="h-10 w-10 text-muted-foreground" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </Card>
  );
}
