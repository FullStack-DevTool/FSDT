import { Message } from "websocket";
import {
	safeJsonParse,
	FsdtMessage,
	FsdtLogMessage,
	EventType,
} from "@fullstack-devtool/core";

function validateMessageData(message: FsdtMessage<FsdtLogMessage>) {
	if (!message.type || !message.data.log || !message.data.timestamp) {
		throw new Error(
			"The message should have a type, a data.log and a data.timestamp"
		);
	}

	if (!Object.values(EventType).includes(message.type)) {
		throw new Error(
			`The message type should be one of ${Object.values(EventType).join(", ")}`
		);
	}
}

/**
 * It parses and validate the message received from the client
 */
export function parseMessage(message: Message) {
	if (message.type !== "utf8" || !message.utf8Data)
		throw new Error("The message should be utf8 and not empty");
	const parsedMessage = safeJsonParse<FsdtMessage<FsdtLogMessage>>(
		message.utf8Data
	);
	if (!parsedMessage) throw new Error("The message should be a valid JSON");

	validateMessageData(parsedMessage);

	return parsedMessage;
}
