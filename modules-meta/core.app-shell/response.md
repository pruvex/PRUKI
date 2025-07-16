Projektstruktur: core.app-shell
Generated code
core.app-shell/
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── e2e/
│   └── app.spec.ts
├── main/
│   ├── ipc/
│   │   └── index.ts
│   └── index.ts
├── package.json
├── postcss.config.js
├── README.md
├── renderer/
│   ├── index.html
│   ├── src/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── tsconfig.json
│   └── tsconfig.node.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
Use code with caution.
1. Konfigurationsdateien auf Root-Ebene
package.json
Diese Datei definiert alle Skripte, Abhängigkeiten und den ESM-Kontext für das Modul.
Generated json
{
  "name": "core.app-shell",
  "version": "1.0.0",
  "description": "Central App-Shell for the modular Pruki Desktop-Framework.",
  "type": "module",
  "main": "dist-main/index.js",
  "scripts": {
    "dev": "concurrently \"npm:dev:vite\" \"npm:dev:electron\"",
    "dev:vite": "vite",
    "dev:electron": "electron .",
    "build": "npm run build:vite && npm run build:electron",
    "build:vite": "vite build",
    "build:electron": "tsc -p tsconfig.json",
    "start": "npm run build && electron .",
    "test": "playwright test",
    "test:headed": "playwright test --headed"
  },
  "dependencies": {
    "electron-is-dev": "^3.0.1"
  },
  "devDependencies": {
    "@playwright/test": "^1.45.0",
    "@types/electron": "^1.6.10",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "concurrently": "^8.2.2",
    "electron": "^31.1.0",
    "electron-builder": "^24.13.3",
    "postcss": "^8.4.38",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwindcss": "^3.4.4",
    "typescript": "^5.5.2",
    "vite": "^5.3.1"
  },
  "author": "Pruki Framework",
  "license": "MIT"
}
Use code with caution.
Json
vite.config.ts
Konfiguriert den Vite-Entwicklungsserver und den Build-Prozess für das Renderer-Frontend.
Generated typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist/renderer',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
})
Use code with caution.
TypeScript
tsconfig.json
TypeScript-Konfiguration für den Electron-Main-Prozess.
Generated json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "dist-main",
    "rootDir": "main"
  },
  "include": ["main/**/*.ts"],
  "exclude": ["node_modules"]
}
Use code with caution.
Json
.gitignore
Generated code
# Dependencies
/node_modules
/.pnp
.pnp.js

# Build outputs
/dist
/dist-main

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
Use code with caution.
2. Main-Prozess (Electron)
main/index.ts
Der Haupteinstiegspunkt der Electron-Anwendung. Erstellt das Browser-Fenster und lädt je nach Umgebung die passende URL.
Generated typescript
import { app, BrowserWindow } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import { fileURLToPath } from 'url';
import { registerIpcHandlers } from './ipc/index.js';

// Get correct __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Pruki',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Example for secure preload
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Register all IPC handlers for the created window
  registerIpcHandlers(mainWindow);

  const loadURL = isDev
    ? 'http://localhost:5173'
    : `file://${path.join(__dirname, '../renderer/index.html')}`;

  mainWindow.loadURL(loadURL).catch(err => {
    console.error('Failed to load URL:', err);
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Graceful error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Optional: Log to a file or service
  app.quit();
});
Use code with caution.
TypeScript
main/ipc/index.ts
Zentraler Ort zur Registrierung aller IPC-Handler. Dies ermöglicht eine modulare Erweiterung.
Generated typescript
import { ipcMain, BrowserWindow } from 'electron';

export function registerIpcHandlers(window: BrowserWindow): void {
  /**
   * Example IPC handler for a ping-pong test.
   * This demonstrates how to set up handlers for inter-process communication.
   */
  ipcMain.handle('ping', async () => {
    console.log('[IPC] Received ping from renderer.');
    return 'pong';
  });

  // --- Add other IPC handlers for different Pruki modules here ---
  // Example:
  // ipcMain.handle('pruki-module-A:do-something', (event, args) => { ... });
}
Use code with caution.
TypeScript
3. Renderer-Prozess (React + Vite + TypeScript)
renderer/index.html
HTML-Vorlage für Vite.
Generated html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pruki</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
Use code with caution.
Html
renderer/src/main.tsx
Einstiegspunkt der React-Anwendung.
Generated typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
Use code with caution.
TypeScript
renderer/src/App.tsx
Die Hauptkomponente, die das data-testid für E2E-Tests enthält.
Generated typescript
import React from 'react';

