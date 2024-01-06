import {
  createServerLog,
  EventType,
  FsdtLogMessageContent,
  FsdtServerMessage,
  safeJsonStringify,
} from '@fullstack-devtool/core'
import { FsdtConnection } from './FsdtConnection'
import { sendErrorMessage } from '../utils/sendMessage'
import { parseMessage } from '../utils/parseMessage'
import { getLogId } from '../utils/getLogId'

export class ConnectionManager {
  private _monitor: FsdtConnection | null = null
  private _sources: FsdtConnection[] = []
  private _messageQueue: FsdtServerMessage[] = []

  register(connection: FsdtConnection) {
    if (connection.isMonitor()) {
      if (this._monitor) {
        this._monitor.connection.close()
      }
      this._monitor = connection
      this.flushMessageQueue()
    } else if (connection.isSource()) {
      this._sources.push(connection)
    }
    this.addListeners(connection)
  }

  unregister(connection: FsdtConnection) {
    connection.connection.close()

    if (this._monitor === connection) {
      this._monitor = null
    } else {
      const sourceToRemove = this._sources.find((source) => source === connection)
      if (!sourceToRemove) throw new Error('Source not found')

      this._sources = this._sources.filter((source) => source !== connection)
    }
  }

  private sendMessageOrEnqueue(connection: FsdtConnection, data: FsdtLogMessageContent) {
    const message = createServerLog(connection.name, data, getLogId())
    if (!this._monitor) {
      this._messageQueue.push(message)
      return
    }
    this._monitor.connection.send(safeJsonStringify(message))
  }

  private flushMessageQueue() {
    this._monitor.connection.send(safeJsonStringify(this._messageQueue))
    this._messageQueue = []
  }

  private addListeners(connection: FsdtConnection) {
    // Message handler
    connection.connection.on('message', (message) => {
      try {
        const { type, data } = parseMessage(message)

        // Send the log to the monitor
        if (type === EventType.LOG) {
          this.sendMessageOrEnqueue(connection, data)
        }
      } catch (error) {
        // Send error message to the source
        sendErrorMessage(connection.connection, error.message)
      }
    })

    // Close handler
    connection.connection.on('close', () => {
      this.unregister(connection)
    })
  }
}
