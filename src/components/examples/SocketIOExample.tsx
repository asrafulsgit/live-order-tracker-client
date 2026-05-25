"use client";

import { useEffect, useState } from "react";
import { useSocketIO } from "@/hooks/useSocketIO";

/**
 * Example component showing how to use Socket.IO
 * 
 * This component demonstrates:
 * - Listening to socket events
 * - Emitting socket events
 * - Handling connection status
 * - Proper cleanup
 */
export function SocketIOExample() {
  const { emit, on, isConnected, isLoading } = useSocketIO();
  const [messages, setMessages] = useState<string[]>([]);
  const [notification, setNotification] = useState<string>("");

  useEffect(() => {
    // Don't set up listeners if socket is not ready
    if (isLoading || !isConnected) return;

    // Example 1: Listen to order updates
    const unsubscribeOrderUpdate = on("order-update", (data) => {
      const message = `Order updated: ${JSON.stringify(data)}`;
      setMessages((prev) => [...prev, message]);
      console.log("Order update:", data);
    });

    // Example 2: Listen to notifications
    const unsubscribeNotification = on("notification", (data) => {
      setNotification(data.message);
      console.log("Notification:", data);
    });

    // Example 3: Listen to status changes
    const unsubscribeStatus = on("status-change", (data) => {
      const message = `Status changed to: ${data.status}`;
      setMessages((prev) => [...prev, message]);
    });

    // Cleanup listeners on component unmount or when socket disconnects
    return () => {
      unsubscribeOrderUpdate();
      unsubscribeNotification();
      unsubscribeStatus();
    };
  }, [isLoading, isConnected, on]);

  const handleEmitOrderCreation = () => {
    emit("create-order", {
      items: [
        { foodId: 1, quantity: 2 },
        { foodId: 2, quantity: 1 },
      ],
    });
  };

  const handleEmitOrderStatusRequest = () => {
    emit("get-order-status", { orderId: 123 });
  };

  if (isLoading) {
    return <div className="p-4">Initializing socket connection...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Socket.IO Status</h2>

      {/* Connection Status */}
      <div className="flex items-center gap-2">
        <span
          className={`h-3 w-3 rounded-full ${
            isConnected ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span className="font-semibold">
          {isConnected ? "Connected" : "Disconnected"}
        </span>
      </div>

      {/* Notification Display */}
      {notification && (
        <div className="p-3 bg-blue-100 border border-blue-300 rounded">
          <p className="font-semibold">Latest Notification:</p>
          <p>{notification}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2">
        <h3 className="font-semibold">Emit Events:</h3>
        <button
          onClick={handleEmitOrderCreation}
          disabled={!isConnected}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Emit: Create Order
        </button>
        <button
          onClick={handleEmitOrderStatusRequest}
          disabled={!isConnected}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
        >
          Emit: Get Order Status
        </button>
      </div>

      {/* Messages Display */}
      <div className="space-y-2">
        <h3 className="font-semibold">Received Messages ({messages.length}):</h3>
        <div className="max-h-48 overflow-y-auto border rounded p-3 bg-gray-50">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-sm">No messages yet...</p>
          ) : (
            <ul className="space-y-1">
              {messages.map((msg, idx) => (
                <li key={idx} className="text-sm text-gray-700">
                  {idx + 1}. {msg}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-gray-100 rounded text-sm">
        <p className="font-semibold mb-2">How it works:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Socket initializes automatically for logged-in users</li>
          <li>Connection status is tracked and displayed above</li>
          <li>Buttons emit example events to the server</li>
          <li>Messages received from server are displayed below</li>
          <li>All listeners are cleaned up on unmount</li>
        </ul>
      </div>
    </div>
  );
}
