@echo off
timeout /t 2 /nobreak >nul
concurrently "npm run dev" "wait-on -v http://localhost:5174 && cross-env DEBUG=pw:api npx playwright test"