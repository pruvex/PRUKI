// Beispiel: Logging im Renderer via preload
import { contextBridge } from 'electron';
import log from 'electron-log';

contextBridge.exposeInMainWorld('log', {
  info: (msg: string) => log.info(msg),
  error: (msg: string) => log.error(msg),
});
