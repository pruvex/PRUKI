import { test, expect } from '@playwright/test';
import { helloShell } from './app-shell';

test('helloShell gibt den korrekten String zurück', () => {
  expect(helloShell()).toBe('Hello from core.app-shell!');
});
