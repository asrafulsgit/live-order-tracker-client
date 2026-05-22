"use client";

import { Leaf, ShoppingBag, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authServices } from "@/services/auth.services";
import { toast } from "sonner";
import { useEffect, useState } from "react";

type IUser = {
  name: string;
  email: string;
  role: string;
} | null;

export function Navbar() {
  const [userData, setUserData] = useState<IUser>(null);

  const role = userData?.role as "ADMIN" | "USER";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await authServices.me();
        setUserData(data.data);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchUser();
  }, [userData]);

  async function signOut() {
    try {
      await authServices.logout();
    } catch (error: any) {
      toast.error(error.message || "Error while logout");
    }
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">Sprout</span>
        </Link>

        {userData ? (
          <nav className="flex items-center gap-1 sm:gap-2">
            {role === "USER" && (
              <Button asChild variant="ghost" size="sm">
                <Link href="/orders">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="hidden sm:inline">My Orders</span>
                </Link>
              </Button>
            )}

            {role === "ADMIN" && (
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              </Button>
            )}

            <span className="hidden text-sm text-muted-foreground sm:inline">
              {userData.name}
            </span>
            <Button variant="outline" size="sm" onClick={signOut}>
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
