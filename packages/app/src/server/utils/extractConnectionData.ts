import { ConnectionType } from '@fullstack-devtool/core'
import { IncomingMessage } from 'http'
import { getRequestUrl } from './getRequestUrl'

function validateConnectionData(connectionType: string, connectionName: string) {
  if (!connectionName) {
    throw new Error('Connection name is required')
  }

  if (!Object.values(ConnectionType).includes(connectionType as ConnectionType)) {
    throw new Error(`Invalid connection type: ${connectionType}`)
  }
}

/**
 * Extracts and validate the connection type and name from the request headers or from the URL.
 *
 */
export function extractConnectionData(req: IncomingMessage) {
  let connectionType = req.headers['fsdt-connection-type'] as string
  let connectionName = req.headers['fsdt-connection-name'] as string

  if (!connectionType && !connectionName) {
    const url = new URL(getRequestUrl(req))
    connectionType = url.searchParams.get('fsdt-connection-type') || ''
    connectionName = url.searchParams.get('fsdt-connection-name') || ''
  }

  validateConnectionData(connectionType, connectionName)

  return {
    connectionType: connectionType as ConnectionType,
    connectionName,
  }
}
