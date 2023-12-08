import { createRoot } from 'react-dom/client'
import Header from './components/section/Header'
import Content from './components/section/Content'
import FsdtLogger from '@fullstack-devtool/sdk'
import { getAppVersion, getPort } from './utils/server.service'
import { useMessageStore } from './stores/messageStore'
import { theme } from './theme'
import { Global, ThemeProvider } from '@emotion/react'
import { globalStyle } from './utils/globalStyle'
import { Filters } from './components/section/Filters'
import { useApp } from './stores/useApp'

getPort().then((port) => {
  const logger = new FsdtLogger('Test', {
    connectionType: 'monitor',
    port,
  })

  logger.onLogReceived((message) => {
    useMessageStore.getState().addMessage(message)
  })
})

getAppVersion().then((version) => {
  useApp.getState().setVersion(version)
})

export function App() {
  return (<>
      <Global styles={globalStyle} />
      <Header />
      <Filters />
      <Content />
    </>
  )
}

const container = document.getElementById('app')
const root = createRoot(container!)
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
)
