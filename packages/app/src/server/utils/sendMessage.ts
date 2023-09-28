/**
 * This file aims to contain all the functions that send messages to the connected clients (monitor or source)
 */
import {
	EventType,
	FsdtErrorMessage,
	FsdtLogMessage,
	FsdtServerMessage,
	safeJsonStringify,
} from "@fullstack-devtool/core";
import { connection } from "websocket";
import { FsdtConnection } from "../connection/FsdtConnection";

export function sendServerToMonitorMessage(
	monitor: FsdtConnection,
	source: FsdtConnection,
	data: FsdtLogMessage
): void {
	if (!monitor) {
		throw new Error("You should connect a monitor to send a message");
	}
	const message: FsdtServerMessage = {
		type: EventType.SHARED_LOG,
		source: source.name,
		data,
	};
	monitor.connection.sendUTF(safeJsonStringify(message));
}

export function sendErrorMessage(connection: connection, error: string): void {
	const errorMessage: FsdtErrorMessage = {
		timestamp: Date.now(),
		error,
	};
	connection.sendUTF(
		safeJsonStringify({ type: EventType.ERROR, data: errorMessage })
	);
}
