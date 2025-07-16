import { _electron as electron } from 'playwright';
import { test, expect } from '@playwright/test';

test('App starts and is ready', async () => {
  const electronApp = await electron.launch({
    executablePath: require('electron'),
    args: ['C:/KI/Pruki/modules-meta/core.app-shell/dist-main/index.js'],
    env: { ...process.env, NODE_ENV: 'development' },
    timeout: 60000,
  });
  let window;
  for (let i = 0; i < 30; ++i) {
    const windows = electronApp.windows();
    for (const w of windows) {
      if (w.url().startsWith('http://localhost:5174')) {
        window = w;
        break;
      }
    }
    if (window) break;
    await new Promise(f => setTimeout(f, 1000));
  }
  if (!window) throw new Error('Main window not found');
  
  expect(await window.title()).toBe('Pruki App Shell');

  // IPC Test
  const pingResult = await window.evaluate(async () => {
    return new Promise(resolve => {
      window.electron.ipcRenderer.once('pong', (event, arg) => {
        resolve(arg);
      });
      window.electron.ipcRenderer.send('ping', 'ping');
    });
  });
  expect(pingResult).toBe('pong-reply');

  await electronApp.close();
});

test('IPC error handling', async () => {
  const electronApp = await electron.launch({
    executablePath: require('electron'),
    args: ['C:/KI/Pruki/modules-meta/core.app-shell/dist-main/index.js'],
    env: { ...process.env, NODE_ENV: 'development' },
    timeout: 60000,
  });
  let window;
  for (let i = 0; i < 30; ++i) {
    const windows = electronApp.windows();
    for (const w of windows) {
      if (w.url().startsWith('http://localhost:5174')) {
        window = w;
        break;
      }
    }
    if (window) break;
    await new Promise(f => setTimeout(f, 1000));
  }
  if (!window) throw new Error('Main window not found');

  const errorResult = await window.evaluate(async () => {
    return new Promise(resolve => {
      window.electron.ipcRenderer.once('pong', (event, arg) => {
        resolve(arg);
      });
      // Send a message that will cause an error in the main process
      window.electron.ipcRenderer.send('ping', 'throw-error');
    });
  });
  expect(errorResult).toContain('Error:');

  await electronApp.close();
});