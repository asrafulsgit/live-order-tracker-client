import { Navbar } from "@/components/additionals/Navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
