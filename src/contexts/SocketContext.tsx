"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { initializeSocket, disconnectSocket, getSocket } from "@/lib/socket";
import { authServices } from "@/services/auth.services";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  isLoading: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initSocket = async () => {
      try {
        // Check if user is authenticated
        const user = await authServices.me();

        if (!user) {
          setIsLoading(false);
          return;
        }

        const socketInstance = initializeSocket();

        socketInstance.on("connect", () => {
          if (isMounted) {
            setIsConnected(true);
            setSocket(socketInstance);
          }
        });

        socketInstance.on("disconnect", () => {
          if (isMounted) {
            setIsConnected(false);
          }
        });

        socketInstance.on("connect_error", () => {
          if (isMounted) {
            setIsConnected(false);
          }
        });
      } catch (error) {
        console.log("User not authenticated, socket not initialized");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initSocket();

    return () => {
      isMounted = false;
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const currentSocket = getSocket();
      if (currentSocket) {
        currentSocket.removeAllListeners();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected, isLoading }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
