import { ConnectionType } from '@fullstack-devtool/core'
import { WebSocket } from 'ws'

export class FsdtConnection {
  constructor(
    private _connection: WebSocket,
    private _type: ConnectionType,
    private _name: string = ''
  ) {}

  get connection() {
    return this._connection
  }

  get name() {
    return this._name
  }

  get type() {
    return this._type
  }

  isMonitor() {
    return this._type === ConnectionType.MONITOR
  }

  isSource() {
    return this._type === ConnectionType.SOURCE
  }
}
