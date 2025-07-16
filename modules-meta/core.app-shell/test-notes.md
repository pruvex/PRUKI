## Test Notes for core.app-shell

### Implemented Steps:

1.  **Module Directory Creation:** Created the `core.app-shell` directory under `modules-meta`.
2.  **`package.json` Setup:** Initialized `package.json` with Electron, React, Vite, TailwindCSS, and Playwright dependencies, and defined `dev`, `build`, and `start` scripts.
3.  **Vite Server Configuration:**
    *   Moved `index.html` from `public/` to the project root (`modules-meta/core.app-shell/`).
    *   Updated `vite.config.ts` to remove `publicDir` and explicitly set `server.host` to `127.0.0.1`.
    *   Implemented `kill-port.bat` to reliably terminate processes on port 5174 before starting the Vite server, ensuring `strictPort` can be used.
    *   Added a small delay in `run-e2e-tests.bat` before starting Vite to mitigate race conditions with port binding.
4.  **Main Process (`main/index.ts`):
    *   Implemented the Electron main process, setting up the main window, handling dev/prod loading of the Vite frontend, and integrating the IPC handlers.
    *   Corrected `__dirname` usage for ESM compatibility by replacing it with `path.dirname(fileURLToPath(import.meta.url))`.
    *   Explicitly set the Electron main window title to "Pruki App Shell" to match test expectations.
5.  **Preload Script (`preload.ts`):
    *   Created a preload script to expose `ipcRenderer` to the renderer process securely via `contextBridge`.
    *   Resolved `SyntaxError: Cannot use import statement outside a module` by creating a dedicated `tsconfig.preload.json` that compiles `preload.ts` as CommonJS, overriding inherited `ESNext` settings.
6.  **Renderer Frontend (`renderer/main.tsx`):** Developed a simple React frontend with a `data-testid="app-ready"` element.
7.  **Playwright Test Setup & Relocation:**
    *   Moved the E2E test file `app.spec.ts` from `modules-meta/core.app-shell/e2e/` to `Test-App/Tests/` as per prompt requirements.
    *   Moved `playwright.config.ts` from `modules-meta/core.app-shell/` to `Test-App/`.
    *   Updated `Test-App/package.json` to include `@playwright/test` and `electron` as `devDependencies`.
    *   Adjusted `Test-App/playwright.config.ts` to set `testDir` to `./Tests` and increased global `timeout` to 90 seconds.
    *   Modified `app.spec.ts` to:
        *   Explicitly specify `executablePath` and `args` for `electron.launch` to point to `core.app-shell`'s Electron executable and main script.
        *   Implement a custom loop to wait for the main application window based on its URL, replacing `waitForEvent` to avoid its internal 30-second timeout.
        *   Corrected the IPC test to use `window.electron.ipcRenderer` within `window.evaluate` for proper renderer-process context.
    *   Updated `modules-meta/core.app-shell/package.json`'s `test:e2e` script to delegate test execution to `Test-App/` using `cd` and `npm run test`.
    *   Created `run-e2e-tests.bat` to encapsulate `concurrently` and `wait-on` logic, called by `test:e2e` script.
8.  **Docker Integration:**
    *   Created a multi-stage `Dockerfile` in `modules-meta/core.app-shell/` for building the Electron app, including production dependencies and build steps for frontend and Electron processes.
    *   Updated `docker/docker-compose.yml` to include a `core-app-shell` service for development and a `core-app-shell-tests` service for running Playwright tests within the Docker Compose environment.
9.  **Build & Distribution:**
    *   Added `electron-builder` configuration to `modules-meta/core.app-shell/package.json` to enable cross-platform builds (`win`, `mac`, `linux`).
10. **Logging & Crash-Reporting:**
    *   Integrated `electron-log` for central logging in the main process.
    *   Configured Electron's `crashReporter` for automatic error reporting.
