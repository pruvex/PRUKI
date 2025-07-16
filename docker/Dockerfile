# Node.js & Playwright Dockerfile für Test-App
FROM mcr.microsoft.com/playwright:v1.44.0-jammy

WORKDIR /app

# Nur package.json und lockfile für schnellen Layer-Cache
COPY Test-App/package*.json ./Test-App/
WORKDIR /app/Test-App
RUN npm install --ignore-scripts

# Restliche App-Dateien
COPY Test-App .

# Standard-Command: Playwright-Tests ausführen
CMD ["npx", "playwright", "test"]
