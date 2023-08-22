const { contextBridge, ipcRenderer } = require('electron');

console.log('from preload');

contextBridge.exposeInMainWorld('ipc', {
  send: (channelName) => ipcRenderer.send(channelName),
});