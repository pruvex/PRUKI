@echo off
setlocal

rem Start Vite development server
pushd modules-meta\core.app-shell
start /B cmd.exe /C "npm run dev"
popd

rem Wait for Vite server to be ready
echo Waiting for Vite server to be ready...
call wait-on -v http://localhost:5174
if %errorlevel% neq 0 (
    echo Error: Vite server did not become ready.
    exit /b %errorlevel%
)

rem Run Playwright tests
echo Running Playwright tests...
pushd Test-App
cross-env DEBUG=pw:api npx playwright test
if %errorlevel% neq 0 (
    echo Error: Playwright tests failed.
    exit /b %errorlevel%
)
popd

exit /b 0