import {
  getFoodById,
  NewOrder,
  ORDERS,
  OrderStatus,
  STATUS_LABEL,
} from "@/constants/data";
import { Card } from "../ui/card";
import { ShoppingBag } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import OrderProgress from "@/components/user/ProgressBar";
import { Button } from "../ui/button";
import Link from "next/link";
import OrderCard from "./OrderCard";

const MyOrders = () => {
  const isLoading = false;
  const data: NewOrder[] = ORDERS.reduce<NewOrder[]>((result, order) => {
    const food = getFoodById(order.food_id);
    if (!food) return result;

    result.push({
      ...order,
      food,
    });

    return result;
  }, []);
  if (isLoading)
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-44 w-full rounded-2xl" />
        ))}
      </div>
    );

  return data && data.length > 0 ? (
    <div className="space-y-4">
      {data.map((o) => (
        <OrderCard order={o} key={o.id} />
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
  );
};

export default MyOrders;
