import { Food } from "@/constants/data";
import Link from "next/link"; 
import { Card } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";

const FoodCard = ({ food }: { food: Food }) => {
  return (
    <Link key={food.id} href={`/food/${food.id}`} className="group">
      <Card className="h-full overflow-hidden border-border/60 p-0 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
        <div className="aspect-4/3 relative overflow-hidden bg-muted">
          <Image
            src={food.image_url || "https://i.ibb.co.com/qYbBkbcg/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.webp"}
            alt={food.name}
            loading="lazy"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="space-y-2 p-5">
          <Badge
            variant="secondary"
            className="text-[10px] uppercase tracking-wide"
          >
            {food.category}
          </Badge>
          <h3 className="text-lg font-semibold tracking-tight">{food.name}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {food.description}
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-semibold text-primary">
              ${Number(food.price).toFixed(2)}
            </span>
            <span className="text-xs font-medium text-muted-foreground group-hover:text-primary">
              View &rarr;
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default FoodCard;
