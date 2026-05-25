"use client";
import { Food } from "@/constants/data";
import { Skeleton } from "../ui/skeleton";
import FoodCard from "./FoodCard";
import { useEffect, useState } from "react";
import { foodServices } from "@/services/food.services";
import { toast } from "sonner";

function FoodList() {
  const [data, setData] = useState<Food[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await foodServices.getFoods();
        setData(data.data);
        setIsLoading(false);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchUser();
  }, []);
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <section className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Fresh meals,
          <br />
          delivered today.
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Hand-picked dishes from local kitchens. Browse, tap, and we'll bring
          it to your door.
        </p>
      </section>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-72 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((food) => (
            <FoodCard food={food} key={food.id} />
          ))}
        </div>
      )}
    </main>
  );
}

export default FoodList;
