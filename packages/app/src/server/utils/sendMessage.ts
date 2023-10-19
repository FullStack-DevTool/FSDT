/**
 * This file aims to contain all the functions that send messages to the connected clients (monitor or source)
 */
import {
  EventType,
  FsdtErrorMessageContent,
  FsdtLogMessageContent,
  FsdtServerMessage,
  safeJsonStringify,
} from "@fullstack-devtool/core";
import { FsdtConnection } from "../connection/FsdtConnection";
import { WebSocket } from "ws";

export function sendServerToMonitorMessage(
  monitor: FsdtConnection,
  source: FsdtConnection,
  data: FsdtLogMessageContent
): void {
  if (!monitor) {
    throw new Error("You should connect a monitor to send a message");
  }
  const message: FsdtServerMessage = {
    type: EventType.SHARED_LOG,
    source: source.name,
    data,
  };
  monitor.connection.send(safeJsonStringify(message));
}

export function sendErrorMessage(connection: WebSocket, error: string): void {
  const errorMessage: FsdtErrorMessageContent = {
    timestamp: Date.now(),
    error,
  };
  connection.send(
    safeJsonStringify({ type: EventType.ERROR, data: errorMessage })
  );
}
