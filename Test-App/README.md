# Test-App: A Production-Ready TypeScript Module with Playwright Tests

This project is a sample TypeScript application that demonstrates a production-ready module with comprehensive Playwright tests. It follows the test-first approach, where tests are written before the actual implementation.

## Features

- A simple and practical `StringUtils` module with a `reverse` method.
- A comprehensive Playwright test suite that covers all aspects of the module.
- A self-check function that verifies the module's functionality and error handling.
- Clean, documented, and modern TypeScript code (ESM).
- ESM-compliant imports and exports.

## Installation and Usage

### Local (Node.js)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/test-app.git
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Run the tests:**

   ```bash
   npm test
   ```

4. **Build the project:**

   ```bash
   npm run build
   ```

### Docker (empfohlen für reproduzierbare Tests)

1. **Voraussetzungen:**
   - [Docker Desktop](https://www.docker.com/products/docker-desktop/) installiert

2. **Test-App im Container bauen und testen:**

   ```bash
   cd ../docker
   docker compose up --build
   ```

   > Die Tests laufen jetzt in einer isolierten, produktionsnahen Umgebung. Änderungen am Code werden direkt übernommen, da das Test-App-Verzeichnis als Volume eingebunden ist.

3. **Container beenden:**
   ```bash
   docker compose down
   ```

---

5. **Run the self-check:**

   ```bash
   npm run self-check
   ```

## Self-Check

The `selfCheck` function is a built-in feature that allows you to verify the module's functionality without running the full test suite. It checks if the `reverse` method works as expected and handles errors correctly.

To run the self-check, execute the following command:

```bash
npm run self-check
```

## Automated Debugging

This project is configured to generate a `test-results.json` file every time the tests are run. This file contains a detailed, machine-readable report of the test results.

This setup is designed for efficient, agent-based debugging. An AI assistant can directly parse this JSON file to identify and fix test failures autonomously, without requiring manual intervention or copy-pasting of error logs.

## Technology Stack

- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
- **Playwright:** A framework for end-to-end testing of web applications.
- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **ESM:** The official standard for JavaScript modules.