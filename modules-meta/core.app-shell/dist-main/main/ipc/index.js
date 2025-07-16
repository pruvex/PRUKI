import { ipcMain } from 'electron';
export function registerIpcHandlers(window) {
    ipcMain.handle('ping', async (event, message) => {
        console.log(`Received ping: ${message}`);
        return 'pong';
    });
    // Add more IPC handlers here
}
