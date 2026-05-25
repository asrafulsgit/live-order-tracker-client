"use client";
import { Card } from "../ui/card";
import { ShoppingBag } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import Link from "next/link";
import OrderCard from "./OrderCard";
import { useEffect, useState } from "react";
import { orderServices } from "@/services/order.services";
import { toast } from "sonner";
import { OrderStatus } from "@/constants/data";

export type Order = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  food: {
    id: string;
    name: string;
    price: number;
    category: string;
    image_url: string | null;
    description : string
  };
  food_id: string;
  quantity: number;
  address: string;
  notes: string | null;
  id: string;
  total: number;
  status: OrderStatus;
  created_at: Date;
  updated_at: Date;
  user_id: string;
};

const MyOrders = () => {
  const [data, setData] = useState<Order[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await orderServices.getMyOrders();
        setData(data.data);
        setIsLoading(false);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-44 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  return data && data?.length > 0 ? (
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
