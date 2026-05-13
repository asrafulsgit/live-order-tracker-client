import { Leaf, ShoppingBag, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
  const user = {
    email: "user@gamil.com",
    role: "user",
  };
  const role = user.role as "admin" | "user";
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">Sprout</span>
        </Link>

        {user ? (
          <nav className="flex items-center gap-1 sm:gap-2">
            {role === "user" && (
              <Button asChild variant="ghost" size="sm">
                <Link href="/orders">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="hidden sm:inline">My Orders</span>
                </Link>
              </Button>
            )}

            {role === "admin" && (
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              </Button>
            )}

            <span className="hidden text-sm text-muted-foreground sm:inline">
              {user.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              // onClick={signOut}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </nav>
        ) : (
          <Button asChild size="sm">
            <Link href="/login">Sign in</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
