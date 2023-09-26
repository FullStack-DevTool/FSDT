// See the Electron documentation for details on how to use preload scripts:
import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("AggregatorServer", {
	getPort: () => ipcRenderer.invoke("get-port"),
});