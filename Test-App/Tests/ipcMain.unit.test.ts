import { EventEmitter } from 'events';
import { registerIpcHandlers } from '../../../modules-meta/core.app-shell/main/ipc/index';

describe('IPC Handler', () => {
  it('antwortet korrekt auf ping', (done) => {
    const win = {} as any; // Dummy window
    const ipcMain = new EventEmitter() as any;
    const responses: any[] = [];
    ipcMain.handle = (channel: string, handler: any) => {
      if (channel === 'ping') {
        Promise.resolve(handler({}, 'test')).then((result) => {
          responses.push(result);
          expect(result).toBe('pong');
          done();
        });
      }
    };
    registerIpcHandlers(win, ipcMain);
    ipcMain.emit('ping', {}, 'test');
  });
});
