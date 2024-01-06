import 'dotenv/config'
import http from 'http'
import { WebSocketServer } from 'ws'
import { ConnectionManager } from './connection/ConnectionManager'
import { FsdtConnection } from './connection/FsdtConnection'
import { Any } from '@fullstack-devtool/core'
import { sendErrorMessage } from './utils/sendMessage'
import { extractConnectionData } from './utils/extractConnectionData'

const HOST_NAME = 'localhost'
const PORT = Number(process.env.FSDT_PORT) || 0 // Get port from environment variable or use 0 to use a random port

const connectionManager = new ConnectionManager()

function setupHttpServer(res: (value: { port: number; server: http.Server }) => void) {
  const server = http.createServer((_, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello World')
  })

  // The port number can be 0, which means that the operating system will assign an available port number for us.
  server.listen(PORT, HOST_NAME, () => {
    const port = (server.address() as Any).port
    console.log(`Server running at http://${HOST_NAME}:${port}/`)
    res({ port, server })
  })

  return server
}

function setupWsServer(server: http.Server) {
  // Setup websocket server
  const wsServer = new WebSocketServer({
    server: server,
  })
  wsServer.on('connection', (wsConnection, req) => {
    try {
      const { connectionName, connectionType } = extractConnectionData(req)
      const connection = new FsdtConnection(wsConnection, connectionType, connectionName)
      connectionManager.register(connection)
    } catch (error) {
      console.error(error)
      sendErrorMessage(wsConnection, error.message)
      wsConnection.close()
    }
  })
}

export function initServer() {
  return new Promise<{ port: number; server: http.Server }>((res) => {
    const server = setupHttpServer(res)
    setupWsServer(server)
  })
}
