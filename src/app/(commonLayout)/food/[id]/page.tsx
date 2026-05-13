import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FoodDetails from "@/components/food/FoodDetails";

function FoodDetail() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" /> Back to menu
        </Link>
      </Button>

      <FoodDetails />
    </main>
  );
}
export default FoodDetail;
