import { ConnectionType } from "../types/connections.type";
import { connection } from "websocket";

class ConnectionManager {
	private monitor: connection | null = null;
	private sources: connection[] = [];

	register(connection: connection, type: ConnectionType) {
		if (type === ConnectionType.MONITOR) {
			this.monitor.close();
			this.monitor = connection;
		} else if (type === ConnectionType.SOURCE) {
			this.sources.push(connection);
		}
	}

	unregister(connection: connection) {
		if (this.monitor === connection) {
			this.monitor.close();
			this.monitor = null;
		} else {
			const sourceToRemove = this.sources.find(
				(source) => source === connection
			);
			if (!sourceToRemove) throw new Error("Source not found");

			sourceToRemove.close();
			this.sources = this.sources.filter((source) => source !== connection);
		}
	}

	getAll() {
		return {
			monitor: this.monitor,
			sources: this.sources,
		};
	}
}

export default new ConnectionManager();
