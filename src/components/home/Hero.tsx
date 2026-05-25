"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { IUser } from "../additionals/Navbar";
import { authServices } from "@/services/auth.services";

const Hero = () => {
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
  }, []);
  return (
    <Button>
      <Link href={userData?.role === "USER" ? "/food" : "/admin"}>
        {userData?.role === "USER" ? "See available foods" : "See orders"}
      </Link>
    </Button>
  );
};

export default Hero;