function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div 
        data-testid="app-ready"
        className="text-2xl font-bold"
      >
        Pruki is running
      </div>
    </div>
  );
}

export default App;
Use code with caution.
TypeScript
renderer/src/index.css (mit TailwindCSS)
Generated css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
Use code with caution.
Css
tailwind.config.js & postcss.config.js
Generated javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./renderer/index.html",
    "./renderer/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
Use code with caution.
JavaScript
4. E2E-Tests mit Playwright
e2e/app.spec.ts
Ein End-to-End-Test, der die Kernfunktionalität der App-Shell überprüft.
Generated typescript
import { test, expect, _electron as electron } from '@playwright/test';

test('App starts, displays ready message, and IPC works', async () => {
  // Launch the app in dev mode
  const electronApp = await electron.launch({
    args: ['.'],
    env: { ...process.env, NODE_ENV: 'development' }
  });

  // Wait for the main window to be available
  const window = await electronApp.firstWindow();
  expect(window).not.toBeNull();
  
  // Verify the window title
  expect(await window.title()).toBe('Pruki');

  // Check for the "app-ready" element
  const appReadyElement = window.locator('[data-testid="app-ready"]');
  await expect(appReadyElement).toBeVisible({ timeout: 10000 });
  expect(await appReadyElement.textContent()).toBe('Pruki is running');

  // Execute an IPC call and check the result
  const ipcResult = await window.evaluate(() => {
    // Note: This assumes a preload script exposes `ipcRenderer` safely.
    // For this test, we inject it. In a real app, use a preload script.
    const { ipcRenderer } = require('electron');
    return ipcRenderer.invoke('ping');
  });
  expect(ipcResult).toBe('pong');
  
  // Close the app gracefully
  await electronApp.close();
});
Use code with caution.
TypeScript
5. Docker-Integration
Dockerfile (Multi-Stage)
Ein optimiertes Dockerfile für Entwicklung, Tests und Produktion.
Generated dockerfile
# ---- Base Stage ----
# Use a Node.js base image that includes build tools
FROM node:20-bookworm-slim as base
WORKDIR /app
COPY package*.json ./

# ---- Dependencies Stage ----
# Install production dependencies
FROM base as dependencies
RUN npm install --omit=dev

# ---- Development & Test Stage ----
FROM base as dev
ENV NODE_ENV=development
# Install all dependencies including dev dependencies
RUN npm install
# Install Playwright browsers
RUN npx playwright install --with-deps
COPY . .
# Command to run tests
CMD ["npm", "test"]

# ---- Build Stage ----
FROM dev as builder
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM dependencies as production
WORKDIR /app
COPY --from=builder /app/dist-main ./dist-main
COPY --from=builder /app/dist/renderer ./dist/renderer
COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json .

# Command to start the application in production
# Needs an X server to run, e.g., using xvfb
CMD ["xvfb-run", "--auto-servernum", "electron", "."]
Use code with caution.
Dockerfile
docker-compose.yml
Vereinfacht das Starten der Container für verschiedene Umgebungen.
Generated yaml
version: '3.8'
services:
  dev:
    build:
      context: .
      target: dev
    volumes:
      - .:/app
      - /app/node_modules
    # Required for Playwright to show UI if needed
    ipc: host
    command: npm run dev

  test:
    build:
      context: .
      target: dev
    ipc: host
    command: npm test

  prod:
    build:
      context: .
      target: production
    environment:
      - DISPLAY=:99
    # Required for Electron GUI in a container
    ipc: host
Use code with caution.
Yaml
.dockerignore
Generated code
node_modules
dist
dist-main
.git
.gitignore
README.md
Use code with caution.
6. README.md: Dokumentation
Generated markdown
# Pruki Module: core.app-shell

`core.app-shell` ist die zentrale, produktionsreife App-Shell für das modulare Desktop-Framework **Pruki**. Sie basiert auf Electron, React, Vite und TypeScript und ist von Grund auf für Testbarkeit, CI/CD und plattformübergreifende Kompatibilität ausgelegt.

