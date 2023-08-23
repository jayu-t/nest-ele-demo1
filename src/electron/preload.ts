import { contextBridge, ipcRenderer } from 'electron';

console.log('from preload');

contextBridge.exposeInMainWorld('ipc', {
  send: (channelName, args) => ipcRenderer.send(channelName, args),
  invoke: (channelName, args) => ipcRenderer.invoke(channelName, args),
});
