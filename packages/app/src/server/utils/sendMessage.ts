/**
 * This file aims to contain all the functions that send messages to the connected clients (monitor or source)
 */
import { createErrorMessage, safeJsonStringify } from '@fullstack-devtool/core'
import { WebSocket } from 'ws'

export function sendErrorMessage(connection: WebSocket, error: string): void {
  const errorMessage = createErrorMessage(error)
  connection.send(safeJsonStringify(errorMessage))
}
