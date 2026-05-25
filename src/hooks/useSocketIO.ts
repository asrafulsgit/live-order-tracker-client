"use client";

import { useCallback } from "react";
import { useSocket } from "@/contexts/SocketContext";
import { emitSocket, onSocketEvent } from "@/lib/socket";

/**
 * Hook for using socket in components
 * Provides simplified interface for emitting and listening to socket events
 */
export const useSocketIO = () => {
  const { socket, isConnected, isLoading } = useSocket();

  const emit = useCallback(
    (event: string, data?: any) => {
      if (!isConnected) {
        console.warn("Socket not connected. Cannot emit event:", event);
        return;
      }
      emitSocket(event, data);
    },
    [isConnected]
  );

  const on = useCallback(
    (event: string, callback: (data: any) => void) => {
      return onSocketEvent(event, callback);
    },
    []
  );

  const once = useCallback(
    (event: string, callback: (data: any) => void) => {
      if (!socket) {
        console.warn("Socket not initialized");
        return () => {};
      }
      socket.once(event, callback);
      return () => socket?.off(event, callback);
    },
    [socket]
  );

  return {
    socket,
    isConnected,
    isLoading,
    emit,
    on,
    once,
  };
};