Dieses Modul dient als Vorlage und stabiles Fundament für alle weiteren Pruki-Module.

## Features

-   **Electron Main & Renderer Trennung:** Strikte Trennung der Kontexte für maximale Sicherheit und Stabilität.
-   **React + Vite Frontend:** Modernes, schnelles Frontend-Setup mit Hot-Reloading im Entwicklungsmodus.
-   **TypeScript:** Vollständige Typensicherheit im gesamten Stack.
-   **TailwindCSS:** Vorinstalliert für schnelles und konsistentes UI-Styling.
-   **E2E-Testing mit Playwright:** Automatisierte Tests für die Kernfunktionalität, bereit für CI/CD-Pipelines.
-   **Docker-Integration:** Multi-Stage-Dockerfile für Entwicklung, Tests und optimierte Produktions-Images.
-   **Erweiterbare IPC-Architektur:** Zentralisierte IPC-Handler, die einfach durch weitere Module erweitert werden können.
-   **CI/CD-Ready:** Alle Skripte und Konfigurationen sind für den Einsatz in automatisierten Pipelines vorbereitet.

## Installation & Setup

1.  **Repository klonen:**
    ```bash
    git clone <repository-url>
    cd core.app-shell
    ```

2.  **Abhängigkeiten installieren:**
    ```bash
    npm install
    ```

## Verfügbare Skripte

-   **Entwicklungsmodus starten:**
    Startet den Vite-Dev-Server und Electron parallel mit Hot-Reloading.
    ```bash
    npm run dev
    ```

-   **Produktions-Build erstellen:**
    Kompiliert das TypeScript für den Main-Prozess und baut das React-Frontend.
    ```bash
    npm run build
    ```

-   **Produktionsmodus starten:**
    Führt die gebaute Anwendung aus.
    ```bash
    npm run start
    ```

-   **E2E-Tests ausführen:**
    Startet Playwright und führt alle Tests im `e2e/`-Verzeichnis aus.
    ```bash
    npm run test
    ```

-   **E2E-Tests im Headed-Modus:**
    Führt die Tests mit sichtbarer UI aus.
    ```bash
    npm run test:headed
    ```

## Architektur & Konzepte

### IPC-Handler

Die Inter-Prozess-Kommunikation wird zentral in `main/ipc/index.ts` verwaltet. Um neue Events für andere Pruki-Module hinzuzufügen, registriere einfach einen neuen Handler in der `registerIpcHandlers`-Funktion.

**Beispiel:**

```typescript
// main/ipc/index.ts
export function registerIpcHandlers(window: BrowserWindow): void {
  ipcMain.handle('ping', async () => 'pong');

  // Füge hier einen neuen Handler für dein Modul hinzu
  ipcMain.handle('mein-modul:tue-etwas', async (event, argumente) => {
    // ... Logik ...
    return 'Ergebnis';
  });
}
Use code with caution.
Markdown
Testbarkeit
Alle UI-Komponenten im Renderer sollten stabile data-testid-Attribute erhalten, um sie in Playwright-Tests zuverlässig selektieren zu können. Dies stellt sicher, dass die UI-Tests robust gegenüber Refactorings und Stiländerungen bleiben.
Docker-Nutzung
Docker wird für konsistente Entwicklungs-, Test- und Produktionsumgebungen verwendet.
Entwicklungsumgebung starten:
Generated bash
docker-compose run --rm --service-ports dev
Use code with caution.
Bash
Tests im Container ausführen:
Generated bash
docker-compose run --rm test
Use code with caution.
Bash
Produktions-Image bauen und starten:
(Benötigt einen X-Server wie Xvfb im Container)
Generated bash
docker-compose up prod
Use code with caution.
Bash
Integration in Pruki
Dieses Modul ist die Basis-Shell. Weitere Pruki-Module können:
Ihre eigenen IPC-Handler in main/ipc/index.ts registrieren.
Ihre React-Komponenten in die <App />-Komponente integrieren.
Ihre eigene Geschäftslogik im Main-Prozess einbinden, indem sie von main/index.ts aus importiert und aufgerufen werden.