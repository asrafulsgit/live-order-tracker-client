import { Navbar } from "@/components/additionals/Navbar";
import { SocketProvider } from "@/contexts/SocketContext";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SocketProvider>{children}</SocketProvider>
    </div>
  );
};

export default layout;
