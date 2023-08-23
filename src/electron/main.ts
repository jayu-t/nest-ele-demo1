import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { bootstrapNestApp } from '../main';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('../../../ui/index.html');
  win.maximize();
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
  bootstrapNestApp();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
