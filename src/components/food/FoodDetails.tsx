"use client";

import { Food, getFoodById } from "@/constants/data";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

const FoodDetails = () => {
  const foodId = useParams().id as string;
  const isLoading = false;
  const user = {
    email: "karim@gmail.com",
  };
  const [qty, setQty] = useState(1);
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [placing, setPlacing] = useState(false);

  const food = getFoodById(foodId) as Food;

  if (isLoading || !food) {
    return (
      <div className="grid gap-8 lg:grid-cols-2">
        <Skeleton className="aspect-4/3 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="aspect-4/3 relative overflow-hidden  rounded-2xl border border-border/60 bg-muted">
        <Image
          src={food.image_url}
          alt={food.name}
          fill
          loading="lazy"
          className="h-full w-full absolute object-cove"
        />
      </div>

      <div className="space-y-5">
        <div className="space-y-3">
          <Badge variant="secondary" className="uppercase tracking-wide">
            {food.category}
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {food.name}
          </h1>
          <p className="text-muted-foreground">{food.description}</p>
          <div className="text-3xl font-semibold text-primary">
            ${Number(food.price).toFixed(2)}
          </div>
        </div>

        <Card className={cn("", "p-5 flex gap-3")}>
          <div className="flex items-center justify-between">
            <Label>Quantity</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() => setQty((q) => Math.min(20, q + 1))}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Delivery address</Label>
            <Input
              id="address"
              placeholder="123 Garden Lane"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any allergies or instructions?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-xl font-semibold">
              ${(Number(food.price) * qty).toFixed(2)}
            </span>
          </div>

          <Button
            // onClick={placeOrder}
            disabled={placing}
            className="w-full"
            size="lg"
          >
            {placing ? "Placing order…" : "Place order"}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default FoodDetails;
