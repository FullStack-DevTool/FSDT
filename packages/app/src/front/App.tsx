import * as ReactDOM from "react-dom";
import styled from "@emotion/styled";

import AppContainer from "./components/AppContainer";
import Sidebar from "./components/section/Sidebar";
import Header from "./components/section/Header";
import Content from "./components/Content";
import FsdtLogger from "@fullstack-devtool/sdk";
import { getPort } from "./utils/server.service";

const Main = styled.div`
  flex: 1;
`;

getPort().then((port) => {
  console.log("port", port);
  const logger = new FsdtLogger("Test", {
    connectionType: "source",
    port,
  });

  logger.log("Test");
});

export function App() {
  return (
    <AppContainer>
      <Sidebar />
      <Main>
        <Header />
        <Content />
      </Main>
    </AppContainer>
  );
}

function render() {
  ReactDOM.render(<App />, document.body);
}

render();
