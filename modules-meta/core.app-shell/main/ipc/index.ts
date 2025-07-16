import { BrowserWindow, ipcMain } from 'electron';
import { IpcChannels } from './types.js';

export function registerIpcHandlers(win: Electron.BrowserWindow) {
  ipcMain.handle('ping', async (_event, arg: IpcChannels['ping']['request']): Promise<IpcChannels['ping']['response']> => {
    try {
      console.log(`Received ping: ${arg}`);
      if (arg === 'throw-error') {
        throw new Error('Simulated IPC error');
      }
      return 'pong';
    } catch (error) {
      console.error('Error handling ping IPC:', error);
      if (error instanceof Error) {
        return `Error: ${error.message}`;
      } else {
        return `Unknown error: ${error}`;
      }
    }
  });

  // Add more IPC handlers here
}
