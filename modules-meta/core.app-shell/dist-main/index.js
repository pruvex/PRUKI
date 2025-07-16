import { app, BrowserWindow, crashReporter } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import isDev from 'electron-is-dev';
import log from 'electron-log';
import windowStateKeeper from 'electron-window-state';
import { registerIpcHandlers } from './ipc/index.js';
log.transports.file.level = 'info';
log.transports.file.format = '{h}:{i}:{s}.{ms} {level} {text}';
log.info('App starting...');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
function createWindow() {
    log.info('Creating main window state keeper.');
    const mainWindowState = windowStateKeeper({
        defaultWidth: 800,
        defaultHeight: 600,
    });
    log.info('Creating main window.');
    const win = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        title: 'Pruki App Shell',
        show: false, // Hide the main window initially
        webPreferences: {
            preload: path.join(__dirname, '../dist-main/preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
    });
    mainWindowState.manage(win);
    log.info('Creating splash screen.');
    const splash = new BrowserWindow({
        width: 400,
        height: 300,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
    });
    splash.loadFile(path.join(__dirname, '../public/splash.html'));
    log.info('Splash screen loaded.');
    win.once('ready-to-show', () => {
        log.info('Main window ready to show. Destroying splash screen.');
        splash.destroy();
        win.show();
    });
    if (isDev) {
        log.info('Loading Vite URL in development mode.');
        win.loadURL('http://localhost:5174');
        win.webContents.openDevTools();
    }
    else {
        log.info('Loading local file in production mode.');
        win.loadFile(path.join(__dirname, '../../index.html'));
    }
    registerIpcHandlers(win);
    log.info('IPC handlers registered.');
}
app.whenReady().then(createWindow);
app.on('ready', () => {
    app.setAppLogsPath(); // Set default path for logs
    log.info('App is ready.');
});
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
// Crash Reporter (basic setup)
app.on('ready', () => {
    crashReporter.start({
        productName: 'PrukiAppShell',
        companyName: 'Pruki',
        submitURL: 'https://your-crash-report-server.com/post', // Replace with your actual crash report server URL
        uploadToServer: true,
    });
});
