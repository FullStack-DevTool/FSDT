declare global {
	interface Window {
		AggregatorServer: {
			getPort: () => Promise<number>;
		};
	}
}

/**
 * 
 * Get the port number of the aggregator server from the main process
 * 
 * @returns The port number of the aggregator server
 */
export function getPort() {
	return window.AggregatorServer.getPort();
}
