@echo off
setlocal

echo --- Starting CI Build and Test for core.app-shell ---

rem --- Install dependencies for core.app-shell ---
echo Installing dependencies for core.app-shell...
pushd modules-meta\core.app-shell
npm install
if %errorlevel% neq 0 (
    echo Error: npm install failed in core.app-shell.
    exit /b %errorlevel%
)
popd

rem --- Build core.app-shell ---
echo Building core.app-shell...
pushd modules-meta\core.app-shell
npm run build
if %errorlevel% neq 0 (
    echo Error: npm run build failed in core.app-shell.
    exit /b %errorlevel%
)
npm run build:main
if %errorlevel% neq 0 (
    echo Error: npm run build:main failed in core.app-shell.
    exit /b %errorlevel%
)
npm run build:preload
if %errorlevel% neq 0 (
    echo Error: npm run build:preload failed in core.app-shell.
    exit /b %errorlevel%
)
popd

rem --- Install dependencies for Test-App ---
echo Installing dependencies for Test-App...
pushd Test-App
npm install
if %errorlevel% neq 0 (
    echo Error: npm install failed in Test-App.
    exit /b %errorlevel%
)
popd

rem --- Run Unit Tests ---
echo Running Unit Tests...
pushd Test-App
npm run test:unit
if %errorlevel% neq 0 (
    echo Error: Unit tests failed.
    exit /b %errorlevel%
)
popd

rem --- Run E2E Tests ---
echo Running E2E Tests...
pushd modules-meta\core.app-shell
call kill-port.bat
if %errorlevel% neq 0 (
    echo Error: kill-port.bat failed.
    exit /b %errorlevel%
)
popd

pushd Test-App
rem The e2e test script will start the dev server and run playwright tests
npm run test
if %errorlevel% neq 0 (
    echo Error: E2E tests failed.
    exit /b %errorlevel%
)
popd

echo --- CI Build and Test for core.app-shell Completed Successfully ---
exit /b 0
