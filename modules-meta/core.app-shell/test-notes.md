## Test Notes for core.app-shell

### Implemented Steps:

1.  **Module Directory Creation:** Created the `core.app-shell` directory under `modules-meta`.
2.  **`package.json` Setup:** Initialized `package.json` with Electron, React, Vite, TailwindCSS, and Playwright dependencies, and defined `dev`, `build`, and `start` scripts.
3.  **Vite Server Configuration:**
    *   Moved `index.html` from `public/` to the project root (`modules-meta/core.app-shell/`).
    *   Updated `vite.config.ts` to remove `publicDir` and explicitly set `server.host` to `127.0.0.1`.
    *   Implemented `kill-port.bat` to reliably terminate processes on port 5174 before starting the Vite server, ensuring `strictPort` can be used.
    *   Added a small delay in `run-e2e-tests.bat` before starting Vite to mitigate race conditions with port binding.
4.  **Main Process (`main/index.ts`):**
    *   Implemented the Electron main process, setting up the main window, handling dev/prod loading of the Vite frontend, and integrating the IPC handlers.
    *   Corrected `__dirname` usage for ESM compatibility by replacing it with `path.dirname(fileURLToPath(import.meta.url))`.
5.  **Preload Script (`preload.ts`):**
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

### Improvements and Optimization Suggestions:

*   **Error Handling & Logging:** Enhance error handling and implement a more comprehensive logging solution (e.g., `electron-log` or Sentry) for both main and renderer processes.
*   **Build Process:** Refine the `electron-builder` configuration for cross-platform builds (.exe, .dmg, .deb) and optimize asset handling.
*   **CI/CD Pipeline:** Set up a complete CI/CD pipeline to automate testing, building, and deployment of the Electron app.
*   **Unit Testing:** Add unit tests for React components (e.g., using Jest or Vitest) and for the main process logic.
*   **UX/UI Enhancements:** Implement loading/splash screens and persistent window state management (size, position).
*   **Docker Image Size:** Further optimize the Dockerfile to reduce the final image size, potentially using a smaller base image or multi-stage builds more effectively.
*   **IPC Type Safety:** Implement more robust type-checking for IPC communications to prevent runtime errors.
*   **TailwindCSS Configuration:** Ensure TailwindCSS is properly configured for production builds to purge unused CSS.
*   **Security:** Review and harden Content Security Policy (CSP) and other security measures for the Electron application.
*   **Main Process Window Title:** Explicitly set the Electron main window title in `main/index.ts` to "Pruki App Shell" to match test expectations.
*   **`package.json` `dev` script:** Update the `dev` script in `core.app-shell/package.json` to start both Vite and Electron in parallel, similar to how `test:e2e` uses `concurrently`.
*   **Test Coverage:** Expand E2E test coverage to include all core functionalities as outlined in the prompt.
*   **Test Location Adherence:** While tests are now in `Test-App/Tests`, ensure that future tests for `core.app-shell` are also placed there, maintaining the central test location.
*   **`test-notes.md` Automation:** Implement the automation for updating `test-notes.md` as part of the CI/CD pipeline or a dedicated script.
*   **Docker Integration:** Implement the multi-stage Dockerfile, Docker Compose example, and ensure Playwright tests can run within the container.
