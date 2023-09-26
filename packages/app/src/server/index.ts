import http from "http";

const HOST_NAME = "localhost";

const PORT = Number(process.env.FSDT_PORT) || 0; // Get port from environment variable or use 0 to use a random port

export function initServer() {
	return new Promise<{port: number}>((res) => {
		const server = http.createServer((req, res) => {
			res.statusCode = 200;
			res.setHeader("Content-Type", "text/plain");
			res.end("Hello World 3 + " + process.env.TEST);
		});

		// The port number is 0, which means that the operating system will assign an available port number for us.
		server.listen(PORT, HOST_NAME, () => {
			const port = (server.address() as any).port;
			console.log(`Server running at http://${HOST_NAME}:${port}/`);
			res({port});
		});
	});
}