11. **Unit Testing:**
    *   Installed `vitest`, `@vitest/ui`, `@testing-library/react`, `@testing-library/jest-dom`, and `jsdom` in `Test-App`.
    *   Configured `vitest.config.ts` to use `jsdom` environment, `globals`, `setupFiles` for `jest-dom` matchers, and `exclude` Playwright test files.
    *   Modified `renderer/main.tsx` to encapsulate `ReactDOM.createRoot` call within a conditional check to prevent direct execution during unit tests.
    *   Adjusted `Test-App/Tests/App.test.tsx` to directly import and render the `App` component, and to create a `root` element for rendering.
    *   Resolved React version conflicts in unit tests by configuring `vitest.config.ts` to use `deps.inline` for `react` and `react-dom`.
12. **IPC Type Safety:**
    *   Defined `IpcChannels` interface in `main/ipc/types.ts` for type-safe IPC communication.
    *   Updated `main/ipc/index.ts` to use `IpcChannels` for `ping` handler and added basic error handling.
    *   Adjusted import paths in `main/index.ts` and `main/ipc/index.ts` to include explicit file extensions (`.js`) for ESM compatibility.
13. **TailwindCSS Configuration:**
    *   Updated `tailwind.config.js` to include `mode: 'jit'` and `purge` configuration for production build optimization.
14. **Security:**
    *   Added a Content Security Policy (CSP) to `index.html` to enhance security.
15. **UX/UI Enhancements:**
    *   Implemented a basic splash screen (`public/splash.html`) displayed during app startup.
    *   Integrated `electron-window-state` to persist and restore window position and size.
16. **Docker Image Size Optimization:**
    *   Optimized `Dockerfile` to use `node:20-alpine` for all stages and ensured only production dependencies are included in the final image.
17. **CI/CD Orchestration Script:**
    *   Created `ci-build-test.bat` to orchestrate dependency installation, application build, and test execution (Unit and E2E).
18. **`test-notes.md` Automation Placeholder:**
    *   Created `update-test-notes.bat` as a placeholder for automating `test-notes.md` updates in a CI/CD pipeline.

### Lessons Learned:

*   **Pathing and Module Resolution:** Absolute vs. relative paths, and the interaction between `__dirname` in ESM vs. CommonJS contexts, are critical for Electron development.
*   **TypeScript Configuration Inheritance:** `extends` in `tsconfig.json` can lead to unexpected overrides; explicit configuration for specific compilation targets (like preload scripts) is often necessary.
*   **Playwright with Electron:**
    *   Launching Electron apps from Playwright requires careful specification of `executablePath` and `args` when the test context differs from the app's root.
    *   `waitForEvent` can have internal timeouts that are not directly controlled by global Playwright timeouts. Custom wait loops might be necessary for more robust window detection.
    *   IPC testing in Playwright requires executing code in the correct process context (renderer vs. main).
*   **Port Management:** Race conditions during port binding are common. Robust `kill-port` scripts and small delays can help ensure port availability.
*   **`package.json` Scripting:** Complex shell commands within `package.json` scripts can easily lead to JSON parsing errors due to incorrect escaping. Delegating complex logic to separate `.bat` or `.sh` files improves maintainability and reduces errors.
*   **Modular Project Structure:** When dealing with multiple modules, ensuring each module has its own self-contained dependencies and build/test processes is crucial, but also requires careful orchestration from a central point.
*   **Unit Testing React in a Monorepo-like Setup:** Resolving React version conflicts when testing components from one package within another requires careful configuration of the test runner (e.g., Vitest's `deps.inline` or `resolve.dedupe`) and potentially adjusting how React is rendered in the main application.

### Improvements and Optimization Suggestions:

*   **Test Coverage:** Expand E2E test coverage to include all core functionalities as outlined in the prompt.
*   **Test Location Adherence:** While tests are now in `Test-App/Tests`, ensure that future tests for `core.app-shell` are also placed there, maintaining the central test location.