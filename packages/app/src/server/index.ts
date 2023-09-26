import http from "http";
import { server as WebSocketServer } from "websocket";
import connectionManager from "./connection.manager";
import { ConnectionType } from "src/types/connections.type";

const HOST_NAME = "localhost";

const PORT = Number(process.env.FSDT_PORT) || 0; // Get port from environment variable or use 0 to use a random port

export function initServer() {
	return new Promise<{ port: number }>((res) => {
		const server = http.createServer((req, res) => {
			res.statusCode = 200;
			res.setHeader("Content-Type", "text/plain");
			res.end("Hello World 3 + " + process.env.TEST);
		});

		// The port number can be 0, which means that the operating system will assign an available port number for us.
		server.listen(PORT, HOST_NAME, () => {
			const port = (server.address() as any).port;
			console.log(`Server running at http://${HOST_NAME}:${port}/`);
			res({ port });
		});

		// Setup websocket server
		const wsServer = new WebSocketServer({
			httpServer: server,
			// You should not use autoAcceptConnections for production
			autoAcceptConnections: false,
		});

		wsServer.on("request", (request) => {
			console.log(request.httpRequest.headers);
			const connection = request.accept("echo-protocol", request.origin);

			console.log(new Date() + " Connection accepted.");

			connectionManager.register(
				connection,
				request.httpRequest.headers["fsdt-connection-type"] as ConnectionType
			);
			console.log(connectionManager.getAll());
			// connection.on("message", (message) => {
			// 	if(message.type === 'utf8') {
			// 		console.log("Received Message: " + message.utf8Data);
			// 		connection.sendUTF(message.utf8Data);
			// 	}
			// });

			connection.on("close", function () {
				connectionManager.unregister(connection);
				console.log(connectionManager.getAll());
			});
		});
	});
}
