// See the Electron documentation for details on how to use preload scripts:
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('AggregatorServer', {
  getPort: () => ipcRenderer.invoke('get-port'),
})
