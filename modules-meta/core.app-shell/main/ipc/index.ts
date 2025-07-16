import { BrowserWindow, ipcMain } from 'electron';

export function registerIpcHandlers(window: BrowserWindow) {
  ipcMain.handle('ping', async (event, message) => {
    console.log(`Received ping: ${message}`);
    return 'pong';
  });

  // Add more IPC handlers here
}
