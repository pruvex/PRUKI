import { app, BrowserWindow } from 'electron';
import path from 'path';
import { registerIpcHandlers } from './ipc/index.js';
function createWindow() {
    console.log('createWindow called');
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Pruki',
        webPreferences: {
            preload: path.join(__dirname, '../preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    registerIpcHandlers(mainWindow);
    const viteDevServerUrl = process.argv.find(arg => arg.startsWith('--vite-dev-server-url='))?.split('=')[1];
    if (viteDevServerUrl) {
        mainWindow.loadURL(viteDevServerUrl);
    }
    else {
        mainWindow.loadFile(path.join(__dirname, `../renderer/index.html`));
    }
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
