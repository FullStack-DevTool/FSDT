import { createRoot } from 'react-dom/client'
import Header from './components/section/Header'
import Content from './components/section/Content'
import FsdtLogger from '@fullstack-devtool/sdk'
import { getPort } from './utils/server.service'
import { useMessageStore } from './stores/messageStore'
import { theme } from './theme'
import { Global, ThemeProvider } from '@emotion/react'
import { globalStyle } from './utils/globalStyle'

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
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <Header />
      <Content />
    </ThemeProvider>
  )
}

const container = document.getElementById('app')
const root = createRoot(container!)
root.render(<App />)
