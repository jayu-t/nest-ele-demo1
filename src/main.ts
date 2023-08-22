import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ElectronIpcTransport } from './microservices';

function createWindow() {
  console.log(path);
  console.log(BrowserWindow);

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '../../ui/preload.js'),
    },
  });

  win.loadFile('../../ui/index.html');
  win.maximize();
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
  bootstrap();

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

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      strategy: new ElectronIpcTransport(),
    },
  );
  await app.listen();
}
