"use client";

import { useSocket } from "@/contexts/SocketContext";
import { useCallback, useEffect, useRef } from "react";

type EventCallback = (...args: any[]) => void;

/**
 * Production-ready socket hook.
 *
 * - Deduplicates listeners: calling on() twice for the same event
 *   replaces the old listener instead of stacking them.
 * - Auto-cleans all listeners when the component unmounts.
 * - Re-registers listeners when the socket reconnects (isConnected dep).
 * - emit is safe: no-ops with a warning when disconnected.
 */
export const useSocketIO = () => {
  const { socket, isConnected, isLoading } = useSocket();

  // Map of event → currently registered callback on the socket instance
  const listenersRef = useRef<Map<string, EventCallback>>(new Map());

  /**
   * Register a listener for a socket event.
   * Safe to call inside useEffect — deduplicates automatically.
   *
   * @returns cleanup function (call in useEffect return)
   */
  const on = useCallback(
    (event: string, callback: EventCallback) => {
      if (!socket) {
        console.warn(`[Socket] on("${event}") skipped — socket not ready`);
        return () => {};
      }

      // Remove stale listener for this event before adding the new one
      const existing = listenersRef.current.get(event);
      if (existing) {
        socket.off(event, existing);
      }

      socket.on(event, callback);
      listenersRef.current.set(event, callback);

      // Return cleanup so callers can use: return () => off(event)
      return () => {
        socket.off(event, callback);
        listenersRef.current.delete(event);
      };
    },
    [socket] // ✅ re-creates when socket instance changes (e.g. after reconnect)
  );

  /**
   * Remove a specific event listener.
   */
  const off = useCallback(
    (event: string) => {
      if (!socket) return;

      const cb = listenersRef.current.get(event);
      if (cb) {
        socket.off(event, cb);
        listenersRef.current.delete(event);
      }
    },
    [socket]
  );

  /**
   * Listen for an event exactly once, then auto-remove.
   */
  const once = useCallback(
    (event: string, callback: EventCallback) => {
      if (!socket) {
        console.warn(`[Socket] once("${event}") skipped — socket not ready`);
        return () => {};
      }

      socket.once(event, callback);
      return () => socket.off(event, callback);
    },
    [socket]
  );

  /**
   * Emit an event to the server.
   * No-ops with a warning if the socket isn't connected.
   */
  const emit = useCallback(
    (event: string, ...args: any[]) => {
      if (!socket || !isConnected) {
        console.warn(`[Socket] emit("${event}") skipped — not connected`);
        return;
      }
      socket.emit(event, ...args);
    },
    [socket, isConnected] // ✅ both deps — socket instance + connection state
  );

  // ── Global cleanup on unmount ─────────────────────────────────────────────
  // Removes every listener this hook registered, regardless of which
  // component forgets to call off().
  useEffect(() => {
    return () => {
      if (!socket) return;
      listenersRef.current.forEach((cb, event) => {
        socket.off(event, cb);
      });
      listenersRef.current.clear();
    };
  }, [socket]);

  return {
    socket,
    isConnected,
    isLoading,
    emit,
    on,
    off,
    once,
  };
};