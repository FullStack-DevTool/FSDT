import * as ReactDOM from "react-dom";
import styled from "@emotion/styled";

import AppContainer from "./components/AppContainer";
import Sidebar from "./components/section/Sidebar";
import Header from "./components/section/Header";
import Content from "./components/Content";

const Main = styled.div`
	flex: 1;
`;

export function App() {
	return <AppContainer>
		<Sidebar />
		<Main>
			<Header />
			<Content />
		</Main>
	</AppContainer>;
}

function render() {
	ReactDOM.render(<App />, document.body);
}

render();
