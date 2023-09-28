#!/usr/bin/env node
import { client as WebSocketClient } from "websocket";

const client = new WebSocketClient();

client.on("connectFailed", function (error) {
	console.log("Connect Error: " + error.toString());
});

client.on("connect", function (connection) {
	console.log("WebSocket Client Connected");
	connection.on("error", function (error) {
		console.log("Connection Error: " + error.toString());
	});
	connection.on("close", function () {
		console.log("echo-protocol Connection Closed");
	});
	connection.on("message", function (message) {
		if (message.type === "utf8") {
			console.log("Received: '" + message.utf8Data + "'");
		}
	});
});

client.connect("ws://localhost:58498/", "echo-protocol", "", {
	"fsdt-connection-type": "monitor",
});
