import { Food, FOODS } from "@/constants/data";
import { Navbar } from "../additionals/Navbar";
import { Skeleton } from "../ui/skeleton";
import FoodCard from "./FoodCard";

function FoodList() {
  const data: Food[] = FOODS;
  const isLoading = false;
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
