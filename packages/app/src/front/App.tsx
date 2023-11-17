import { createRoot } from 'react-dom/client'
import styled from '@emotion/styled'

import AppContainer from './components/AppContainer'
import Sidebar from './components/section/Sidebar'
import Header from './components/section/Header'
import Content from './components/Content'
import FsdtLogger from '@fullstack-devtool/sdk'
import { getPort } from './utils/server.service'
import { useMessageStore } from './stores/messageStore'
import { GlobalStyles } from './components/GlobalStyles'

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

getPort().then((port) => {
  console.log('port', port)
  const logger = new FsdtLogger('Test', {
    connectionType: 'monitor',
    port,
  })

  logger.onLogReceived((message) => {
    useMessageStore.getState().addMessage(message)
  })
})

export function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      <Sidebar />
      <Main>
        <Header />
        <Content />
      </Main>
    </AppContainer>
  )
}

const container = document.getElementById('app')
const root = createRoot(container!)
root.render(<App />)
