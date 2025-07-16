import { ipcMain } from 'electron';
export function registerIpcHandlers(window) {
    ipcMain.handle('ping', async (event, message) => {
        try {
            console.log(`Received ping: ${message}`);
            if (message === 'throw-error') {
                throw new Error('Simulated IPC error');
            }
            return 'pong';
        }
        catch (error) {
            console.error('Error handling ping IPC:', error);
            if (error instanceof Error) {
                return `Error: ${error.message}`;
            }
            else {
                return `Unknown error: ${error}`;
            }
        }
    });
    // Add more IPC handlers here
}
