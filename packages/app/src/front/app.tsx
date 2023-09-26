import { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { getPort } from "./utils/server.service";

export function App() {
	const [port, setPort] = useState<number>(0)

	useEffect(() => {
		getPort().then((port: number) => {
			setPort(port);
		});
	}, [])

	return <h2>Port: {port}</h2>;
}

function render() {
	ReactDOM.render(<App />, document.body);
}

render();
