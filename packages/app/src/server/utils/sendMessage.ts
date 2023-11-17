/**
 * This file aims to contain all the functions that send messages to the connected clients (monitor or source)
 */
import {
  createErrorMessage,
  createServerLog,
  FsdtLogMessageContent,
  FsdtServerMessage,
  safeJsonStringify,
} from '@fullstack-devtool/core'
import { FsdtConnection } from '../connection/FsdtConnection'
import { WebSocket } from 'ws'
import { getLogId } from './getLogId'

export function sendServerToMonitorMessage(
  monitor: FsdtConnection,
  source: FsdtConnection,
  data: FsdtLogMessageContent
): void {
  if (!monitor) {
    throw new Error('You should connect a monitor before sending a message')
  }

  const message: FsdtServerMessage = createServerLog(source.name, data, getLogId())
  monitor.connection.send(safeJsonStringify(message))
}

export function sendErrorMessage(connection: WebSocket, error: string): void {
  const errorMessage = createErrorMessage(error)
  connection.send(safeJsonStringify(errorMessage))
}
