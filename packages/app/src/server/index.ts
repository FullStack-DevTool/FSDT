import http from "http";
import { WebSocketServer } from "ws";
import connectionManager from "./connection/ConnectionManager";
import { FsdtConnection } from "./connection/FsdtConnection";
import { ConnectionType, EventType } from "@fullstack-devtool/core";
import {
  sendErrorMessage,
  sendServerToMonitorMessage,
} from "./utils/sendMessage";
import { parseMessage } from "./utils/parseMessage";

const HOST_NAME = "localhost";
const PORT = Number(process.env.FSDT_PORT) || 0; // Get port from environment variable or use 0 to use a random port

function setupHttpServer(res: (value: { port: number }) => void) {
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World");
  });

  // The port number can be 0, which means that the operating system will assign an available port number for us.
  server.listen(PORT, HOST_NAME, () => {
    const port = (server.address() as any).port;
    console.log(`Server running at http://${HOST_NAME}:${port}/`);
    res({ port });
  });

  return server;
}

function setupWsServer(server: http.Server) {
  // Setup websocket server
  const wsServer = new WebSocketServer({
    server: server,
  });

  wsServer.on("connection", (wsConnection, req) => {
    const connection = new FsdtConnection(
      wsConnection,
      req.headers["fsdt-connection-type"] as ConnectionType,
      req.headers["fsdt-connection-name"] as string
    );

    connectionManager.register(connection);

    // Message handler
    connection.connection.on("message", (message) => {
      try {
        const { type, data } = parseMessage(message);

        // Send the log to the monitor
        if (type === EventType.LOG) {
          sendServerToMonitorMessage(
            connectionManager.monitor,
            connection,
            data
          );
        }
      } catch (error) {
        // Send error message to the source
        sendErrorMessage(connection.connection, error.message);
      }
    });

    // Close handler
    connection.connection.on("close", function () {
      connectionManager.unregister(connection);
    });
  });
}

export function initServer() {
  return new Promise<{ port: number }>((res) => {
    const server = setupHttpServer(res);
    setupWsServer(server);
  });
}
