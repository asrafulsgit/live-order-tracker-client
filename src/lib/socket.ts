import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";

let socketInstance: Socket | null = null;

const socketOptions = {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
  transports: ["websocket", "polling"],
  withCredentials: true,
};

/**
 * Initialize socket connection for authenticated users
 * @param token - Access token for authentication
 * @returns Socket instance
 */
export const initializeSocket = (): Socket => {
  if (socketInstance && socketInstance.connected) {
    return socketInstance;
  }

  socketInstance = io(SOCKET_URL, {
    ...socketOptions,
    withCredentials : true
  });

  // Connection events
  socketInstance.on("connect", () => {
    console.log("Socket connected:", socketInstance?.id);
  });

  socketInstance.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
    if (reason === "io server disconnect") {
      socketInstance = null;
    }
  });

  socketInstance.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });

  socketInstance.on("error", (error) => {
    console.error("Socket error:", error);
  });

  return socketInstance;
};

/**
 * Get the current socket instance
 */
export const getSocket = (): Socket | null => {
  return socketInstance;
};

/**
 * Disconnect and cleanup socket
 */
export const disconnectSocket = (): void => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};

/**
 * Check if socket is connected
 */
export const isSocketConnected = (): boolean => {
  return socketInstance?.connected ?? false;
};

/**
 * Emit event to server
 */
export const emitSocket = (event: string, data?: any): void => {
  if (socketInstance?.connected) {
    socketInstance.emit(event, data);
  } else {
    console.warn("Socket is not connected. Cannot emit event:", event);
  }
};

/**
 * Listen to socket events
 */
export const onSocketEvent = (event: string, callback: (data: any) => void): (() => void) => {
  if (!socketInstance) {
    console.warn("Socket not initialized");
    return () => {};
  }

  socketInstance.on(event, callback);

  // Return unsubscribe function
  return () => {
    socketInstance?.off(event, callback);
  };
};
