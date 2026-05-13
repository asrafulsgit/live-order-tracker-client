import { Button } from "@/components/ui/button";
import MyOrders from "@/components/user/MyOrders";
import Link from "next/link";

function OrdersPage() {
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
      <MyOrders />
    </main>
  );
}

export default OrdersPage;
