import Hero from "@/components/home/Hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Hero />
    </div>
  );
};

export default page;
